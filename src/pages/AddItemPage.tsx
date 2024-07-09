import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { Box, Card, CardActions, CardContent } from '@mui/material';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { CacheProvider } from '@emotion/react';
import AddItemForm from '../forms_and_inputes/AddItemForm';
import { ThemeProvider } from '@mui/material';
import { cacheRtl, theme as rtlTheme } from '../styles/rtlTheme';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';

export default function AddItemPage() {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '50vh',
        width: '1000px',
        marginRight: 'auto',
        marginLeft: 'auto',
        marginTop: '60px',
        padding: 'auto',
        WebkitAlignItems: 'center'
      }}
    >
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} md={6}>
          <Box>
            <Card variant="outlined">
              <CardContent>
                <Typography sx={{ fontSize: 20, textAlign: 'center' }} color="text.secondary" gutterBottom >
                  <NoteAddOutlinedIcon style={{ height: '1em', marginLeft: '5px' }} />
                  הוספת אבדה/מציאה
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'center' }}>
                <React.Fragment>
                  <Button size="medium" variant='contained' onClick={handleClickOpen}>פתח טופס דיווח</Button>
                  {/* <MenuItem  style={{ textDecoration: 'none', color: 'inherit', fontSize: '15px' }}>להוספת אבדה/מציאה</MenuItem> */}
                  <CacheProvider value={cacheRtl}>
                    <ThemeProvider theme={rtlTheme}>
                      <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="scroll-dialog-title"
                        aria-describedby="scroll-dialog-description"
                      >
                        <div style={{ textAlign: 'center' }}>
                        </div>
                        <DialogContent style={{ textAlign: 'right' }} key="d">
                          <AddItemForm />
                        </DialogContent>
                      </Dialog>
                    </ThemeProvider>
                  </CacheProvider>
                </React.Fragment>
              </CardActions>
            </Card>
          </Box>
        </Grid>
      </Grid>
    </Box>

  );
}
