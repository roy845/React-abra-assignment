import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Creation from "./components/Creation";
import Places from "./components/Places";
import Layout from "./components/Layout";
import WeatherData from "./components/WeatherData";

const AppRoutes = (): JSX.Element => {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "", element: <Creation /> },
        { path: "places", element: <Places /> },
        { path: "weatherData", element: <WeatherData /> },
      ],
    },
  ]);
  return <RouterProvider router={routes} />;
};

export default AppRoutes;
