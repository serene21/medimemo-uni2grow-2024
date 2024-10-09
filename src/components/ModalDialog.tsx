import React from "react";
import {
  Button,
  Dialog,
  DialogContentText,
  DialogTitle,
  DialogActions,
  DialogContent
} from "@mui/material";
import { IModalDialog } from "../models/DialogModal";

function ModalDialog(props: IModalDialog) {
  return (
    <React.Fragment>
      <Dialog
        open={props.open}
        onClose={props.onDisagree}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {/* Only render title if it's provided */}
        {props.title && (
          <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
        )}
        <DialogContent>
          {/* Only render content if it's provided */}
          {props.content && (
            <DialogContentText id="alert-dialog-description">
              {props.content}
            </DialogContentText>
          )}
        </DialogContent>
        <DialogActions>
          <Button sx={{color:"black"}} onClick={props.onDisagree}>No</Button>
          <Button sx={{color:"black"}} onClick={props.onAgree} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default ModalDialog;
