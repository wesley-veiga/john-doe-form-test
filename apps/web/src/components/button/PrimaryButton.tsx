type Props = {
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const PrimaryButton = ({ children, disabled, ...props }: Props) => (
  <button
    disabled={disabled}
    className={[
      "w-full rounded-md px-4 py-2 text-sm font-semibold text-white transition-colors",
      "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
      disabled
        ? "bg-gray-300 cursor-not-allowed"
        : "bg-linear-to-b from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800",
    ].join(" ")}
    {...props}
  >
    {children}
  </button>
);
