import PropTypes from 'prop-types';
import { Card, CardContent, Typography, makeStyles } from '@material-ui/core';
import { Stack } from "@mui/material"


const useStyles = makeStyles(() => ({
    mainCard: {
        borderRadius: 20,
        minHeight: '30vh'
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
        fontWeight: '400'
    }
}))

export const UpcomingContests = (props) => {
    const { sx, style } = props;
    const classes = useStyles();

    return (
        <Card elevation={4} className={classes.mainCard} sx={sx} style={style} >
            <CardContent>
                <Stack>
                    <Typography className={classes.title} variant="h5" >
                        Upcoming Contests
                    </Typography>
                    <Typography className={classes.comingSoon} variant="h6">
                        Coming Soon!
                    </Typography>
                    {/* <Typography className={classes.details} variant="h6">
                        Contest 2
                    </Typography>
                    <Typography className={classes.details} variant="h6">
                        Contest 3
                    </Typography>
                    <Typography className={classes.details} variant="h6">
                        Contest 4
                    </Typography> */}
                </Stack>
            </CardContent>
        </Card>
    );
};

UpcomingContests.propTypes = {
    sx: PropTypes.object,
    style: PropTypes.object,
};
