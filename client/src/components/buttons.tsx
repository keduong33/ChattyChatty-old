import { HTMLProps } from "react";
import { twMerge } from "tailwind-merge";

export const BlueButton = ({
  onClick,
  className,
  disabled = false,
  children,
}: HTMLProps<HTMLButtonElement>) => {
  return (
    <button
      className={twMerge(
        `focus:shadow-outline mx-2 max-h-fit max-w-fit rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none disabled:opacity-25`,
        `${className}`
      )}
      type="button"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
