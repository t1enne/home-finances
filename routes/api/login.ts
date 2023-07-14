import { Handlers } from "$fresh/server.ts";
import { setCookie } from "$std/http/cookie.ts";
import { supabase } from "../../main.ts";

export const handler: Handlers = {
  async POST(req) {
    const url = new URL(req.url);
    const form = await req.formData();
    const email = <string> form.get("email");
    const password = <string> form.get("password");
    const res = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    const { data, error } = res;

    if (error) {
      return new Response(null, {
        status: 403,
      });
    }
    const { session } = data;

    const headers = new Headers();
    setCookie(headers, {
      name: "auth",
      value: session.access_token,
      maxAge: session.expires_in,
      sameSite: "Lax", // this is important to prevent CSRF attacks
      domain: url.hostname,
      path: "/",
      secure: true,
    });

    setCookie(headers, {
      name: "user",
      value: session.user.email as string,
      maxAge: session.expires_in,
      sameSite: "Lax", // this is important to prevent CSRF attacks
      domain: url.hostname,
      path: "/",
      secure: true,
    });

    headers.set("Location", "/");
    return new Response(null, {
      status: 303, // "See Other"
      headers,
    });
  },
};
