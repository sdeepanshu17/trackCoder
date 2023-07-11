import PropTypes from 'prop-types';
import { Card, CardContent, CircularProgress, IconButton, Typography, makeStyles } from '@material-ui/core';
import { Stack } from "@mui/material"
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFriends, toggleFriend } from '../../actions/auth';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';

const useStyles = makeStyles(() => ({
    mainCard: {
        borderRadius: 20,
        minHeight: '30vh',
    },
    title: {
        fontFamily: 'Titillium Web',
        textAlign: 'center',
        fontSize: '28px',
        fontWeight: '600',
        marginBottom: '20px'
    },
    comingSoon: {
        height: '15vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Titillium Web',
        fontSize: '28px',
        fontWeight: '400',
    },
    details: {
        fontFamily: 'Plus Jakarta Sans',
        fontSize: '18px',
        fontWeight: '400',
        display: 'flex',
        justifyContent: 'center',
        textAlign: 'center',
        alignItems: 'center'
    }
}))

export const MyFriends = (props) => {
    const { sx, style, username } = props;
    const classes = useStyles();
    
    const { frnds, isLoading } = useSelector((state) => state.profiles);
    const dispatch = useDispatch();
    const [frndList, setFrndList] = useState(Array(frnds?.length).fill(1));
    console.log(frndList);
    
    useEffect(() => {
        dispatch(getFriends(username));
        console.log(frnds);
        setFrndList(Array(frnds?.length).fill(1));
    }, []);

    const toggleElement = (index) => {
        setFrndList((prevArray) => {
            const newArray = [...prevArray];
            newArray[index] = newArray[index] === 1 ? 0 : 1;
            return newArray;
        });
        dispatch(toggleFriend(frnds[index]));
    };

    if (isLoading) {
        return (
            <Card elevation={4} className={classes.mainCard} sx={sx} style={style} >
                <CardContent>
                    <Stack>
                        <Typography className={classes.title} variant="h5" >
                            Your Friends
                        </Typography>
                        <Typography className={classes.comingSoon} variant="h6">
                            <CircularProgress size='4em' />
                        </Typography>
                    </Stack>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card elevation={4} className={classes.mainCard} sx={sx} >
            <CardContent>
                <Stack>
                    <Typography className={classes.title} variant="h5" >
                        Your Friends
                    </Typography>
                    {frnds?.length>0 ? frnds?.map((frnd, index) => (
                        <Typography key={index} className={classes.details} variant="h6">
                            {frnd}&nbsp;
                            <IconButton size='small' style={{ color: "black" }} onClick={() => toggleElement(index)} >
                                {frndList[index]===1 ? <StarIcon /> : <StarOutlineIcon />}
                            </IconButton>
                        </Typography>
                    ))
                    : <Typography className={classes.details}>Search users and add them as friends! </Typography>}
                </Stack>
            </CardContent>
        </Card>
    );
};

MyFriends.propTypes = {
    sx: PropTypes.object,
    style: PropTypes.object,
    username: PropTypes.string
};
