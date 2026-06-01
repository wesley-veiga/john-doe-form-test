import type { UseFormRegisterReturn } from "react-hook-form";

type Props = {
  id: string;
  label: string;
  optional?: boolean;
  error?: string;
  registration: UseFormRegisterReturn;
} & Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "name">;

export const TextareaInput = ({ id, label, optional, error, registration, ...props }: Props) => (
  <div className="flex flex-col gap-1">
    <label htmlFor={id} className="text-sm font-medium text-gray-700">
      {label}
      {optional && <span className="text-gray-400 font-normal"> (opcional)</span>}
    </label>
    <textarea
      id={id}
      className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 resize-none"
      {...registration}
      {...props}
    />
    {error && <span className="text-xs text-red-500">{error}</span>}
  </div>
);
