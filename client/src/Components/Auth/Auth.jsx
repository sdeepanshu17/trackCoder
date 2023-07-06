import { Box, Typography, styled } from "@mui/material";
import loginImg from "../../assets/undraw_secure_login_pdn4.svg";
import signUpImg from "../../assets/undraw_sign_up_n6im.svg";
import { Button, Grid, makeStyles } from "@material-ui/core";
import { useState } from "react";
import Input from "./Input";
import { useDispatch } from "react-redux";
import { signin, signup } from "../../actions/auth";
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { red } from '@material-ui/core/colors';
import InfoIcon from '@mui/icons-material/Info';

const useStyles = makeStyles((theme) => ({
    submitBtn: {
        backgroundColor: "#0F1B4C",
        color: "#fff",
        fontWeight: "700",
        fontSize: "14px",
        borderRadius: "7px",
        textTransform: "none",
        display: "flex",
        border: "2px solid transparent",
        alignItems: 'center',
        width: "100%",
        margin: theme.spacing(3, "auto", 3, "auto"),
        "&:hover": {
            backgroundColor: "#fff",
            color: "#0F1B4C",
            borderColor: "#0F1B4C",
        },
        [theme.breakpoints.down("sm")]: {
        },
    },
    mainBox: {
        display: "flex",
        justifyContent: "center",
        // alignItems: 'center',
        gap: theme.spacing(7),
        marginTop: theme.spacing(3),
        padding: theme.spacing(5),
        [theme.breakpoints.down("sm")]: {
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            padding: theme.spacing(2),
        },
    },
    switchLink: {
        textDecoration: "none",
        "&:hover": {
            textDecoration: "underline",
            backgroundColor: "transparent",
            cursor: 'pointer'
        },
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    imgContainer: {
        [theme.breakpoints.down("sm")]: {
            display: 'none'
        },
    },
    errorContainer: {
        display: 'flex',
        alignItems: 'center',
        color: theme.palette.getContrastText(red[100]),
        backgroundColor: red[100],
        padding: 10,
        borderRadius: 5
    },
}));

const Hero = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useNavigate();
    const [errorMessage,setErrorMessage] = useState('');

    const initialState = {firstName:'',lastName:'',username:'',password:'',confirmPassword:'',};


    const [isSignup,setisSignup] = useState(false);
    const [showPassword,setShowPassword] = useState(false);
    const [formData,setFormData] = useState(initialState);

    const Title = styled(Typography)(({ theme }) => ({
        fontSize: "40px",
        color: "#000336",
        fontWeight: "bold",
        margin: theme.spacing(0, 0, 1, 0),
        [theme.breakpoints.down("sm")]: {
            fontSize: "20px",
        },
    }));

    const switchMode = () => {
        setisSignup(!isSignup);
        setErrorMessage(null);
        setShowPassword(false);
    }
    const handleChange = (e) => {
        setFormData({...formData,[e.target.name]: e.target.value});
    }
    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const submitHandler = (e) => {
        e.preventDefault();
        if (isSignup) {
            dispatch(signup(formData,history,setErrorMessage));
        }
        else{
            dispatch(signin(formData,history,setErrorMessage));
        }
    }

    return (
        <Box className={classes.mainBox}>
                <Box className={classes.imgContainer} sx={{ flex: "1.25" }}>
                    <img
                        src={isSignup ? signUpImg : loginImg}
                        alt="heroImg"
                        style={{ maxWidth: "100%", marginBottom: "2rem" }}
                    />
                </Box>
            <Box sx={{ flex: "1" }}>
                <Title variant="h4">
                    {isSignup ? "Get Started!" : "Sign In"}
                </Title>
                <Typography variant="body2" sx={{ fontSize: "18px", color: "#5A6473", marginBottom: 2 }}>
                {isSignup ? "Already have an account? " : "New user? "}<span className={classes.switchLink} onClick={switchMode}>{isSignup ? "Sign in" : "Create an account"}</span>
                </Typography>
                {errorMessage ?
                <Typography className={classes.errorContainer}>
                    <InfoIcon sx={{padding: "0px 5px 0px 5px",}} style={{color: "red"}} /> {errorMessage}
                </Typography>
                : null }
                <form className={classes.form} onSubmit={submitHandler}>
                <Grid container spacing={2}>
                    {isSignup && (
                        <>
                            <Input name="name" label="Name" handleChange={handleChange} autoFocus />
                        </>
                    )}
                    <Input name="username" label="Username" handleChange={handleChange} />
                    {/* <Input name="email" label="Email Address" handleChange={handleChange} type="email" /> */}
                    <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                    {isSignup && <Input name="confirmPassword" label="Confirm Password" handleChange={handleChange} type="password" />}
                </Grid>
                <Button type="submit" variant="contained" className={classes.submitBtn}>{isSignup ? "Create account" : "Login"}</Button>
                </form>
            </Box>
        </Box>
    )
}

export default Hero;