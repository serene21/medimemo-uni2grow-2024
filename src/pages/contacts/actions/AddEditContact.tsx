import Head from "../../../components/head/Head";

import "./AddEditContact.css";

import {
  validateContactForm,
  formError,
  validationContactField
} from "../../../utils/ValidateContact";

import { useState } from "react";

import {
  TextField,
  Typography,
  InputAdornment,
  Button,
  IconButton
} from "@mui/material";

import stetoscope from "../../../assets/images/contact/stethoscope.svg";
import clinicalNote from "../../../assets/images/contact/editContact/clinical_notes.svg";
import call from "../../../assets/images/contact/editContact/call.svg";
import mail from "../../../assets/images/contact/editContact/mail.svg";
import location from "../../../assets/images/contact/editContact/location_on.svg";
import sticyNote from "../../../assets/images/contact/editContact/sticky_note_2.svg";
import save from "../../../assets/images/contact/editContact/save.svg";
import { IContact } from "../../../models/Contact";
import { formValues } from "../../../utils/Validation";

function AddEditContact() {
  const [contact, setContact] = useState<formValues>({
    name: "",
    notes: "",
    profession: "",
    phone: "",
    email: "",
    address: ""
  });

  const [errors, setErrors] = useState<formError>({
    name: "",
    notes: "",
    profession: "",
    phone: "",
    email: "",
    address: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fieldName = e.target.name;
    const value = e.target.value;
    const error = validationContactField(fieldName, value);

    setErrors((prevState) => ({
      ...prevState,
      [fieldName]: error || ""
    }));

    setContact({
      ...contact,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    // Validate the entire form before proceeding
    const validationErrors = validateContactForm(contact);

    // If there are validation errors, update the errors state and stop submission
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors); // Set the validation errors to the state
      return; // Stop submission if validation fails
    }

    try {
      const newContact: IContact = {
        name: contact.name,
        notes: contact.notes,
        qualification: "Dr",
        profession: contact.profession,
        phone: contact.phone,
        email: contact.mail,
        address: contact.address
      };

      // If validation passes, make the API call to submit the data
      const response = await fetch("http://localhost:3000/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newContact)
      });

      if (response.ok) {
        setContact({
          name: "",
          notes: "",
          profession: "",
          phone: "",
          email: "",
          address: ""
        });
        alert("Contact added successfully!");
      } else {
        alert("Error adding contact.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Head arrow={true} title="New Doctor" />
      <form onSubmit={handleSubmit}>
        <div className="containPanel">
          <div className="panelContact">
            <div className="addPanel">
              <TextField
                fullWidth
                type="text"
                name="name"
                style={{ color: "#B3B3B3" }}
                value={contact.name}
                onChange={handleChange}
                error={!!errors.name}
                helperText={errors.name}
                label="Name"
                placeholder="Dr. "
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <img src={stetoscope} alt="Allergies" />
                    </InputAdornment>
                  )
                }}
              />

              <TextField
                fullWidth
                type="text"
                name="profession"
                style={{ color: "#B3B3B3" }}
                value={contact.profession}
                onChange={handleChange}
                error={!!errors.profession}
                helperText={errors.profession}
                label="profession"
                placeholder="Specialty"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <img src={clinicalNote} alt="clinical notes" />
                    </InputAdornment>
                  )
                }}
              />

              <TextField
                fullWidth
                type="number"
                name="phone"
                style={{ color: "#B3B3B3" }}
                value={contact.phone}
                onChange={handleChange}
                error={!!errors.phone}
                helperText={errors.phone}
                label="contact"
                placeholder="Phone Number"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <img src={call} alt="Allergies" />
                    </InputAdornment>
                  )
                }}
              />

              <TextField
                fullWidth
                type="email"
                name="email"
                value={contact.email}
                style={{ color: "#B3B3B3" }}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
                label="E-mail"
                placeholder="E-mail"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <img src={mail} alt="email" />
                    </InputAdornment>
                  )
                }}
              />

              <TextField
                fullWidth
                type="text"
                name="address"
                style={{ color: "#B3B3B3" }}
                value={contact.address}
                onChange={handleChange}
                error={!!errors.address}
                helperText={errors.address}
                label="Address"
                placeholder="Address"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <img src={location} alt="Allergies" />
                    </InputAdornment>
                  )
                }}
              />

              <TextField
                fullWidth
                type="text"
                name="notes"
                value={contact.notes}
                sx={{ color: "#B3B3B3" }}
                onChange={handleChange}
                error={!!errors.notes}
                helperText={errors.notes}
                label="notes"
                placeholder="Notes"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <img src={sticyNote} alt="Allergies" />
                    </InputAdornment>
                  )
                }}
              />
            </div>
          </div>

          <div className="button">
            <Button
              type="submit"
              fullWidth
              sx={{ background: "#f00", margin: "50px" }}
              variant="contained"
            >
              <img src={save} />
              <Typography paddingLeft={1} paddingTop={0.5} >Save</Typography>
            </Button>
          </div>
        </div>
      </form>
    </>
  );
}
export default AddEditContact;
