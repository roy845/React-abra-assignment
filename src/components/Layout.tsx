import { Outlet } from "react-router-dom";
import Header from "./Header";

const Layout = (): JSX.Element => {
  const headerTitle: string = "Places App";

  return (
    <>
      <Header title={headerTitle} />
      <Outlet />
    </>
  );
};

export default Layout;
