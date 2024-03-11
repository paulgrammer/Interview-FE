import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function SaveSearchHistoryDialog({
  open,
  onSave,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
  onSave: () => void;
}) {
  const handleClose = (saveHistory?: boolean) => {
    onClose();
    if (saveHistory) onSave();
  };

  return (
    <Dialog
      open={open}
      onClose={() => handleClose(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Create search history</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Do want to save the search entry in the history?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose(false)}>No</Button>
        <Button onClick={() => handleClose(true)} autoFocus>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}
