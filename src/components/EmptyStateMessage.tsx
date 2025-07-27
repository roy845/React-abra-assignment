interface EmptyStateMessageProps {
  message: string;
}

const EmptyStateMessage = ({
  message,
}: EmptyStateMessageProps): JSX.Element => {
  return (
    <div className="flex items-center justify-center h-full w-full">
      <div className="text-center text-lg text-gray-500">{message}</div>
    </div>
  );
};

export default EmptyStateMessage;
