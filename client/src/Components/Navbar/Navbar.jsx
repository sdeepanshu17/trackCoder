import { AppBar, Box, Toolbar, IconButton, Typography, Container, Avatar, Button, Tooltip, useScrollTrigger } from "@material-ui/core"
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import MenuIcon from '@mui/icons-material/Menu';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { makeStyles } from '@material-ui/core';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import decode from "jwt-decode";
import { toast } from "react-toastify";
import { LOGOUT } from "../../constants/actionTypes";

const pages = ['Dashboard', 'Friends'];

const useStyles = makeStyles((theme) => ({
    appBar: {
        background: '#E6F0FF',
        padding: theme.spacing(0),
    },
    mainCont: {
        padding: theme.spacing(2, 3, 0, 3),
        [theme.breakpoints.down("xs")]: {
            padding: theme.spacing(0, 0.5, 0, 0.5),
        },
    },
    heading: {
        textDecoration: 'none',
        display: 'flex',
        color: "#0F1B4C",
        fontFamily: 'Titillium Web',
        fontWeight: '300',
        cursor: "pointer",
        marginRight: theme.spacing(2),
        [theme.breakpoints.down("xs")]: {
            display: 'none'
        },
    },
    navbarItem: {
        textDecoration: 'none',
        color: "#0F1B4C",
        fontFamily: 'Titillium Web',
        fontWeight: 'bold',
        fontSize: '20px',
        marginRight: theme.spacing(2),
    },
    navmenuItem: {
        textDecoration: 'none',
        color: "#0F1B4C",
        fontFamily: 'Titillium Web',
        fontSize: '20px',
        paddingRight: theme.spacing(4),
    },
    headingMobile: {
        textDecoration: 'none',
        display: 'none',
        color: "#0F1B4C",
        fontFamily: 'Titillium Web',
        fontWeight: '300',
        cursor: "pointer",
        marginRight: theme.spacing(2),
        [theme.breakpoints.down("xs")]: {
            display: 'flex'
        },
    },
    register: {
        backgroundColor: "#0F1B4C",
        color: "#fff",
        fontWeight: "700",
        fontSize: "14px",
        cursor: "pointer",
        padding: "0.5rem 1.25rem",
        borderRadius: "7px",
        textTransform: "none",
        display: "block",
        border: "2px solid transparent",
        "&:hover": {
            backgroundColor: "#fff",
            color: "#0F1B4C",
            borderColor: "#0F1B4C",
        },
    },
    btns: {
        display: "flex",
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "center",
        gap: "1rem",
    },
    profile: {
        display: 'flex',
        justifyContent: 'center',
        gap: '1rem',
        alignItems: 'center',
    },
    userName: {
        display: 'flex',
        alignItems: 'center',
        [theme.breakpoints.down("sm")]: {
            display: 'none'
        },
    },
    icon: {
        color: '#fff',
        backgroundColor: '#0F1B4C',
        width: 48,
        height: 48,
        "&:hover": {
            cursor: 'pointer'
        },
    },

}));

function Navbar() {
    const classes = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const location = useLocation();
    const dispatch = useDispatch();
    const history = useNavigate();
    const trigger = useScrollTrigger();

    const logout = () => {
        dispatch({ type: LOGOUT });
        setUser(null);
        history("/");
    }

    useEffect(() => {
        const token = user?.token;
        // console.log(token);
        if (token) {
            const decodedToken = decode(token);
            // setUser(decodedToken);
            if (decodedToken.exp * 1000 < new Date().getTime()) {
                toast.warn("Session Timed Out!");
                logout();
            }
        }

        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar elevation={trigger ? 4 : 0}  className={classes.appBar} position="sticky">
            <Container className={classes.mainCont}>
                <Toolbar disableGutters>
                    <Typography component={Link} to="/" variant="h4" className={classes.heading}>track<span style={{ fontWeight: 'bold' }}>Coder</span></Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', sm: 'none' } }}>
                        <IconButton aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleOpenNavMenu} style={{ color: "#0F1B4C" }} >
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
                            onClick={handleCloseNavMenu}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { sm: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page} onClick={handleCloseNavMenu}>
                                    <Typography className={classes.navmenuItem} component={Link} to={page}>{page}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                        <Typography component={Link} to="/" variant="h4" className={classes.headingMobile}>track<span style={{ fontWeight: 'bold' }}>Coder</span></Typography>
                    </Box>

                    {user &&
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'flex' }, justifyContent: 'flex-end' }}>
                            {pages.map((page) => (
                                <Typography key={page} className={classes.navbarItem} component={Link} to={page}>{page}</Typography>
                            ))}
                        </Box>
                    }

                    {user ?
                        <Box sx={{ flexGrow: 0, p: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar className={classes.icon} alt={user?.result?.name} src={user?.result?.imageUrl}>{user?.result?.name?.charAt(0)}</Avatar>
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '65px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                                onClick={handleCloseUserMenu}
                                
                            >
                                <MenuItem onClick={() => history(`/users/${user?.result?.username}`)}>
                                    <Avatar className={classes.icon} alt={user?.result?.name}>{user?.result?.name?.charAt(0)}</Avatar> &nbsp; {user?.result?.name}
                                </MenuItem>
                                <Divider />
                                <MenuItem onClick={() => history("/account")}>
                                    <ListItemIcon>
                                        <Settings fontSize="small" />
                                    </ListItemIcon>
                                    Settings
                                </MenuItem>
                                <MenuItem onClick={logout}>
                                    <ListItemIcon>
                                        <Logout fontSize="small" />
                                    </ListItemIcon>
                                    Logout
                                </MenuItem>
                                {/* {settings.map((setting) => (
                                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center">{setting}</Typography>
                                </MenuItem>
                            ))} */}
                            </Menu>
                        </Box>
                        : 
                        <Box sx={{ flexGrow: 1, display:'flex', justifyContent: 'flex-end' }}>
                            <Button component={Link} to="/auth" className={classes.register} variant="contained" >Login</Button>
                        </Box>
                    }
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default Navbar;