import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"
import { getACProfile, getCCProfile, getCFProfile, getCFSubmissions, getLCProfile } from "../../actions/profiles";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, CircularProgress, Container, Grid, Paper, Typography, makeStyles } from "@material-ui/core";
import { getUserDetails, getUserSubmission } from "../../actions/auth";
import { ProfileCard } from "./ProfileCard";
import codeforcesLogo from "../../assets/codeforces-svgrepo-com.svg"
import leetcodeLogo from "../../assets/leetcode-svgrepo-com.svg"
import codechefLogo from "../../assets/codechef-svgrepo-com.svg"
import atcoderLogo from "../../assets/atcoder.png"
import { UserProfile } from "./UserProfile";
import Submissions from "./Submissions";

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
}))

const User = () => {
    const classes = useStyles();
    const { user } = useSelector((state) => state.auth);
    const { cfData, cfProfile, lcProfile, acProfile, isLoading, ccProfile, userSubms } = useSelector((state) => state.profiles);
    const { username } = useParams();
    const history = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUserDetails(username));
        dispatch(getUserSubmission(username));
    }, [username]);

    useEffect(() => {
        // console.log(user);
        if (user) {
            const cfId = user?.result?.codeforces;
            const lcId = user?.result?.leetcode;
            const ccId = user?.result?.codechef;
            const acId = user?.result?.atcoder;
            if (cfId) {
                dispatch(getCFProfile(cfId));
                dispatch(getCFSubmissions(cfId));
            }
            if (lcId) {
                dispatch(getLCProfile(lcId));
            }
            if (ccId){
                dispatch(getCCProfile(ccId));
            }
            if (acId){
                dispatch(getACProfile(acId));
            }
        }
    }, [user]);

    if (isLoading) {
        return <Paper elevation={6} className={classes.loadingPaper}>
            <CircularProgress size='7em' />
        </Paper>
    }

    if (!user){
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
                <UserProfile user={user} />
                <Grid container spacing={3} >
                    <Grid item xs={12} sm={6} lg={3} >
                        <ProfileCard
                            sx={{ height: '100%' }}
                            OJ="Codeforces"
                            icon={codeforcesLogo}
                            data={cfProfile}
                            totQues={cfData.filter((sub) => sub.verdict=="OK").length}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} lg={3} >
                        <ProfileCard
                            sx={{ height: '100%' }}
                            OJ="Leetcode"
                            icon={leetcodeLogo}
                            lcdata={lcProfile}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} lg={3} >
                        <ProfileCard
                            sx={{ height: '100%' }}
                            OJ="Codechef"
                            ccData={ccProfile}
                            icon={codechefLogo}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} lg={3} >
                        <ProfileCard
                            sx={{ height: '100%' }}
                            OJ="Atcoder"
                            icon={atcoderLogo}
                            acData={acProfile}
                        />
                    </Grid>
                    <Typography className={classes.title}>Recent Submissions</Typography>
                    <Submissions rows={userSubms} />
                </Grid>
            </Container>
        </Box>
    )
}

export default User