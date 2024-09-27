import { MessageType } from "../interfaces/message";

interface MessageProps {
  type?: MessageType// Tipo de mensage
  onClose:() => void;
  message: string;
}

export const MessageComponent = ({
  message = "Este es un mensage",
  type = "success",
  onClose,
}: MessageProps) => {
  // Define colores y estilos en función del tipo de mensaje
  const messageStyles = {
    success: "bg-green-500 text-white",
    error: "bg-red-500 text-white",
    info: "bg-blue-500 text-white",
  };

  return (
    <div
      className={`fixed top-4 right-4 p-4 rounded shadow-lg ${messageStyles[type]} transition-opacity duration-300`}
      style={{ opacity: message ? 1 : 0 }}
    >
      <div className="flex items-center justify-between">
        <span>{message}</span>
        <button
          onClick={onClose}
          className="ml-4 text-lg font-bold focus:outline-none"
        >
          &times;
        </button>
      </div>
    </div>
  );
};
