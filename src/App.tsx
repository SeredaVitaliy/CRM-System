import { TodosPage } from "./pages/TodosPage/TodosPage.tsx";
import { createBrowserRouter } from "react-router-dom";

import { RouterProvider } from "react-router-dom";
import ProfilePage from "./pages/ProfilePage/ProfilePage.tsx";
import AppLayout from "./AppLayout.tsx";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute.tsx";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { initialAuth } from "./slices/authSlice.ts";
import { AppDispatch, RootState } from "./store/store.ts";
import LoginPage from "./pages/LoginPage/LoginPage.tsx";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage.tsx";
import AuthLayout from "./pages/AuthPage/AuthLayout.tsx";

const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      { path: "/login", element: <LoginPage /> },
      { path: "/registration", element: <RegistrationPage /> },
    ],
  },
  {
    element: <PrivateRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [
          {
            path: "/",
            element: <TodosPage />,
          },
          {
            path: "/profile",
            element: <ProfilePage />,
          },
        ],
      },
    ],
  },
]);

export function App() {
  const dispatch = useDispatch<AppDispatch>();
  const isInitialized = useSelector(
    (state: RootState) => state.auth.isInitialized,
  );

  const initRef = useRef(false);

  useEffect(() => {
    if (initRef.current) return;
    initRef.current = true;
    dispatch(initialAuth());
  }, [dispatch]);

  if (!isInitialized) return null;

  return <RouterProvider router={router} />;
}
