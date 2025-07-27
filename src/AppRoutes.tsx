import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Places from "./pages/Places";
import Layout from "./components/Layout";
import WeatherData from "./pages/WeatherData";
import CreatePlace from "./pages/CreatePlace";
import NotFound from "./pages/NotFound";
import { ROUTES } from "./constants/routesConstants";

const AppRoutes = (): JSX.Element => {
  const { HOME, CREATE_PLACE, PLACES, WEATHER_DATA, NOT_FOUND } = ROUTES;
  const routes = createBrowserRouter([
    {
      path: HOME,
      element: <Layout />,
      children: [
        { index: true, path: CREATE_PLACE, element: <CreatePlace /> },
        { path: PLACES, element: <Places /> },
        { path: WEATHER_DATA, element: <WeatherData /> },
      ],
    },
    {
      path: NOT_FOUND,
      element: <NotFound />,
    },
  ]);
  return <RouterProvider router={routes} />;
};

export default AppRoutes;
