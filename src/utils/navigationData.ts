import contacts from "../assets/images/appNavigation/contacts.png";
import contactsRed from "../assets/images/appNavigation/contactsRed.png";
import homeHealth from "../assets/images/appNavigation/home_health.png";
import homeHealthRed from "../assets/images/appNavigation/home_healthred.png";
import prescription from "../assets/images/appNavigation/prescriptions.png";
import prescriptionRed from "../assets/images/appNavigation/prescriptionsRed.png";

export interface ItemNavigation {
  path: string;
  name: string;
  icon: string;
  activeIcon: string;
}

export const dataItem: ItemNavigation[] = [
  {
    path: "/medications",
    name: "Medications",
    icon: homeHealth,
    activeIcon: homeHealthRed,
  },
  {
    path: "/therapies",
    name: "Therapies",
    icon: prescription,
    activeIcon: prescriptionRed,
  },
  {
    path: "/contacts",
    name: "Contacts",
    icon: contacts,
    activeIcon: contactsRed,
  },
];
