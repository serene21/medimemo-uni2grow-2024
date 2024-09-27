import { Login } from "./Page/login/Login.tsx";
import {Logged} from "./Page/logged/Logged.tsx"
// import {Therapy} from "./Therapy"
// import {AddTherapy} from "./AddTherapy"

import {
  createBrowserRouter,
  RouterProvider,
  redirect
} from "react-router-dom";

const Router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/logged",
    element: <Logged />
  },
  // {
  //   path: "/therapy",
  //   element: <Therapy />
  // },
  // {
  //   path: "/addTherapy",
  //   element: <AddTherapy />
  // },
  {
    path: "/",
    loader: () => redirect("/login")
  }
]);

export function App() {
  return <RouterProvider router={Router} />;
}
