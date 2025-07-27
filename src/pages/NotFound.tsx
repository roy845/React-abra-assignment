import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { PAGE_TITLES } from "../constants/pageTitles";

const NotFound = (): JSX.Element => {
  const { NOT_FOUND } = PAGE_TITLES;
  return (
    <>
      <Helmet>
        <title>{NOT_FOUND}</title>
      </Helmet>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-white to-pink-100 px-4">
        <div className="bg-white p-8 rounded-2xl shadow-lg flex flex-col items-center max-w-md w-full">
          <span className="text-7xl font-extrabold text-blue-500 mb-4 select-none">
            404
          </span>
          <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">
            Page Not Found
          </h1>
          <p className="text-gray-500 text-center mb-6">
            Sorry, the page you are looking for does not exist or has been
            moved.
          </p>
          <Link
            to="/"
            className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700 transition"
          >
            Go Home
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFound;
