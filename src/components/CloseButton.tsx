import { closeModal } from "../features/modalSlice";
import { useAppDispatch } from "../app/hooks";

const CloseButton = () => {
  const dispatch = useAppDispatch();
  return (
    <button
      onClick={() => dispatch(closeModal())}
      className="absolute top-4 right-4 text-red-500 hover:text-red-700 transition-colors"
    >
      ✖️
    </button>
  );
};

export default CloseButton;
