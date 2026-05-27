import { TodosPage } from "./pages/TodosPage/TodosPage.tsx";
import { createBrowserRouter } from "react-router-dom";

import { RouterProvider } from "react-router-dom";
import ProfilePage from "./pages/ProfilePage/ProfilePage.tsx";
import AppLayout from "./AppLayout.tsx";
import AuthPage from "./pages/AuthPage/AuthPage.tsx";
import LoginForm from "./components/LoginForm/LoginForm.tsx";
import RegistrationForm from "./components/RegistrationForm/RegistrationForm.tsx";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute.tsx";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { initialAuth } from "./slices/authSlice.ts";
import { AppDispatch, RootState } from "./store/store.ts";

const router = createBrowserRouter([
  {
    element: <AuthPage />,
    children: [
      { path: "/login", element: <LoginForm /> },
      { path: "/registration", element: <RegistrationForm /> },
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

  useEffect(() => {
    dispatch(initialAuth());
  }, [dispatch]);

  if (!isInitialized) return null;

  return <RouterProvider router={router} />;
}
