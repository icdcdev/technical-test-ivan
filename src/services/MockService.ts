// Interface
import { Order } from "../interfaces/orders";
import { User } from "../interfaces/user";

const API_URL = 'http://localhost:3000';

// Función para autenticar al usuario
const authenticateUser = async (usuario: string, contraseña: string): Promise<string | null> => {
  try {
    const response = await fetch(`${API_URL}/users`);
    const users: User[] = await response.json();
    
    const user = users.find(user => user.usuario === usuario && user.contraseña === contraseña);
    
    if (user) {
        const token = generateToken(usuario);
      return token;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error during authentication:', error);
    return null;
  }
};

const getOrders = async (): Promise<Order[] | null> => {
  try {
    const response = await fetch(`${API_URL}/orders`);
    if (!response.ok) {
      return null;
    }
    const data: Order[] = await response.json();
    return data;
  } catch (error) {
    console.error('Error during get data:', error);
    return null;
  }
}

// Función para crear un token simulado
const generateToken = (usuario: string): string => {
    return `token-${usuario}-${new Date().getTime()}`;
  };  

export { authenticateUser, getOrders };
