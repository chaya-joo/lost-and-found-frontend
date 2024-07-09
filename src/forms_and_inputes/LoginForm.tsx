import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import { login } from "../services/authService";
import { setUser } from "../redux/auth/auth.slice";
import {  AuthUserType } from "../types/user.types";
import { setSession } from "../auth/utils";
import { PATHS } from '../routes/paths';
import ForgetPasswordDialog from './ForgetPassword'
import Alert from '@mui/material/Alert';
import { selectAuth } from "../redux/auth/auth.selectors"
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useAppSelector } from '../redux/store';
import { ThemeProvider, CacheProvider } from '@emotion/react';
// import { ItemType } from '../types/types';
import { cacheRtl, theme as rtlTheme } from '../styles/rtlTheme';
import { createTheme } from '@mui/material';

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2',
        },
    },
});
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

export default function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [showPassword, setShowPassword] = React.useState(false);
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [showAlert, setShowAlert] = useState<string>('')
    const auth = useAppSelector(selectAuth);

    const handleTogglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault()
            const authUser: AuthUserType = await login(email, password);
            setSession(authUser)
            dispatch(setUser(authUser))// שמירת הנתונים ברידקס
            setShowAlert('success')
            navigate(`/${PATHS.home}`)
        } catch (error) {
            console.error("Login error:", error);
            setShowAlert('filled');
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: '100vh', display: 'flex' }}>

                <CssBaseline />

                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            להתחברות
                        </Typography>
                        <ThemeProvider theme={rtlTheme}>
                            <CacheProvider value={cacheRtl}>
                                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="email"
                                        label="אימייל"
                                        name="email"
                                        autoComplete="email"
                                        autoFocus
                                        onChange={(event) => { setEmail(event.target.value) }}
                                    />

                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="password"
                                        value={password}
                                        label="סיסמא"
                                        type={showPassword ? 'text' : 'password'}
                                        id="password"
                                        autoComplete="new-password"
                                        onChange={(event) => setPassword(event.target.value)}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="start">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleTogglePasswordVisibility}
                                                        edge="start"
                                                    >
                                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />

                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                    >
                                        להתחבר
                                    </Button>
                                    {
                                        showAlert === 'filled' &&<Alert variant="filled" severity="error" style={{ marginTop: '5px', marginBottom: '15px', textAlign: 'left' }}>
                                         {"אחד או יותר מהנתונים שהוזנו- שגוי. נא אמתו את הנתונים ונסו שוב."}  
                                        </Alert>}
                                  

                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <Grid container justifyContent="space-between" alignItems="center">
                                                <Grid item>
                                                    <ForgetPasswordDialog />
                                                </Grid>
                                                <Grid item>
                                                    <Link href={PATHS.signin} variant="body2">
                                                        {"אין לכם חשבון? להרשמה לחץ כאן"}
                                                    </Link>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Copyright sx={{ mt: 5 }} />
                                </Box>
                            </CacheProvider>
                        </ThemeProvider>
                    </Box>

                </Grid>
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={5}
                    sx={{
                        backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    
                        flex: 1,
                    }}
                />
            </Grid>
           
        </ThemeProvider>
    );
}