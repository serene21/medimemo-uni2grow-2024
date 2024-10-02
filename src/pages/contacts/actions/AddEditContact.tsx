import { Head } from "../../../components/head/Head";

import { TextField, InputAdornment } from "@mui/material";

import stetoscope from "../../../assets/images/contact/stethoscope.svg";
import clinicalNote from "../../../assets/images/contact/editContact/clinical_notes.svg";
import call from "../../../assets/images/contact/editContact/call.svg";
import mail from "../../../assets/images/contact/editContact/mail.svg";
import location from "../../../assets/images/contact/editContact/location_on.svg";
import sticyNote from "../../../assets/images/contact/editContact/sticky_note_2.svg";

export function AddEditContact(): JSX.Element {
  return (
    <div className="actionsContainar">
      <Head arrow={true} title="New Doctor" />
      <div className="addPanel">
        <TextField
          fullWidth
          label="allergies"
          placeholder="No allergies"
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
          label="allergies"
          placeholder="No allergies"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <img src={clinicalNote} alt="Allergies" />
              </InputAdornment>
            )
          }}
        />

        <TextField
          fullWidth
          label="allergies"
          placeholder="No allergies"
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
          label="allergies"
          placeholder="No allergies"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <img src={mail} alt="Allergies" />
              </InputAdornment>
            )
          }}
        />

        <TextField
          fullWidth
          label="allergies"
          placeholder="No allergies"
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
          label="allergies"
          placeholder="No allergies"
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
  );
}
