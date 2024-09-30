import { Login } from "./Page/login/Login.tsx";
import {Profile} from "./Page/profile/Profile.tsx"
import {Therapy} from "./Page/therapy/Therapy.tsx"
import {AddTherapy} from "./Page/addTherapy/AddTherapy.tsx"

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
    path: "/profile",
    element: <Profile />
  },
  {
    path: "/therapy",
    element: <Therapy />
  },
  {
    path: "/addTherapy",
    element: <AddTherapy />
  },
  {
    path: "/",
    loader: () => redirect("/login")
  }
]);

export function App() {
  return <RouterProvider router={Router} />;
}
