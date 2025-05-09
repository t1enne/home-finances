import {
  encodeBase32LowerCaseNoPadding,
  encodeHexLowerCase,
} from "@oslojs/encoding";
import type { Session, SessionCreate } from "../types/models/Session";
import { db } from "../db/kysely";
import { isNullable } from "../utils/index";
import { sha256 } from "@oslojs/crypto/sha2";

export const SessionService = {
  generateSessionToken(): string {
    const bytes = new Uint8Array(20);
    crypto.getRandomValues(bytes);
    return encodeBase32LowerCaseNoPadding(bytes);
  },
  async createSession(token: string, userId: number): Promise<Session> {
    const sessionId = encodeHexLowerCase(
      sha256(new TextEncoder().encode(token)),
    );
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
    const session: SessionCreate = {
      id: sessionId,
      userId,
      expiresAt,
    };
    await db.updateTable("session").set(session).execute();
    return session;
  },
  async validateSessionToken(token: string) {
    const sessionId = encodeHexLowerCase(
      sha256(new TextEncoder().encode(token)),
    );
    const _row = await db
      .selectFrom("session")
      .selectAll()
      .innerJoin("user", "user.id", "session.userId")
      .where("id", "=", sessionId)
      .executeTakeFirst();

    if (isNullable(_row)) {
      return { session: null };
    }
    const session = _row as Session;
    if (Date.now() >= session.expiresAt.getTime()) {
      await db.deleteFrom("session").where("id", "=", session.id).execute();
      return { session: null };
    }
    if (Date.now() >= session.expiresAt.getTime() - 1000 * 60 * 60 * 24 * 15) {
      const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
      await db
        .updateTable("session")
        .where("id", "=", session.id)
        .set("expiresAt", expiresAt)
        .execute();
    }

    const user = await db
      .selectFrom("user")
      .selectAll()
      .where("id", "=", session.userId)
      .executeTakeFirstOrThrow();

    return { session };
  },
  invalidateSession(sessionId: string) {
    return db.deleteFrom("session").where("id", "=", sessionId).execute();
  },
  async invalidateAllSessions(userId: string): Promise<void> {
    await db.deleteFrom("session").where("userId", "=", userId).execute();
  },
} as const;
