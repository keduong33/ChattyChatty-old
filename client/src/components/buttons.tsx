interface buttonProps {
  onClick: () => void;
  className?: string;
  disabled?: boolean;
}
export const BlueButton = ({
  onClick,
  className,
  disabled = false,
}: buttonProps) => {
  return (
    <button
      className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline max-w-fit max-h-fit ${className}`}
      type="button"
      onClick={onClick}
      disabled={disabled}
    >
      Send
    </button>
  );
};
