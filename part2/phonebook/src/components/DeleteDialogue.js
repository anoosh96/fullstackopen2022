import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const DeleteDialog = ({confirmHandler, visible, cancelHandler}) => {
  const [open, setOpen] = React.useState(visible);

  React.useEffect(() => {
    setOpen(visible)
  }, [visible])

  return (
    <div>
      <Dialog
        open={open}
        onClose={cancelHandler}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure, you want to delete the contact"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Please verify again if you are removing the correct contact!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelHandler}>Cancel</Button>
          <Button onClick={confirmHandler} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DeleteDialog
