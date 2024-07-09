import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import axios from '../utils/axios'


export default function ForgetPasswordDialog() {
  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = React.useState('');

  const handleClickOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  return (
    <React.Fragment>

      <Button variant="outlined" onClick={handleClickOpen} size="small">
        <Typography variant="body2" component="span" style={{ textTransform: 'lowercase' }}>
          <span style={{ textTransform: 'capitalize' }}>שכחתי סיסמא</span>
        </Typography>
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: async (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            try {
              debugger
              const password = await axios.put('/Auth/ForgetPassword', email, { headers: { 'Content-Type': 'application/json' } })
              // onComplete()
              handleClose();
              console.log(password)
              debugger
            }
            catch (error) {
              console.log(error)
            }
          },
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <DialogTitle>שכחתי סיסמא</DialogTitle>
        </div>
        <DialogContent style={{ textAlign: 'right' }}>
          <DialogContentText>
            .סיסמא חדשה תישלח לכתובת המייל שלך. לאחר שתקבל אותה, נסה להתחבר
            <br />
            .אם לא קיבלת סיסמא, בדוק את הכתובת שהזנת או נסה שוב
            <br />
            .מומלץ לשמור את הסיסמאות במקום בטוח
          </DialogContentText>
          <TextField
            autoFocus
            fullWidth
            required
            margin="dense"
            id="name"
            name="email"
            label="אימייל"
            type="email"
            variant="standard"
            onChange={(event) => setEmail(event.target.value)}
          />
        </DialogContent>

        <DialogActions sx={{ justifyContent: 'flex-start' }}>
          <Button type="submit">שלח</Button>
          <Button onClick={handleClose} sx={{ edge: 'start' }}>ביטול</Button>
        </DialogActions>

      </Dialog>

    </React.Fragment>
  );
}