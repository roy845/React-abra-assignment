import NavLinks from "./NavLinks";

interface HeaderProps {
  title: string;
}

const Header = ({ title }: HeaderProps): JSX.Element | null => {
  return (
    <header className="w-full px-8 py-4 bg-blue-600 text-white text-2xl font-bold shadow-md flex items-center justify-center gap-4 transition cursor-pointer">
      {title}
      <NavLinks />
    </header>
  );
};

export default Header;
