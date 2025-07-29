import Spinner from "./Spinner";

interface Props {
  loading: boolean;
  onResetClick: () => void;
}

const CreatePlaceFormButtons = ({
  loading,
  onResetClick,
}: Props): JSX.Element => {
  return (
    <div className="flex gap-4">
      <button
        type="submit"
        disabled={loading}
        className={`w-full py-2 font-semibold rounded-lg shadow transition flex items-center justify-center ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700 text-white"
        }`}
      >
        {loading ? (
          <Spinner
            size={20}
            color="#ffffff"
            fullHeight={false}
            className="h-auto"
          />
        ) : (
          "Create Place"
        )}
      </button>

      <button
        type="button"
        onClick={onResetClick}
        disabled={loading}
        className={`w-full py-2 bg-red-600 text-white font-semibold rounded-lg shadow hover:bg-red-700 transition ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        Reset
      </button>
    </div>
  );
};

export default CreatePlaceFormButtons;
