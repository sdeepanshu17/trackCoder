import { Avatar, Box, Button, Container, styled, IconButton, Tooltip, Typography, makeStyles } from "@material-ui/core"
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { Link, useLocation, useNavigate } from "react-router-dom";
import decode from "jwt-decode";
import {toast} from "react-toastify";

const useStyles = makeStyles((theme) => ({
    heading: {
        textDecoration: 'none',
        color: "#0F1B4C",
        fontFamily: 'Titillium Web',
        fontWeight: '300',
        cursor: "pointer",
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

const NavbarContainer = styled(Container)(({ theme }) => ({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: theme.spacing(5),
    [theme.breakpoints.down("md")]: {
        padding: theme.spacing(2),
    },
}));

const Navbar = () => {
    const classes = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const location = useLocation();
    const dispatch = useDispatch();
    const history = useNavigate();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const logout = () => {
        dispatch({ type: "LOGOUT" });
        setUser(null);
        history("/");
    }

    useEffect(() => {
        const token = user?.token;

        if (token) {
            const decodedToken = decode(token);
            if (decodedToken.exp * 1000 < new Date().getTime()) {
                toast.warn("Session Timed Out!");
                logout();
            }
        }

        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);

    return (
        <NavbarContainer>
            <Box>
                <Typography component={Link} to="/" variant="h4" className={classes.heading}>track<span style={{ fontWeight: 'bold' }}>Coder</span></Typography>
            </Box>
            <Box className={classes.btns} >
                {user ? <div className={classes.profile} >
                <Tooltip title="Account settings">
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <Avatar className={classes.icon} alt={user.result.name} src={user.result?.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                        {/* <Avatar sx={{ width: 32, height: 32 }}>M</Avatar> */}
                    </IconButton>
                    </Tooltip>
                    {/* <Typography className={classes.userName} variant="h6">{user.result.name}</Typography> */}
                    {/* <Button onClick={logout} className={classes.register} variant="contained" >Logout</Button> */}
                    <Menu
                        anchorEl={anchorEl}
                        id="account-menu"
                        open={open}
                        onClose={handleClose}
                        onClick={handleClose}
                        PaperProps={{
                            elevation: 2,
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
                                '&:before': {
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
                        <MenuItem onClick={() => history(`/users/${user.result.username}`)}>
                        <Avatar className={classes.icon} alt={user.result.name}>{user.result.name.charAt(0)}</Avatar> {user.result.name}
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
                    </Menu>
                </div>
                    : <Button component={Link} to="/auth" className={classes.register} variant="contained" >Login</Button>
                }
            </Box>
        </NavbarContainer>
    )
}

export default Navbar