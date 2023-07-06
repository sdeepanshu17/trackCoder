import PropTypes from 'prop-types';
import {  Typography, makeStyles } from '@material-ui/core';
import { Stack } from "@mui/material"
import Submissions from '../User/Submissions';
import { useDispatch, useSelector } from 'react-redux';
import { getFriendsSubmissions } from '../../actions/auth';
import { useEffect } from 'react';


const useStyles = makeStyles(() => ({
    mainCard: {
        // borderRadius: 20,
        border: 'none',
        background: 'transparent',
        minHeight: '63vh',
        // [theme.breakpoints.down("sm")]: {
        //     minHeight: '40vh',
        // },
    },
    title: {
        fontFamily: 'Titillium Web',
        textAlign: 'center',
        fontSize: '28px',
        fontWeight: '600',
        marginBottom: '20px'
    },
    comingSoon: {
        height: '45vh',
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
        fontWeight: '400'
    }
}))

export const FriendsSubmisions = (props) => {
    const { username } = props;
    const classes = useStyles();
    const { frndsSubms } = useSelector((state) => state.profiles);
    const dispatch = useDispatch();

    useEffect(() => {
        if (username){
            dispatch(getFriendsSubmissions(username));
        }
    }, []);

    return (
        <Stack>
            <Typography className={classes.title} variant="h5" >
                Recent Friends&apos; Submissions
            </Typography>
            <Submissions multipleUsers={true} rows={frndsSubms}  />
        </Stack>
    );
};

FriendsSubmisions.propTypes = {
    username: PropTypes.string,
};
