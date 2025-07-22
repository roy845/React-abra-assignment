import { Link } from "react-router-dom";

interface HeaderProps {
  title: string;
}

const Header = ({ title }: HeaderProps) => {
  return (
    <header className="w-full px-8 py-4 bg-blue-600 text-white text-2xl font-bold shadow-md flex items-center justify-center gap-4 transition cursor-pointer">
      {title}

      <nav className="flex gap-4 text-base font-normal">
        <Link to="/places" className="underline hover:text-yellow-200">
          All Places
        </Link>
        <Link to="/" className="underline hover:text-yellow-200">
          Create Place +
        </Link>
      </nav>
    </header>
  );
};

export default Header;
