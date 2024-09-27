import { ChangeEvent, useEffect, useState } from "react";
import { Order } from "../interfaces/orders";

// Service
import { getOrders } from "../services/MockService";
import { MessageType } from "../interfaces/message";
import { LoadingComponent } from "../components/LoadingComponent";
import { MessageComponent } from "../components/MessageComponent";
import { InputComponent } from "../components/InputComponent";
import { ButtonComponent } from "../components/ButtonComponent";

export const OrdersPage = () => {
  // State
  const [orders, setOrders] = useState<Order[] | null>([]);
  const [message, setMessage] = useState<string>("");
  const [messageType, setMessageType] = useState<MessageType>("success");
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const onHandleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const onHandleBuscar =() => {
    if(orders !== null) {
      const filtered = orders.filter((order) =>
        order.vin.toLowerCase().includes(search.toLowerCase()) || 
        order.modelo.toLowerCase().includes(search.toLowerCase())
      );
      setOrders(filtered)
    }
  }

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
            setMessage("");
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
    <>
      <div className="container mx-auto px-4 pt-10 max-w-4xl">
        <div className="flex items-center space-x-4">
          {/* Título */}
          <h1 className="text-xl font-bold text-gray-700 whitespace-nowrap">
            Ordenes
          </h1>

          {/* Inputs */}
          <InputComponent
            type="text"
            placeholder="Buscar por Orden, VIN o Modelo"
            value={search}
            onChange={onHandleSearchChange}
            className="w-2/5"
          />

          {/* Botón */}
          <ButtonComponent
              label="Buscar"
              onClick={onHandleBuscar}
              className="bg-bgColor text-whiteColor hover:bg-gray-600"
            />
        </div>
      </div>
      <div className="flex justify-center items-center h-screen">
        <div className="container mx-auto p-4">
          {loading && <LoadingComponent />}
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
                {orders !== null &&
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
                  ))}
              </tbody>
            </table>
          </div>
          {message && (
            <MessageComponent
              message={message}
              type={messageType}
              onClose={() => setMessage("")}
            />
          )}
        </div>
      </div>
    </>
  );
};
