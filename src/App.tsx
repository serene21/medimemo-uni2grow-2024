import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/login/Login";
import { AppNavigation } from "./components/appNavigation/AppNavigation.tsx";
import { Contacts } from "./pages/contacts/Contacts.tsx";
import { Medications } from "./pages/medications/Medications.tsx";
import { Therapies } from "./pages/therapies/Therapies.tsx";
import { Layout } from "./components/layout/Layout.tsx";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    loader: () => redirect("/login"),
  },

  {
    element: <Layout />,
    children: [
      {
        path: "/medications",
        element: <Medications />,
      },
      {
        path: "/contacts",
        element: <Contacts />,
      },
      {
        path: "/Therapies",
        element: <Therapies />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
