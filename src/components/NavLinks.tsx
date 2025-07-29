import { NavLink } from "react-router-dom";
import { NAV_LINKS } from "../constants/navlinksConstants";

const NavLinks = (): JSX.Element => {
  return (
    <nav
      className="flex gap-4 text-base font-normal"
      aria-label="Main navigation"
    >
      <ul className="flex gap-4">
        {NAV_LINKS.map(({ label, to }) => (
          <li key={to}>
            <NavLink
              to={to}
              className={({ isActive }) =>
                `hover:text-yellow-200 transition-colors duration-200 ${
                  isActive ? "text-yellow-300 font-bold" : ""
                }`
              }
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavLinks;
