import PropTypes from 'prop-types';
import { Card, CardContent, IconButton, Typography, makeStyles } from '@material-ui/core';
import { Stack } from "@mui/material"
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFriend } from '../../actions/auth';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import { Link, useNavigate } from 'react-router-dom';

const useStyles = makeStyles(() => ({
    mainCard: {
        borderRadius: 20,
        minHeight: '30vh',
        display: 'flex',
        justifyContent: 'center',
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
        alignItems: 'center',
        textDecoration: 'none',
        color: 'black',
        '&:hover': {
            textDecoration: 'underline',
        },
    }
}))

export const MyFriends = (props) => {
    const { sx } = props;
    const classes = useStyles();
    const {authData} = useSelector((state)=>state.auth);
    const history = useNavigate();

    // const { frnds, isLoading } = useSelector((state) => state.profiles);
    const [frnds,setFrnds] = useState(authData?.result?.friends);
    const dispatch = useDispatch();
    const [frndList, setFrndList] = useState(Array(frnds?.length).fill(1));
    // console.log(frndList);
    
    useEffect(() => {
        if(!authData){
            history("/");
        }
        setFrnds(authData?.result?.friends);
    }, [authData]);
    
    useEffect(()=>{
        setFrndList(Array(frnds?.length).fill(1));
    },[frnds])

    const toggleElement = (index) => {
        setFrndList((prevArray) => {
            const newArray = [...prevArray];
            newArray[index] = newArray[index] === 1 ? 0 : 1;
            return newArray;
        });
        dispatch(toggleFriend(frnds[index]));
    };

    // if (isLoading) {
    //     return (
    //         <Card elevation={4} className={classes.mainCard} sx={sx} style={style} >
    //             <CardContent>
    //                 <Stack>
    //                     <Typography className={classes.title} variant="h5" >
    //                         Your Friends
    //                     </Typography>
    //                     <Typography className={classes.comingSoon} variant="h6">
    //                         <CircularProgress size='4em' />
    //                     </Typography>
    //                 </Stack>
    //             </CardContent>
    //         </Card>
    //     );
    // }

    return (
        <Card elevation={4} className={classes.mainCard} sx={sx} >
            <CardContent>
                <Stack>
                    <Typography className={classes.title} variant="h5" >
                        Your Friends
                    </Typography>
                    {frnds?.length>0 ? frnds?.map((frnd, index) => {
                        const url = `/users/${frnd}`;
                        return (
                        <div style={{display: 'flex', justifyContent: 'center',}} key={index}>
                            <Typography component={Link} to={url} className={classes.details} variant="h6">
                                {frnd}&nbsp;
                            </Typography>
                            <IconButton size='small' style={{ color: "black" }} onClick={() => toggleElement(index)} >
                                {frndList[index]===1 ? <StarIcon /> : <StarOutlineIcon />}
                            </IconButton>
                        </div>
                    )})
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
