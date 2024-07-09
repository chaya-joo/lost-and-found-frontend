import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { PATHS } from '../routes/paths';
import { NavLink, Link } from 'react-router-dom'
import { selectAuth } from "../redux/auth/auth.selectors"
import AccountCircle from '@mui/icons-material/AccountCircle';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Logout from '@mui/icons-material/Logout';
import { removeSession } from '../auth/utils';
import VariantButtonGroup from '../components/SignInLoginButtons';
import { useAppSelector } from '../redux/store';
import { useDispatch } from "react-redux";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import TroubleshootOutlinedIcon from '@mui/icons-material/TroubleshootOutlined';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import ImportContactsOutlinedIcon from '@mui/icons-material/ImportContactsOutlined';
import ProfileSettings from '../components/ProfileSettings';

function ResponsiveAppBar() {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        console.log(event)
        setAnchorElNav(event.currentTarget);
    }
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };
    return (
        <AppBar position="fixed" >
            <Container maxWidth="xl">
                <Toolbar disableGutters>

                    <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component={NavLink}
                        to={PATHS.about}
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        LOGO
                    </Typography>


                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            <React.Fragment>
                                <MenuItem style={{ display: 'flex', alignItems: 'center' }}>
                                    <NavLink to={PATHS.home} style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>
                                        <HomeOutlinedIcon style={{ height: '1em', marginLeft: '5px' }} />
                                        בית
                                    </NavLink>
                                </MenuItem>
                                <MenuItem style={{ display: 'flex', alignItems: 'center' }}>
                                    <NavLink to={PATHS.about} style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>
                                        <ImportContactsOutlinedIcon style={{ height: '1em', marginLeft: '5px' }} />
                                        אודות
                                    </NavLink>
                                </MenuItem>
                                <MenuItem style={{ display: 'flex', alignItems: 'center' }}>
                                    <NavLink to={PATHS.addItem} style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>
                                        <NoteAddOutlinedIcon style={{ height: '1em', marginLeft: '5px' }} />
                                        להוספת אבדה/מציאה
                                    </NavLink>
                                </MenuItem>
                                <MenuItem style={{ display: 'flex', alignItems: 'center' }}>
                                    <NavLink to={PATHS.lossings} style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>
                                        <TroubleshootOutlinedIcon style={{ height: '1em', marginLeft: '5px' }} />
                                        אבידות
                                    </NavLink>
                                </MenuItem>
                                <MenuItem style={{ display: 'flex', alignItems: 'center' }}>
                                    <NavLink to={PATHS.findings} style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>
                                        <LightbulbOutlinedIcon style={{ height: '1em', marginLeft: '5px' }} />
                                        מציאות
                                    </NavLink>
                                </MenuItem>
                            </React.Fragment>
                        </Menu>
                    </Box>
                    <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        LOGO
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        <React.Fragment>
                            <MenuItem style={{ display: 'flex', alignItems: 'center' }}>
                                <NavLink to={PATHS.home} style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>
                                    <HomeOutlinedIcon style={{ height: '1em', marginLeft: '5px' }} />
                                    בית
                                </NavLink>
                            </MenuItem>
                            <MenuItem style={{ display: 'flex', alignItems: 'center' }}>
                                <NavLink to={PATHS.about} style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>
                                    <ImportContactsOutlinedIcon style={{ height: '1em', marginLeft: '5px' }} />
                                    אודות
                                </NavLink>
                            </MenuItem>
                            <MenuItem style={{ display: 'flex', alignItems: 'center' }}>
                                <NavLink to={PATHS.addItem} style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>
                                    <NoteAddOutlinedIcon style={{ height: '1em', marginLeft: '5px' }} />
                                    להוספת אבדה/מציאה
                                </NavLink>
                            </MenuItem>
                            <MenuItem style={{ display: 'flex', alignItems: 'center' }}>
                                <NavLink to={PATHS.lossings} style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>
                                    < TroubleshootOutlinedIcon style={{ height: '1em', marginLeft: '5px' }} />
                                    אבידות
                                </NavLink>
                            </MenuItem>
                            <MenuItem style={{ display: 'flex', alignItems: 'center' }}>
                                <NavLink to={PATHS.findings} style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>
                                    <LightbulbOutlinedIcon style={{ height: '1em', marginLeft: '5px' }} />
                                    מציאות
                                </NavLink>
                            </MenuItem>
                        </React.Fragment>
                    </Box>
                    <ProfileSettings />
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default ResponsiveAppBar;

