import { Link } from "react-router-dom";

interface HeaderProps {
  title: string;
}

type NavLink = {
  label: string;
  to: string;
};

const navLinks: NavLink[] = [
  { label: "All Places", to: "/places" },
  { label: "Create Place +", to: "/" },
];

const Header = ({ title }: HeaderProps): JSX.Element | null => {
  return (
    <header className="w-full px-8 py-4 bg-blue-600 text-white text-2xl font-bold shadow-md flex items-center justify-center gap-4 transition cursor-pointer">
      {title}

      <nav className="flex gap-4 text-base font-normal">
        {navLinks.map(({ label, to }) => (
          <Link key={to} to={to} className="underline hover:text-yellow-200">
            {label}
          </Link>
        ))}
      </nav>
    </header>
  );
};

export default Header;
