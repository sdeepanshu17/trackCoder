import { Box, Typography, styled } from "@mui/material";
import heroImg from "../../assets/undraw_dashboard_re_3b76.svg";
import { Button, makeStyles } from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useEffect } from "react";

const useStyles = makeStyles((theme) => ({
    heroBtn: {
        backgroundColor: "#0F1B4C",
        color: "#fff",
        fontWeight: "700",
        fontSize: "14px",
        cursor: "pointer",
        padding: "0.5rem 1.25rem",
        borderRadius: "7px",
        textTransform: "none",
        display: "flex",
        border: "2px solid transparent",
        alignItems: 'center',
        width: '35%',
        "&:hover": {
            backgroundColor: "#fff",
            color: "#0F1B4C",
            borderColor: "#0F1B4C",
        },
        [theme.breakpoints.down("md")]: {
            margin: theme.spacing(0, "auto", 3, "auto"),
            width: "90%",
        },
    },
    mainBox: {
        display: "flex",
        justifyContent: "center",
        alignItems: 'center',
        gap: theme.spacing(7),
        marginTop: theme.spacing(7),
        padding: theme.spacing(5),
        [theme.breakpoints.down("md")]: {
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            padding: theme.spacing(2),
        },
    }
}));

const Hero = () => {
    const classes = useStyles();

    const user = JSON.parse(localStorage.getItem('profile'));
    const history = useNavigate();

    const Title = styled(Typography)(({ theme }) => ({
        fontSize: "64px",
        color: "#000336",
        fontWeight: "bold",
        margin: theme.spacing(4, 0, 4, 0),
        [theme.breakpoints.down("sm")]: {
            fontSize: "40px",
        },
    }));

    useEffect(()=>{
        if (user){
            history("/dashboard");
        }
    },[user]);

    return (
        <Box className={classes.mainBox}>
            <Box sx={{ flex: "1" }}>
                <Title variant="h1">
                    Dominate the Coding Arena.
                </Title>
                <Typography variant="body2" sx={{ fontSize: "18px", color: "#5A6473", my: 4 }}>
                    Seamlessly track your competitive programming journey with the help of trackCoder
                </Typography>
                <Button component={Link} to="/auth" variant="contained" className={classes.heroBtn}>Get Started <ChevronRightIcon /></Button>
            </Box>

            <Box sx={{ flex: "1.25" }}>
                <img
                    src={heroImg}
                    alt="heroImg"
                    style={{ maxWidth: "100%", marginBottom: "2rem" }}
                />
            </Box>
        </Box>
    )
}

export default Hero;