import { PrimaryButton } from "../button";

type Props = {
  title: string;
  message: React.ReactNode;
  onConfirm: () => void;
};

export const SuccessAlert = ({ title, message, onConfirm }: Props) => (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center px-4 z-50">
    <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-sm text-center space-y-4">
      <div className="text-5xl">✅</div>
      <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      <p className="text-sm text-gray-500">{message}</p>
      <PrimaryButton onClick={onConfirm}>OK</PrimaryButton>
    </div>
  </div>
);
