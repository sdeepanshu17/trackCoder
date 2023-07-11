import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"
import { Box, Button, CircularProgress, Container, Grid, Paper, Typography, makeStyles } from "@material-ui/core";
import { ProfileCard } from "./ProfileCard";
import codeforcesLogo from "../../assets/codeforces-svgrepo-com.svg"
import leetcodeLogo from "../../assets/leetcode-svgrepo-com.svg"
import codechefLogo from "../../assets/codechef-svgrepo-com.svg"
import atcoderLogo from "../../assets/atcoder.png"
import { UserProfile } from "./UserProfile";
import Submissions from "./Submissions";
import axios from "axios";

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
        margin: theme.spacing(5,"auto",2,"auto"),
        fontSize: 48,
        fontFamily: 'Plus Jakarta Sans',
        color: "#0F1B4C",
        [theme.breakpoints.down("sm")]: {
            fontSize: 36,
        },
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

const User = () => {
    const classes = useStyles();
    const { username } = useParams();
    const history = useNavigate();
    const [isLoading,setIsLoading] = useState(false);
    const [result,setResult] = useState(false);
    
    const fetchData = async () => {
        try {
            setIsLoading(true);
            let obj = await axios.get(`http://localhost:5001/users/profile/${username}`);
            setResult(obj.data);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            console.log(error);
        }
    }

    useEffect(() => {
        // dispatch(clearProfiles());
        // dispatch(getUserDetails(username));
        // dispatch(getUserSubmission(username));
        fetchData();
    }, [username]);

    if (isLoading) {
        return <Paper elevation={6} className={classes.loadingPaper}>
            <CircularProgress size='7em' />
        </Paper>
    }

    if (!result){
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
                    <Typography variant="h4" className={classes.pageUsername}>User not found</Typography>
                    <Button className={classes.homeBtn} onClick={()=>history('/')}>Go back to home page
                    </Button>
                </Container>
            </Box>
        )
    }

    return (
        <Box component="main" sx={{ flexGrow: 1, }} >
            <Container className={classes.mainCont}>
                <UserProfile user={result} />
                <Grid container spacing={3} >
                    <Grid item xs={12} sm={6} lg={3} >
                        <ProfileCard
                            sx={{ height: '100%' }}
                            OJ="Codeforces"
                            icon={codeforcesLogo}
                            cfData={result.cfProfile}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} lg={3} >
                        <ProfileCard
                            sx={{ height: '100%' }}
                            OJ="Leetcode"
                            icon={leetcodeLogo}
                            lcData={result.lcProfile}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} lg={3} >
                        <ProfileCard
                            sx={{ height: '100%' }}
                            OJ="Codechef"
                            ccData={result.ccProfile}
                            icon={codechefLogo}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} lg={3} >
                        <ProfileCard
                            sx={{ height: '100%' }}
                            OJ="Atcoder"
                            icon={atcoderLogo}
                            acData={result.acProfile}
                        />
                    </Grid>
                    <Typography className={classes.title}>Recent Submissions</Typography>
                    <Submissions multipleUsers={false} rows={result.submissions} />
                </Grid>
            </Container>
        </Box>
    )
}

export default User