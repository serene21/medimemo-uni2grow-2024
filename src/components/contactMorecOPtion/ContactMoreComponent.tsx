import React, { useState } from "react";
import { MoreVert } from "@mui/icons-material";
import { Menu, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { IMoreContact } from "../../models/MoreContact";
import ModalDialog from "../ModalDialog";

import edit from "../../assets/images/edit.svg";
import ClearIcon from "@mui/icons-material/Clear";

function ContactMoreComponent(props: IMoreContact): JSX.Element {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState<boolean>(false); // For modal visibility control
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null); // For menu control

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    navigate(`${props.edit}`);
    handleClose();
  };

  const handleAgree = async () => {
    try {
      const response = await fetch(`${props.delete}`, {
        method: "DELETE"
      });

      if (response.ok) {
        // Navigate back to contacts list after deletion
        navigate("/contacts");
      } else {
        console.error("Failed to delete the contact");
      }
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  const handleDelete = () => {
    setOpenModal(true); // Open the modal when delete is clicked
    handleClose(); // Close the menu
  };

  const handleModalClose = () => {
    setOpenModal(false); // Close the modal when canceled
  };

  return (
    <>
      {/* More options button */}
      <div onClick={handleClick}>
        <MoreVert />
      </div>

      {/* Menu with Edit and Delete options */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right"
        }}
        sx={{ width: 2000 }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
      >
        <MenuItem onClick={handleEdit} sx={{ gap: 3 }}>
          <img src={edit} alt="edit" />
          Edit
        </MenuItem>
        <MenuItem onClick={handleDelete} sx={{ gap: 3 }}>
          <ClearIcon />
          Delete
        </MenuItem>
      </Menu>

      {/* ModalDialog component for delete confirmation */}
      {openModal && (
        <ModalDialog
          open={openModal}
          title="Delete Contact"
          content="Are you sure you want to delete this contact?"
          onAgree={handleAgree}
          onDisagree={handleModalClose}
        />
      )}
    </>
  );
}

export default ContactMoreComponent;
