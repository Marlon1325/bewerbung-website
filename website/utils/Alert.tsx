import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";

interface InfoAlertProps {
  message: string;
  success?: boolean;
  duration?: number;
  onClose?: () => void;
  top?:boolean

}

const styles: Record<string, string> = {
  basic: "text-white ",
  success: "text-green-400 border-green-800",
  error: "text-red-400 border-red-800",
};

const InfoAlert: React.FC<InfoAlertProps> = ({ message, success, duration = 5000, onClose, top=true }) => {
  // success -> success-style, error -> error-style, else -> basic-style
  const style = (success === true) ? styles.success : ((success === false) ? styles.error : styles.basic);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (onClose) onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div
      className={`fixed ${top? "top-5": "bottom-5"} left-1/2 transform -translate-x-1/2 z-[9999] 
                  ${style} flex items-center p-4 mb-4 text-sm border rounded-lg bg-gray-800 shadow-lg`}
      role="alert"
    >
      <svg
        className="shrink-0 inline w-4 h-4 me-3"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
      </svg>
      <span className="sr-only">Info</span>
      <span className="font-medium">{message}</span>
    </div>
  );
};



interface AlertArgs{
  message: string,
  success?: boolean | undefined,
  duration?: number,
  top?:boolean

}

export default function Alert({message, success, duration = 5000, top=true}:AlertArgs) {
  const container = document.createElement("div");
  document.body.appendChild(container);

  const root = ReactDOM.createRoot(container);

  const handleClose = () => {
    root.unmount();
    container.remove();
  };

  root.render(
    <InfoAlert
      message={message}
      success={success}
      duration={duration}
      onClose={handleClose}
      top={top}
    />
  );
}
