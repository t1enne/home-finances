import { FC } from "hono/jsx";
import { Layout } from "../components/layout";

export const SignUpPage: FC<{ withError?: true }> = ({ withError }) => (
  <Layout>
    <article>
      <form method="post" action="/auth/signup">
        <div>
          <div className="flex flex-col items-center gap-2">
            <div>
              <label className="input validator">
                <i className="h-[1em] opacity-50 ph ph-envelope" />
                <input
                  name="mail"
                  type="email"
                  placeholder="mail@site.com"
                  required
                />
              </label>
            </div>
            <div>
              <label className="input validator">
                <i className="h-[1em] opacity-50 ph ph-lock" />
                <input
                  name="password"
                  type="password"
                  required
                  placeholder="Password"
                  autocomplete="current-password"
                />
              </label>
              <p className="validator-hint hidden">
                Must be more than 8 characters, including
              </p>
            </div>
            <div className="py-2" />
            <button className="btn btn-primary" type="submit">
              Register
            </button>
            <div className="py-2" />
            <a
              role="button"
              href="/login"
              className="btn btn-link block text-center"
            >
              Login
            </a>
          </div>
        </div>

        {withError && (
          <div className="text-red-500">Something went wrong, please retry</div>
        )}
      </form>
    </article>
  </Layout>
);
