import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./ViewContact.css";
import { Head } from "../../components/head/Head";

import wPhone from "../../assets/images/viewContact/white_call.svg";
import wMail from "../../assets/images/viewContact/white_mail.svg";
import wLocation from "../../assets/images/viewContact/white_location_on.svg";
import phone from "../../assets/images/viewContact/call.svg";
import mail from "../../assets/images/viewContact/mail.svg";
import location from "../../assets/images/viewContact/location_on.svg";
import notes from "../../assets/images/viewContact/demography.svg";

import { Typography } from "@mui/material";

interface Contact {
  id: string;
  name: string;
  qualification: string;
  profession: string;
  phone: number;
  email: string;
  address: string;
  notes: string;
}

export function ViewContact(): JSX.Element {
  // recupper l'id du contact de l'URL
  const { id } = useParams<{ id: string }>();

  const [contact, setContact] = useState<Contact | null>(null);
  const [load, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // fetch les details du contact via l'API
    fetch(`http://localhost:3000/contacts/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("failed to Fetch contact details");
        }
        return response.json();
      })
      .then((data) => {
        setContact(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (load) {
    return <Typography>loading Contact</Typography>;
  }

  if (error) {
    return <Typography>Error : {error}</Typography>;
  }

  if (!contact) {
    return <Typography>No contact found</Typography>;
  }

  //   const doctor = contact.find(({id}) => {id} === contact.id); // Search by ID

  const doctorName = `${contact.qualification}. ${contact.name}`;
  return (
    <div className="contaierView">
      <Head arrow={true} title={doctorName} more={true} />
      <Typography
        sx={{
          fontFamily: "open Sans",
          fontSize: 16,
          fontWeight: 400,
          textAlign: "center"
        }}
      >
        {contact.profession}
      </Typography>

      <div className="viewContactPanel">
        <div className="boxDiv">
          <div className="boxInfos">
            <img color="white" src={wPhone} alt="contact" />
            <Typography sx={{ color: "white" }}>Ring</Typography>
          </div>
          <div className="boxInfos">
            <img color="white" src={wMail} alt="contact" />
            <Typography sx={{ color: "white" }}>E-mail</Typography>
          </div>
          <div className="boxInfos">
            <img color="white" src={wLocation} alt="contact" />
            <Typography sx={{ color: "white" }}>View</Typography>
          </div>
        </div>

        <div className="doctorProfile">
          <div className="doctorProps">
            <img src={phone} alt="contact" />
            <Typography
              sx={{
                paddingTop: 0.1,
                fontFamily: "Open Sans",
                fontSize: 14,
                fontWeight: 400,
                lineHeight: 2
              }}
            >
              {contact.phone}
            </Typography>
          </div>
          <div className="doctorProps">
            <img src={mail} alt="mail" />
            <Typography
              sx={{
                paddingTop: 0.1,
                fontFamily: "Open Sans",
                fontSize: 14,
                fontWeight: 400,
                lineHeight: 2
              }}
            >
              {" "}
              {contact.email}{" "}
            </Typography>
          </div>
          <div className="doctorProps">
            <img src={location} alt="location" />
            <Typography
              sx={{
                paddingTop: 0.1,
                fontFamily: "Open Sans",
                fontSize: 14,
                fontWeight: 400,
                lineHeight: 2
              }}
            >
              {" "}
              {contact.address}{" "}
            </Typography>
          </div>
          <div className="doctorProps">
            <img src={notes} alt="notes" />
            <Typography
              sx={{
                paddingTop: 0.1,
                fontFamily: "Open Sans",
                fontSize: 14,
                fontWeight: 400,
                lineHeight: 2
              }}
              width={240}
              height="auto"
            >
              {contact.notes}
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
}
