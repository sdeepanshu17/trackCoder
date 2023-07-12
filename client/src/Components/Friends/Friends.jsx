import { Box, Container, Grid, Typography, makeStyles } from '@material-ui/core';
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { SearchUser } from './SearchUser';
import { MyFriends } from './MyFriends';

const useStyles = makeStyles((theme) => ({
    loadingPaper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        borderRadius: '15px',
        height: '39vh',
    },
    title: {
        fontWeight: 'bold',
        margin: theme.spacing(0, "auto", 6, "auto"),
        fontSize: 48,
        fontFamily: 'Plus Jakarta Sans',
        color: "#0F1B4C",
        [theme.breakpoints.down("sm")]: {
            fontSize: 36,
        },
    },
    mainCont: {
        padding: theme.spacing(1, 2),
        margin: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        [theme.breakpoints.down("sm")]: {
            padding: theme.spacing(2),
        },
    },
}));

const Friends = () => {
    const classes = useStyles();
    const user = JSON.parse(localStorage.getItem('profile'));
    const history = useNavigate();


    useEffect(() => {
        if (!user) {
            history("/");
        }
    }, [user]);

    return (
        <Box component="main" sx={{ flexGrow: 1 }} >
            <Container className={classes.mainCont}>
                <Typography className={classes.title}>Friends</Typography>
                <Grid container spacing={3} >
                    <Grid item xs={12} sm={12} md={6} lg={6} >
                        <SearchUser sx={{ height: '100%' }} style={{}} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} >
                        <MyFriends username={user?.result?.username} sx={{ height: '100%' }} style={{}} />
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}

export default Friends