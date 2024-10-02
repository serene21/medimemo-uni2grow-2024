import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "./components/layout/Layout.tsx";
import { SubLayout } from "./components/layout/SubLayout.tsx";
import Login from "./pages/login/Login";
import Medications from "./pages/medications/Medications.tsx";
import MedicationDetails from "./pages/medicationDetails/MedicationDetails.tsx";
import AddEditTherapie from "./pages/addEditTherapie/AddEditTherapie.tsx";
import TherapieDetails from "./pages/therapieDetails/TherapieDetails.tsx";
import Contacts from "./pages/contacts/Contacts.tsx";
import AddEditContact from "./pages/addEditContact/AddEditContact.tsx";
import DoctorDetails from "./pages/doctorDetails/DoctorDetails.tsx";
import Profil from "./pages/profil/Profil.tsx";
import Program from "./pages/program/Program.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "medications",
        element: <SubLayout />,
        children: [
          {
            path: "",
            element: <Medications />,
          },
          {
            path: "details",
            element: <MedicationDetails />,
          },
        ],
      },
      {
        path: "therapies",
        element: <SubLayout />,
        children: [
          {
            path: "",
            element: <Medications />,
          },
          {
            path: "edit",
            children: [
              {
                path: "",
                element: <AddEditTherapie />,
              },
              {
                path: "program",
                element: <Program />
              }
            ],
          },
          {
            path: "add",
            children: [
              {
                path: "",
                element: <AddEditTherapie />,
              },
              {
                path: "program",
                element: <Program />
              }
            ],
          },
          {
            path: "details",
            element: <TherapieDetails />,
          },
        ],
      },
      {
        path: "contacts",
        element: <SubLayout />,
        children: [
          {
            path: "",
            element: <Contacts />,
          },
          {
            path: "edit",
            element: <AddEditContact />,
          },
          {
            path: "add",
            element: <AddEditContact />,
          },
          {
            path: "details",
            element: <DoctorDetails />,
          },
        ],
      },
      {
        path: "profil",
        element: <Profil />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
