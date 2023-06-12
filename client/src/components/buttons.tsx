interface buttonProps {
  onClick: () => void;
  className?: string;
  disabled?: boolean;
  children: React.ReactNode;
}
export const BlueButton = ({
  onClick,
  className,
  disabled = false,
  children,
}: buttonProps) => {
  return (
    <button
      className={`focus:shadow-outline mx-2 max-h-fit max-w-fit rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none disabled:opacity-25 ${className}`}
      type="button"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
