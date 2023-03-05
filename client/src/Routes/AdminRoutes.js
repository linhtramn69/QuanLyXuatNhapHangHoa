import { Navigate, Outlet } from "react-router-dom";

import { useStore } from "../Store";

const PrivateRoutes = () => {
  const [state] = useStore();

  return state.statusLogin ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
