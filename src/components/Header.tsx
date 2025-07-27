import { NavLink } from "react-router-dom";
import { navLinks } from "../constants/navlinksConstants";

interface HeaderProps {
  title: string;
}

const Header = ({ title }: HeaderProps): JSX.Element | null => {
  return (
    <header className="w-full px-8 py-4 bg-blue-600 text-white text-2xl font-bold shadow-md flex items-center justify-center gap-4 transition cursor-pointer">
      {title}
      <nav className="flex gap-4 text-base font-normal">
        {navLinks.map(({ label, to }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `hover:text-yellow-200 transition-colors duration-200 ${
                isActive ? "text-yellow-300 font-bold" : ""
              }`
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
};

export default Header;
