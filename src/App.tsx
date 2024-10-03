import {
  createBrowserRouter,
  redirect,
  RouterProvider
} from "react-router-dom";
import { Layout } from "./components/layout/Layout.tsx";
import {Contact} from "./pages/contact/Contact.tsx";
import Login from "./pages/login/Login";
import { Medications } from "./pages/medications/Medications.tsx";
import { Therapies } from "./pages/therapies/Therapies.tsx";
import { ViewContact } from "./pages/viewContact/ViewContact.tsx";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/",
    loader: () => redirect("/login")
  },
  {
    element: <Layout />,
    children: [
      {
        path: "/medications",
        element: <Medications />
      },
      {
        path: "/contact",
        element: <Contact />
      },
      {
        path: "/viewContact/:id",
        element: <ViewContact />
      },
      {
        path: "/Therapies",
        element: <Therapies />
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
