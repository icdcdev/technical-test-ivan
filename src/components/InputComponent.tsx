import { ChangeEvent } from "react";

interface InputProps {
  type?: "text" | "password" | "email" | "number"; // Puedes agregar más tipos si es necesario
  placeholder?: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  className?: string; // Para agregar clases adicionales
}

export const InputComponent = ({
  type = "text",
  placeholder = "",
  value,
  onChange,
  disabled = false,
  className = ""
}: InputProps) => {
    return (
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${className} ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}`}
        />
      );
};
