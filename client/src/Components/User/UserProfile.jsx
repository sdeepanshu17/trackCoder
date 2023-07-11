import { IconButton, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import {
    Avatar,
    Box,
    Card,
    CardContent,
    Typography
} from '@material-ui/core';
import { useEffect, useState } from 'react';
// import StarIcon from '@mui/icons-material/Star';
// import StarOutlineIcon from '@mui/icons-material/StarOutline';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFriend } from '../../actions/auth';

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
            width: '70%',
        },
        [theme.breakpoints.down("xs")]: {
            width: '98%'
        },
    },
}))

export const UserProfile = (props) => {
    const {user} = props;
    const classes = useStyles();
    const {authData} = useSelector((state) => state.auth)
    const loggedInUser = authData?.result?.username;
    const dispatch = useDispatch();

    const [isFriend,setIsFriend] = useState(false);

    const toggleElement = () => {
        setIsFriend(!isFriend);
        dispatch(toggleFriend(user?.username));
    };

    useEffect(()=>{
        if (authData?.result?.friends?.includes(user?.username)){
            setIsFriend(true);
        }
    },[authData])

    return (
        <Card className={classes.mainCard} elevation={6}>
            <CardContent>
                <Box sx={{ alignItems: 'center', display: 'flex', flexDirection: 'row', }} >
                    <Avatar className={classes.icon} alt={user?.name}>{user?.name?.charAt(0)}</Avatar>
                    <Box sx={{ display: 'flex', flexGrow: 1, alignItems: 'center', flexDirection: 'column' }} >
                        <Typography variant="h5" className={classes.name} >
                            {user?.name} &nbsp;
                            {loggedInUser && loggedInUser!==user?.username &&
                                <IconButton size='medium' style={{ color: "black" }} onClick={toggleElement}>
                                    {isFriend ? <PersonRemoveIcon /> : <PersonAddIcon />}
                                </IconButton>
                            }
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