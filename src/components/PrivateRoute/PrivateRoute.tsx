import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

export default function PrivateRoute() {
  const isAuthenticated = useSelector(
    (state: RootState) =>
      state.auth.isAuthenticated ||
      Boolean(localStorage.getItem("accessToken")),
  );
  return <>{isAuthenticated ? <Outlet /> : <Navigate to="/login" />}</>;
}
