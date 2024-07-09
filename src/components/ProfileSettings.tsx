import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { PATHS } from '../routes/paths';
import { selectAuth } from "../redux/auth/auth.selectors"
import AccountCircle from '@mui/icons-material/AccountCircle';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Logout from '@mui/icons-material/Logout';
import { removeSession } from '../auth/utils';
import VariantButtonGroup from './SignInLoginButtons';
import { useAppSelector } from '../redux/store';
import { Link } from 'react-router-dom';
export default function ProfileSettings() {
    const auth = useAppSelector(selectAuth)
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        console.log(event.currentTarget)
        setAnchorElUser(event.currentTarget);
    }
    const handleLogout = () => {
        removeSession();
    }
    return (
        <React.Fragment>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                {
                    !auth.isAuthenticated &&
                    (<VariantButtonGroup />)}
                {auth.isAuthenticated && (
                    <Tooltip title="Account settings">
                        <IconButton
                            onClick={handleOpenUserMenu}
                            size="small"
                            sx={{ ml: 2 }}
                            aria-controls={anchorElUser ? 'account-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={anchorElUser ? 'true' : undefined}
                        >
                            {(<Avatar sx={{ width: 32, height: 32, textAlign: 'center', textTransform: 'capitalize' }}>
                                {auth.isAuthenticated && auth.user && (auth.user.name.charAt(0))}
                                {!auth.isAuthenticated && (<AccountCircle sx={{ fontSize: 40 }} />)}
                            </Avatar>)}
                        </IconButton>
                    </Tooltip>
                )}

            </Box>
            <Menu
                anchorEl={anchorElUser}
                id="account-menu"
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
                onClick={handleCloseUserMenu}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&::before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >

                <MenuItem component={Link} to={PATHS.profile} onClick={handleCloseUserMenu} style={{ display: 'flex', alignItems: 'center' }}>
                    <div dir="rtl" >
                        הפרופיל שלי
                    </div>
                    <Avatar style={{ marginLeft: '5px' }} />
                </MenuItem>
                <MenuItem component={Link} to={PATHS.requests} onClick={handleCloseUserMenu} style={{ display: 'flex', alignItems: 'center' }}>
                    <div dir="rtl" >
                        הבקשות שלי
                    </div>
                    <Avatar style={{ marginLeft: '5px' }} />
                </MenuItem>
                <Divider />
                <MenuItem onClick={() => {
                    handleCloseUserMenu()
                    handleLogout()
                }} style={{ display: 'flex', alignItems: 'center' }}>
                    <div dir="rtl" >
                        התנתקות
                    </div>
                    <ListItemIcon style={{ marginLeft: '30px' }}>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                </MenuItem>
            </Menu>
        </React.Fragment>
    )
}