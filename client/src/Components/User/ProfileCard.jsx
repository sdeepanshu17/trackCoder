import PropTypes from 'prop-types';
import { Card, CardContent, Icon, Typography, capitalize, makeStyles } from '@material-ui/core';
import { Stack } from "@mui/material"
import { Link } from 'react-router-dom';
import { EmptyCard } from './EmptyCard';
// import { Avatar, Card, CardContent, Typography, Stack, makeStyles} from "@mui/material"


const useStyles = makeStyles(()=>({
    mainCard: {
        borderRadius: 20,
    },
    imageIcon: {
        height: 48,
        width: 48,
        opacity: '40%',
    },
    iconRoot: {
        height: 48,
        width: 48,
        textAlign: 'center',
    },
    username: {
        textDecoration: 'none',
        "&:hover": {
            textDecoration: "underline",
        },
    },
    details: {
        fontFamily :'Plus Jakarta Sans',
        fontSize: '18px',
        fontWeight: '400'
    }
}))

export const ProfileCard = (props) => {
    const { OJ, lcdata, data, ccData, acData, totQues, sx, icon } = props;
    const classes = useStyles();
    let profile, profileLink, quesCt, accuracy;
    
    if (data==null && lcdata==null && ccData==null && acData==null){
        return (
            <EmptyCard icon={icon} sx={sx} />
        )
    }
    if (OJ=="Codeforces"){
        profile = data[0];
        profileLink = `https://codeforces.com/profile/${profile?.handle}`
    }
    if (OJ=="Leetcode"){
        quesCt = lcdata?.matchedUser?.submitStats?.acSubmissionNum[0]?.count;
        accuracy = ((lcdata?.matchedUser?.submitStats?.acSubmissionNum[0]?.count)/(lcdata?.matchedUser?.submitStats?.acSubmissionNum[0]?.submissions))*100;
        profileLink = `https://leetcode.com/${lcdata?.matchedUser?.username}`;
    }
    if (OJ=="Codechef"){
        profileLink = `https://codechef.com/users/${ccData?.username}`;
    }
    if (OJ=="Atcoder"){
        profileLink = `https://atcoder.jp/users/${acData?.username}`;
    }

    return (
        <Card elevation={4} className={classes.mainCard} sx={sx}>
            <CardContent>
                <Stack>
                    <Stack
                        alignItems="flex-start"
                        direction="row"
                        justifyContent="space-between"
                        spacing={3}
                    >
                        <Stack>
                            <Typography component={Link} to={profileLink} target={"_blank"} className={classes.username} color="textSecondary" variant="overline" >
                                {OJ==="Codeforces" && ( profile?.handle || "NOT CONNECTED" ) }
                                {OJ==="Leetcode" && (lcdata?.matchedUser?.username || "NOT CONNECTED") }
                                {OJ==="Codechef" && (ccData?.username  || "NOT CONNECTED" ) }
                                {OJ==="Atcoder" && (acData?.username  || "NOT CONNECTED") }
                            </Typography>
                        <Typography className={classes.details} variant="h6">
                            {OJ==="Codeforces" ? `Rating: ${profile?.rating}` : null}
                            {OJ==="Leetcode" ? `Rating: ${Math.round(lcdata?.userContestRanking?.rating)}` : null}
                            {OJ==="Codechef" ? `Rating: ${ccData?.rating}` : null}
                            {OJ==="Atcoder" ? `Rating: ${acData?.rating}` : null}
                        </Typography>
                            
                        </Stack>
                        <Icon component={Link} to={profileLink} target={"_blank"} classes={{root: classes.iconRoot}}>
                            <img className={classes.imageIcon} src={icon} />
                        </Icon>
                    </Stack>
                        <Typography className={classes.details} variant="h6">
                            {OJ==="Codeforces" ? `Rank : ${capitalize(profile?.rank)}` : null}
                            {OJ==="Leetcode" ? `Rank: ${lcdata?.userContestRanking?.globalRanking}` : null}
                            {OJ==="Codechef" ? `Rank: ${ccData?.globalRank}` : null}
                            {OJ==="Atcoder" ? `Rank: ${acData?.globalRank}` : null}
                        </Typography>
                        <Typography className={classes.details} variant="h6">
                            {OJ==="Codeforces" && `Max Rating : ${profile?.maxRating}`}
                            {OJ==="Leetcode" ? `Problems Solved: ${quesCt}` : null}
                            {OJ==="Codechef" && `Max Rating : ${ccData?.maxRating}`}
                            {OJ==="Atcoder" && `Max Rating : ${acData?.maxRating}`}
                        </Typography>
                        <Typography className={classes.details} variant="h6">
                            {OJ==="Codeforces" ? `Problems Solved: ${totQues}` : null}
                            {OJ==="Leetcode" ? `Accuracy: ${accuracy.toFixed(2)}%` : null}
                            {OJ==="Codechef" ? `Problems Solved: ${ccData?.fullySolvedCount}` : null}
                            {OJ==="Atcoder" ? `Problems Solved: ${acData?.fullySolvedCount}` : null}
                        </Typography>
                </Stack>
            </CardContent>
        </Card>
    );
};

ProfileCard.propTypes = {
    icon: PropTypes.string,
    OJ: PropTypes.string,
    value: PropTypes.string,
    lcdata: PropTypes.object,
    ccData: PropTypes.object,
    acData: PropTypes.object,
    data: PropTypes.array,
    totQues: PropTypes.number,
    sx: PropTypes.object
};
