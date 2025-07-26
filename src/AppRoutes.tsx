import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Places from "./pages/Places";
import Layout from "./components/Layout";
import WeatherData from "./pages/WeatherData";
import CreatePlace from "./pages/CreatePlace";
import NotFound from "./pages/NotFound";

const AppRoutes = (): JSX.Element => {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, path: "", element: <CreatePlace /> },
        { path: "places", element: <Places /> },
        { path: "weatherData", element: <WeatherData /> },
      ],
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);
  return <RouterProvider router={routes} />;
};

export default AppRoutes;
