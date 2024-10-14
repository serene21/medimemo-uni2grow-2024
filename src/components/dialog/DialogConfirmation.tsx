import { ArrowBackIos, Logout, ReportOutlined } from "@mui/icons-material"
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material"

function DialogConfirmation() {
  return (
    
    <Dialog
    open={openAlert}
    onClose={handleCloseAlert}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
    sx={{
      color: "#F00",
    }}
  >
    <DialogTitle
      variant="h6"
      id="alert-dialog-title"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "#222",
        gap: "10px",
        fontWeight: "bold",
      }}
    >
      <ReportOutlined sx={{ color: "#555" }} />
      Log-out Confirmation
    </DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        Are you sure you want to log out? Any unsaved changes will be lost.
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button
        onClick={handleCloseAlert}
        sx={{
          textTransform: "capitalize",
          color: "#555",
          fontWeight: "bold",
        }}
      >
        <ArrowBackIos />
        &nbsp;Back
      </Button>
      <Button
        sx={{
          textTransform: "capitalize",
          color: "#F00",
          fontWeight: "bold",
        }}
        onClick={handleLogout}
        autoFocus
      >
        <Logout />
        Log-out
      </Button>
    </DialogActions>
  </Dialog>
  )
}

export default DialogConfirmation
