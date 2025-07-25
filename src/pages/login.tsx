import { Layout } from "../components/layout";

export const LoginPage = () => (
  <Layout>
    <article>
      <form
        hx-boost
        method="post"
        action="/login"
        className="flex items-center justify-center"
      >
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
              <div className="validator-hint hidden">
                Enter valid email address
              </div>
            </div>
            <div>
              <label className="input validator">
                <i className="h-[1em] opacity-50 ph ph-lock" />
                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  required
                />
              </label>
            </div>
            <div className="py-2" />
            <button className="btn btn-primary" type="submit">
              Login
            </button>
            <div className="py-2" />
          </div>
        </div>
      </form>
      <a
        hx-boost
        role="button"
        href="/auth/signup"
        className="btn btn-link block text-center"
      >
        Sign up
      </a>
    </article>
  </Layout>
);
