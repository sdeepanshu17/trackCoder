import { makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import {
    Avatar,
    Box,
    Card,
    CardContent,
    Typography
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    icon: {
        fontSize: '30px',
        color: '#fff',
        backgroundColor: '#0F1B4C',
        height: 80,
        // marginRight: theme.spacing(1),
        width: 80
    },
    name: {
        fontFamily: 'Plus Jakarta Sans',
        fontWeight: '700',
        fontSize: '28px'
    },
    subText: {
        fontFamily: 'Plus Jakarta Sans',
        fontWeight: '400',
        fontSize: '16px'
    },
    mainCard: {
        borderRadius: 20,
        boxShadow: 4,
        width: '35%',
        textAlign: "center",
        marginBottom: theme.spacing(4),
        [theme.breakpoints.down("md")]: {
            width: '45%'
        },
        [theme.breakpoints.down("sm")]: {
            width: '55%',
        },
        [theme.breakpoints.down("xs")]: {
            width: '98%'
        },
    },
}))

export const UserProfile = (props) => {
    // const usr = user?.user?.result;
    const {user} = props;
    const classes = useStyles();

    return (
        <Card className={classes.mainCard} elevation={6}>
            <CardContent>
                <Box
                    sx={{
                        alignItems: 'center',
                        display: 'flex',
                        flexDirection: 'row',
                    }}
                >
                    <Avatar className={classes.icon} alt={user?.name}>{user?.name?.charAt(0)}</Avatar>
                    <Box
                        sx={{
                            display: 'flex',
                            flexGrow: 1,
                            alignItems: 'center',
                            flexDirection: 'column'
                        }}
                    >
                        <Typography variant="h5" className={classes.name} >
                            {user?.name}
                        </Typography>
                        <Typography className={classes.subText} color="textSecondary" variant="body2" >
                            @{user?.username}
                        </Typography>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    )
};


UserProfile.propTypes = {
    user: PropTypes.object,
};