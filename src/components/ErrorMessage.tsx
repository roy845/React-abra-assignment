import CenteredMessageLayout from "./CenteredMessageLayout";

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage = ({ message }: ErrorMessageProps): JSX.Element => {
  return (
    <CenteredMessageLayout textColor="text-red-500">
      {message}
    </CenteredMessageLayout>
  );
};

export default ErrorMessage;
