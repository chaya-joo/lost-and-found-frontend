import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { PATHS } from '../routes/paths';
import { useState } from 'react';
import { UserType } from "../types/user.types";
import { PostApi } from "../services/userService"
import { useDispatch } from "react-redux";
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { ThemeProvider, CacheProvider } from '@emotion/react';
import { cacheRtl, theme as rtlTheme } from '../styles/rtlTheme';
import { useNavigate } from 'react-router-dom';
import { addUser } from '../redux/user/user.slice';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


export default function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  }
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newUser: UserType = { id: 0, phone, name: firstName + ' ' + lastName, email, password }
    try {
      const post = await PostApi(newUser);
      dispatch(addUser(post));
      navigate(`/${PATHS.login}`)
    }
    catch (error) {
      console.log(error);
    }
  }

  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={rtlTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              הרשמה
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="שם פרטי"
                    autoFocus
                    onChange={(event) => setFirstName(event.target.value)}
                  />

                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="שם משפחה"
                    name="lastName"
                    autoComplete="family-name"
                    onChange={(event) => setLastName(event.target.value)}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="phone"
                    label="מספר טלפון"
                    type="text"
                    id="phone"
                    autoComplete="number"
                    onChange={(event) => setPhone(event.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="כתובת אימייל"
                    name="email"
                    autoComplete="email"
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>

                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="בחר סיסמא"
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    autoComplete="new-password"
                    onChange={(event) => setPassword(event.target.value)}
                    // sx={{paddingLeft:'15px'}}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleTogglePasswordVisibility}
                            edge="start"
                            sx={{ marginRight: '10px' }}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                להרשמה
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href={PATHS.login} variant="body2">
                    {"יש לכם כבר חשבון? להתחברות לחץ כאן"}
                  </Link>
                </Grid>
              </Grid>

            </Box>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Container>

      </ThemeProvider>
    </CacheProvider>
  );
}