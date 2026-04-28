import { TodosPage } from "./pages/TodosPage/TodosPage.tsx";
import { createBrowserRouter } from "react-router-dom";

import { RouterProvider } from "react-router-dom";
import ProfilePage from "./pages/ProfilePage/ProfilePage.tsx";
import AppLayout from "./AppLayout.tsx";

const router = createBrowserRouter([
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
]);

export function App() {
  return <RouterProvider router={router} />;
}
