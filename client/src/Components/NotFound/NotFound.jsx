import { Box, Button, Container, Typography, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    loadingPaper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        borderRadius: '15px',
        height: '39vh',
    },
    mainCont: {
        padding: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        [theme.breakpoints.down("sm")]: {
            padding: theme.spacing(2),
        },
    },
    homeBtn: {
        backgroundColor: "#0F1B4C",
        color: "#fff",
        fontWeight: "700",
        fontSize: "18px",
        borderRadius: "7px",
        textTransform: "none",
        border: "2px solid transparent",
        alignItems: 'center',
        padding: theme.spacing(1,3),
        margin: theme.spacing(3, "auto", 3, "auto"),
        "&:hover": {
            backgroundColor: "#fff",
            color: "#0F1B4C",
            borderColor: "#0F1B4C",
        },
    },
}));

const NotFound = () => {
    const classes = useStyles();
    return (
        <Box
            component="main"
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '60vh'
            }}
        >
            <Container className={classes.mainCont}>
                <Typography variant="h4" className={classes.pageUsername}>404 Page Not Found</Typography>
                <Button className={classes.homeBtn} onClick={() => history('/')}>Go back to home page
                </Button>
            </Container>
        </Box>
    )
}

export default NotFound