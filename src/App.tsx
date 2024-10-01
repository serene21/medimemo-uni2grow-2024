import {
  createBrowserRouter,
  redirect,
  RouterProvider
} from "react-router-dom";
import { Contact } from "./pages/contact/Contact";
import Login from "./pages/login/Login";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/contact",
    element: <Contact />
  },

  {
    path: "/",
    loader: () => redirect("/login")
  }
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
