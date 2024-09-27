import { ChangeEvent, useState } from "react";
import { ButtonComponent } from "../components/ButtonComponent";
import { InputComponent } from "../components/InputComponent";
import { LoadingComponent } from "../components/LoadingComponent";

// Service
import { authenticateUser } from "../services/MockService";

import { MessageType } from "../interfaces/message";
import { MessageComponent } from "../components/MessageComponent";
import { useNavigate } from 'react-router-dom';

export const LoginPage = () => {
const navigate = useNavigate();

  // State
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string>('');
  const [messageType, setMessageType] = useState<MessageType>('success');
  const [loading, setLoading] = useState(false);

  const onHandleUserChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUser(event.target.value);
  };

  const onHandlePassChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const onHandleLogin = async () => {
    setLoading(true);
    setMessage("");
    const token = await authenticateUser(user, password);
    setTimeout(() => {
      setLoading(false);
      if (token) {
        setLoading(false);
        setMessageType('success');
        sessionStorage.setItem("authToken", token); // Guarda el token en sessionStorage
        setMessage("Acceso Correcto!");
        // Redirige o realiza otras acciones después del login
        setTimeout(() => {
            navigate('/dash');
        }, 800);
      } else {
        setLoading(false);
        setMessageType('error');
        setMessage("Usuario o contraseña invalida");
      }
    }, 2000)
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
      {loading && (<LoadingComponent/>)}
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
        {message && (
        <MessageComponent
          message={message}
          type={messageType}
          onClose={() => setMessage('')}
        />
      )}
      </div>
    </>
  );
};
