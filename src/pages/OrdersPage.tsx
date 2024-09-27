import { useEffect, useState } from "react";
import { Order } from "../interfaces/orders";

// Service
import { getOrders } from "../services/MockService";
import { MessageType } from "../interfaces/message";
import { LoadingComponent } from "../components/LoadingComponent";
import { MessageComponent } from "../components/MessageComponent";

export const OrdersPage = () => {
  // State
  const [orders, setOrders] = useState<Order[] | null>([]);
  const [message, setMessage] = useState<string>("");
  const [messageType, setMessageType] = useState<MessageType>("success");
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    setLoading(true);
    setMessage("");
    try {
      const data = await getOrders();
      if (data !== null) {
        setTimeout(() => {
          setLoading(false);
          setMessageType("success");
          setMessage("Dastos cargados correctamente!");
          setOrders(data);
          setTimeout(() => {
            setMessage('')
        }, 2000);
        }, 1000);
        return;
      } else {
        setLoading(false);
        setMessageType("error");
        setMessage("No se pudo cargar la información");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      setMessageType("error");
      setMessage("No se pudo cargar la información");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="container mx-auto p-4">
      {loading && (<LoadingComponent/>)}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-700">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-whiteColor uppercase tracking-wider"
                >
                  No Orden
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-whiteColor uppercase tracking-wider"
                >
                  VIN
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-whiteColor uppercase tracking-wider"
                >
                  Modelo
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-whiteColor uppercase tracking-wider"
                >
                  Fecha de Entrega
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-whiteColor uppercase tracking-wider"
                >
                  Tipo de Orden
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {
                orders !== null && (
                  orders.map((order) => (
                    <tr key={order.noOrden}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {order.noOrden}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.vin}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.modelo}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.fechaEntrega}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.tipoOrden}
                      </td>
                    </tr>
                  ))
                )
              }
            </tbody>
          </table>
        </div>
        {message && (
        <MessageComponent
          message={message}
          type={messageType}
          onClose={() => setMessage('')}
        />)}
      </div>
    </div>
  );
};
