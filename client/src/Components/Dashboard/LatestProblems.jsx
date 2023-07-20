import PropTypes from 'prop-types';
import { Card, CardContent, CircularProgress, IconButton, Typography, makeStyles } from '@material-ui/core';
import { Stack } from "@mui/material"
import { useEffect, useState } from 'react';
import { BASE_URL } from '../../constants/api';
import axios from "axios";
import LaunchIcon from '@mui/icons-material/Launch';
import { Link, useNavigate } from 'react-router-dom';

const useStyles = makeStyles(() => ({
    mainCard: {
        borderRadius: 20,
        height: '30vh',
        overflow: 'auto'
    },
    title: {
        fontFamily: 'Titillium Web',
        textAlign: 'center',
        fontSize: '28px',
        fontWeight: '600',
        marginBottom: '8px'
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
        textAlign: 'center',
        textDecoration: 'none',
        color: 'black',
        '&:hover': {
            textDecoration: 'underline',
        }
    }
}))

export const LatestProblems = (props) => {
    const { sx, style } = props;
    const classes = useStyles();
    const [isLoading,setIsLoading] = useState(false);
    const [result,setResult] = useState(false);
    // const history = useNavigate();

    const fetchLatestProblems = async () => {
        try {
            setIsLoading(true);
            let obj = await axios.get(`${BASE_URL}/problems/latest`);
            setResult(obj.data);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            console.log(error);
        }
    }

    useEffect(() => {
        fetchLatestProblems();
    }, []);

    if (isLoading) {
        return (
        <Card elevation={4} className={classes.mainCard} sx={sx} style={style} >
            <CardContent>
                <Stack>
                    <Typography className={classes.title} variant="h5" >
                        Latest Problems
                    </Typography>
                    <Typography className={classes.comingSoon} variant="h6">
                        <CircularProgress size='3em' />
                    </Typography>
                    </Stack>
                </CardContent>
        </Card>
        )
    }

    return (
        <Card elevation={4} className={classes.mainCard} sx={sx} style={style} >
            <CardContent>
                <Stack>
                    <Typography className={classes.title} variant="h5" >
                        Latest Problems
                    </Typography>
                    {
                        result && result.map((problem) => (
                            <Typography component={Link} to={problem?.url} target='_blank' key={problem?.id} className={classes.details} variant="h6">
                                {problem?.name}
                                {/* <IconButton size='small' style={{ color: "black"}} onClick={() => history("/")}> <LaunchIcon style={{ height: '20px', width: '20px' }} /> </IconButton> */}
                            </Typography>
                        ))
                    }
                    {/* <Typography className={classes.details} variant="h6">
                        More...
                    </Typography> */}
                </Stack>
            </CardContent>
        </Card>
    );
};

LatestProblems.propTypes = {
    sx: PropTypes.object,
    style: PropTypes.object,
};
