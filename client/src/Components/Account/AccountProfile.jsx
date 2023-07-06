import { makeStyles } from '@material-ui/core';
import { Avatar, Box, Card, Typography } from '@material-ui/core';

const useStyles = makeStyles(() => ({
    icon: {
        fontSize: '30px',
        color: '#fff',
        backgroundColor: '#0F1B4C',
        height: 80,
        marginBottom: 8,
        width: 80
    },
    name: {
        fontFamily :'Plus Jakarta Sans',
        fontWeight: '700',
        fontSize: '28px'
    },
    subText: {
        fontFamily :'Plus Jakarta Sans',
        fontWeight: '400',
        fontSize: '16px'
    },
    mainCard: {
        borderRadius: 20,
        boxShadow: 4,
        padding: 20,
    },
    content: {
        padding: 0
    }
}))

export const AccountProfile = (user) =>{ 
    const usr = user.user.result;
    // console.log(usr);
    const classes = useStyles();

    return (
    <Card className={classes.mainCard} elevation={6}>
        {/* <CardContent className={classes.content}> */}
            <Box
                sx={{
                    alignItems: 'center',
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
                <Avatar className={classes.icon} alt={usr?.name} src={usr?.imageUrl} onClick={() => history("/account")}>{usr?.name.charAt(0)}</Avatar>
                <Typography  variant="h5" className={classes.name} >
                    {usr?.name}
                </Typography>
                <Typography className={classes.subText} gutterBottom color="textSecondary" variant="body2" >
                    @{usr?.username}
                </Typography>
                {usr?.codeforces &&
                <Typography color="textSecondary" variant="body2" >
                    Codeforces: {usr?.codeforces}
                </Typography> }
                {usr?.leetcode &&
                <Typography color="textSecondary" variant="body2" >
                    Leetcode: {usr?.leetcode}
                </Typography> }
                {usr?.codechef &&
                <Typography color="textSecondary" variant="body2" >
                    Codechef: {usr?.codechef}
                </Typography> }
                {usr?.atcoder &&
                <Typography color="textSecondary" variant="body2" >
                    Atcoder: {usr?.atcoder}
                </Typography> }
            </Box>
        {/* </CardContent> */}
        {/* <Divider /> */}
        {/* <CardActions>
            <Button
                fullWidth
                variant="text"
            >
                Upload picture
            </Button>
        </CardActions> */}
    </Card>
)};
