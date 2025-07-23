interface ConfirmResetModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmResetModal = ({
  isOpen,
  onConfirm,
  onCancel,
}: ConfirmResetModalProps): JSX.Element | null => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Confirm Reset
        </h2>
        <p className="text-gray-600 mb-6">
          Are you sure you want to reset the form?
        </p>
        <div className="flex justify-between gap-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 rounded-lg text-white hover:bg-red-700"
          >
            Yes, Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmResetModal;
