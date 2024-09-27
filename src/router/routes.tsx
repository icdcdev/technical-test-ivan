import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Pages
import { LoginPage } from "../pages/LoginPage";
import { OrdersPage } from "../pages/OrdersPage";

export const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="*" element={<LoginPage />} />
      </Routes>
    </Router> 
  );
};
