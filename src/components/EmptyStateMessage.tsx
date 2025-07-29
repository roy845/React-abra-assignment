import CenteredMessageLayout from "./CenteredMessageLayout";

interface EmptyStateMessageProps {
  message: string;
}

const EmptyStateMessage = ({
  message,
}: EmptyStateMessageProps): JSX.Element => {
  return <CenteredMessageLayout>{message}</CenteredMessageLayout>;
};

export default EmptyStateMessage;
