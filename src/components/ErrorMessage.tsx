
interface ErrorMessageProps {
  message: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
      <span className="text-red-500">⚠️</span>
      <p className="text-red-700">{message}</p>
    </div>
  );
}