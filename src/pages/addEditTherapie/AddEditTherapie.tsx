import React, { useState } from 'react';
import { TextField, Button, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './AddEditTherapie.css';

function AddEditTherapie() {
  const [therapyName, setTherapyName] = useState('');
  const [medication, setMedication] = useState('');
  const navigate = useNavigate();

  const handleSave = () => {
    console.log('Therapy saved:', therapyName, medication);
    // Logique pour enregistrer la thérapie
  };

  const handleBack = () => {
    navigate(-1); // Retourne à la page précédente
  };

  return (
    <div className="therapy-page">
      <button className="back-button" onClick={handleBack}>←</button>
      <div className="therapy-form">
        <h2 className="therapy-title">New therapy</h2>
        <TextField
          label="Therapy name"
          value={therapyName}
          onChange={(e) => setTherapyName(e.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
          className="input-field"
        />
        <FormControl fullWidth margin="normal" className="input-field">
          <InputLabel>Select one or more medicines</InputLabel>
          <Select   
            value={medication}
            onChange={(e) => setMedication(e.target.value)}
            label="Select one or more medicines"
          >
            <MenuItem value="med1">Medicine 1</MenuItem>
            <MenuItem value="med2">Medicine 2</MenuItem>
            <MenuItem value="med3">Medicine 3</MenuItem>
          </Select>
        </FormControl>
        <Button
          variant="contained"
          fullWidth
          color="secondary"
          onClick={handleSave}
          className="save-button"
        >
          SAVE
        </Button>
      </div>
    </div>
  );
}

export default AddEditTherapie;
