import PropTypes from 'prop-types';
import { Card, CardContent, Icon, Typography, makeStyles } from '@material-ui/core';
import { Stack } from "@mui/material"


const useStyles = makeStyles(()=>({
    mainCard: {
        borderRadius: 20
    },
    imageIcon: {
        height: 44,
        width: 44,
        opacity: '40%',
    },
    iconRoot: {
        height: 44,
        width: 44,
        textAlign: 'center',
    },
    username: {
        textDecoration: 'none',
    },
    details: {
        fontFamily :'Plus Jakarta Sans',
        fontSize: '18px',
        fontWeight: '400'
    }
}))

export const EmptyCard = (props) => {
    const { sx, icon } = props;
    const classes = useStyles();

    return (
        <Card elevation={4}  className={classes.mainCard} sx={sx}>
            <CardContent>
                <Stack>
                    <Stack
                        alignItems="flex-start"
                        direction="row"
                        justifyContent="space-between"
                        spacing={3}
                    >
                        <Stack>
                            <Typography className={classes.username} color="textSecondary" variant="overline" >
                                Not Connected
                            </Typography>
                        <Typography className={classes.details} variant="h6">
                            Rating: - 
                        </Typography>
                            
                        </Stack>
                        <Icon classes={{root: classes.iconRoot}}>
                            <img className={classes.imageIcon} src={icon} />
                        </Icon>
                    </Stack>
                        <Typography className={classes.details} variant="h6">
                            Rank: -
                        </Typography>
                        <Typography className={classes.details} variant="h6">
                            Max Rating: -
                        </Typography>
                        <Typography className={classes.details} variant="h6">
                            Problems Solved: -
                        </Typography>
                </Stack>
            </CardContent>
        </Card>
    );
};

EmptyCard.propTypes = {
    icon: PropTypes.string,
    sx: PropTypes.object
};
