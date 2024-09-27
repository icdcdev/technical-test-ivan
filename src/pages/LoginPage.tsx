import { ChangeEvent, useState } from "react";
import { ButtonComponent } from "../components/ButtonComponent";
import { InputComponent } from "../components/InputComponent";

export const LoginPage = () => {
  // State
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const onHandleUserChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUser(event.target.value);
  };

  const onHandlePassChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const onHandleLogin = () => {
    alert("iniciando sesion!");
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-6 text-center">
          Bienvenido al Sistema
        </h1>
        <form className="flex flex-col items-center space-y-4">
          <InputComponent
            type="text"
            placeholder="Usuario"
            value={user}
            onChange={onHandleUserChange}
            className="w-2/3"
          />
          <InputComponent
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={onHandlePassChange}
            className="w-2/3"
          />
          <ButtonComponent
            label="Iniciar Sesión"
            onClick={onHandleLogin}
            className="bg-bgColor text-whiteColor hover:bg-gray-600"
          />
        </form>
      </div>
    </div>
  );
};
