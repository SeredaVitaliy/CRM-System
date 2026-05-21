import { TodosPage } from "./pages/TodosPage/TodosPage.tsx";
import { createBrowserRouter } from "react-router-dom";

import { RouterProvider } from "react-router-dom";
import ProfilePage from "./pages/ProfilePage/ProfilePage.tsx";
import AppLayout from "./AppLayout.tsx";
import AuthPage from "./pages/AuthPage/AuthPage.tsx";
import LoginForm from "./components/LoginForm/LoginForm.tsx";
import RegistrationForm from "./components/RegistrationForm/RegistrationForm.tsx";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute.tsx";

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
  return <RouterProvider router={router} />;
}
