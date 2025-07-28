import useAppInfoModal from "../../hooks/useAppInfoModal";
import CloseButton from "../CloseButton";
import { closeModal, toggleDoNotShowAgain } from "../../features/modalSlice";

const AppInfoModal = () => {
  const { isOpen, doNotShowAgain, dispatch } = useAppInfoModal();
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
      <div
        className="relative rounded-lg w-3/4 max-w-lg p-6 shadow-lg bg-white text-gray-900"
        style={{ maxHeight: "90vh", overflowY: "auto" }}
      >
        <CloseButton />

        <h2 className="text-center text-2xl font-bold mb-4 flex items-center justify-center gap-2">
          About Places Manager{" "}
          <span role="img" aria-label="info">
            ℹ️
          </span>
        </h2>

        <p className="mb-4">
          The Places Manager app allows users to create, manage, and analyze
          geographic locations with ease. Whether you're mapping restaurants,
          parks, or landmarks, this tool gives you full control over your
          place-related data. An interactive map visually displays all the
          places you add — each shown as a marker based on its coordinates. You
          can click on any marker to highlight and select a place, and then view
          its detailed weather data. This makes it easy to manage and explore
          your geographic information in a visual, intuitive way.
        </p>

        <h3 className="text-xl font-semibold mb-2">How to Use the App</h3>
        <ul className="list-disc list-inside mb-4">
          <li>
            Create a new place by providing a name, coordinates, type, and
            address.
          </li>
          <li>
            Use the form with validation to ensure all necessary details are
            entered correctly.
          </li>
          <li>
            View a list of all created places with filter and sort
            functionality.
          </li>
          <li>
            Select a place to view weather data (temparature and pressure) in a
            graph for its coordinates.
          </li>
          <li>Reset the form if needed with confirmation.</li>
          <li>Use type filtering to quickly narrow down places by category.</li>
          <li>
            See visual feedback like spinners and toasts for interactions.
          </li>
        </ul>

        <div className="flex items-center mt-4">
          <input
            type="checkbox"
            id="doNotShowAgain"
            checked={doNotShowAgain}
            onChange={() => dispatch(toggleDoNotShowAgain())}
            className="h-5 w-5 border-2 rounded-md cursor-pointer transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 bg-white text-gray-700 border-gray-300 focus:ring-blue-500"
          />
          <label
            htmlFor="doNotShowAgain"
            className="ml-2 cursor-pointer select-none text-gray-700"
          >
            Do not show this again
          </label>
        </div>

        <button
          onClick={() => dispatch(closeModal())}
          className="mt-6 px-4 py-2 rounded transition bg-blue-600 text-white hover:bg-blue-700"
        >
          <span className="flex justify-center gap-4 items-center">
            Close <span className="text-xl">✖️</span>
          </span>
        </button>
      </div>
    </div>
  );
};

export default AppInfoModal;
