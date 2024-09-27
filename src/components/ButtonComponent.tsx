interface ButtonProps {
  label: string;
  onClick: () => void;
  type?: "button" | "submit" | "reset"; // Tipo de boton
  disabled?: boolean;
  className?: string; // Para agregar clases de estilo
}

export const ButtonComponent = ({
  label = "Botón",
  onClick,
  type = "button",
  disabled = false,
  className,
}: ButtonProps) => {
  const baseBtnStyles =
    "px-4 py-3 font-semibold text-sm rounded-lg transition duration-300";
  const disabledStyles = disabled ? "opacity-50 cursor-not-allowed" : "";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseBtnStyles} ${disabledStyles} ${className} `}
    >
      {label}
    </button>
  );
};
