interface CenteredMessageLayoutProps {
  children: React.ReactNode;
  textColor?: string;
}

const CenteredMessageLayout = ({
  children,
  textColor = "text-gray-500",
}: CenteredMessageLayoutProps): JSX.Element => {
  return (
    <div className="flex items-center justify-center h-full w-full">
      <div className={`text-center text-lg ${textColor}`}>{children}</div>
    </div>
  );
};

export default CenteredMessageLayout;
