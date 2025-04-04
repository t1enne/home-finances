import { SideMenu } from "./side-menu";

export const Nav = () => {
  return (
    <div className="navbar bg-base-100 shadow-sm" hx-boost="true">
      <div className="flex-1">
        <a href="/" className="btn btn-ghost text-xl">
          Maney!
        </a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <SideMenu />
          </li>
          <li>
            <a
              role="button"
              className="btn btn-link btn-error"
              href="/auth/logout"
            >
              Logout
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};
