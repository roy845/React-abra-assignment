import { TailSpin } from "react-loader-spinner";

interface SpinnerProps {
  size?: number;
  color?: string;
  fullHeight?: boolean;
  className?: string;
}

const Spinner = ({
  size = 50,
  color = "#0ea5e9",
  fullHeight = true,
  className = "",
}: SpinnerProps) => {
  return (
    <div
      className={`flex justify-center items-center ${
        fullHeight ? "h-40" : ""
      } ${className}`}
    >
      <TailSpin
        height={size}
        width={size}
        color={color}
        ariaLabel="loading"
        radius="1"
        visible={true}
      />
    </div>
  );
};

export default Spinner;
