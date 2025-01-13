import { AlertCircle } from "lucide-react";

/**
 * A customizable alert component that displays a message with a variant color.
 * @param {string} children - The message to display in the alert.
 * @param {string} [variant="default"] - The variant color of the alert. "default" is blue and "destructive" is red.
 * @returns {JSX.Element}
 */
export const Alert = ({ children, variant = "default" }) => {
  const baseClasses = "p-4 rounded-lg mb-4 flex items-center gap-2";
  const variants = {
    default: "bg-blue-100 text-blue-800",
    destructive: "bg-red-100 text-red-800",
  };

  return (
    <div className={`${baseClasses} ${variants[variant]}`}>
      <AlertCircle className="h-4 w-4" />
      <p>{children}</p>
    </div>
  );
};
