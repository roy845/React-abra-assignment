import { Outlet } from "react-router-dom";
import Header from "./Header";

const Layout = () => (
  <>
    <Header title="Places App" />
    <Outlet />
  </>
);

export default Layout;
