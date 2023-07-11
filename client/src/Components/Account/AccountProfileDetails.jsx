import { useEffect, useState } from 'react';
import { Card, CardContent, Grid, Typography } from '@material-ui/core';
import LoadingButton from '@mui/lab/LoadingButton';
import Input from './Input';
import { makeStyles } from '@material-ui/core';
import { useDispatch, useSelector } from "react-redux";
import { updateUserDetails } from '../../actions/auth';
import SendIcon from "@mui/icons-material/Send"
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    submitBtn: {
        backgroundColor: "#0F1B4C",
        color: "#fff",
        fontWeight: "700",
        fontSize: "14px",
        borderRadius: "7px",
        textTransform: "none",
        display: "flex",
        border: "2px solid transparent",
        alignItems: 'center',
        width: "100%",
        margin: theme.spacing(3, "auto", 0, "auto"),
        "&:hover": {
            backgroundColor: "#fff",
            color: "#0F1B4C",
            borderColor: "#0F1B4C",
        },
        [theme.breakpoints.down("sm")]: {
        },
    },
    mainCard: {
        borderRadius: 20,
        padding: 20,
    },
    titleText: {
        fontFamily :'Plus Jakarta Sans',
        fontWeight: '700',
        fontSize: '28px',
        margin: theme.spacing(0, "auto", 0, 2),
    },
    subText: {
        fontFamily :'Plus Jakarta Sans',
        fontWeight: '400',
        fontSize: '16px',
        margin: theme.spacing(0, "auto", 2, 2),
        color: 'textSecondary'
    }
}));

export const AccountProfileDetails = (user) => {
    const initUser = user?.user?.result;
    const [formData, setFormData] = useState(initUser);
    const classes = useStyles();
    const dispatch = useDispatch();
    const {isLoading} = useSelector((state)=>state.auth);
    const history = useNavigate();

    useEffect(()=>{
        setFormData(initUser);
    },[initUser]);

    const handleChange = (e) => {
        setFormData({...formData,[e.target.name]: e.target.value});
        // console.log(formData);
    }

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateUserDetails(formData, history));
    }

    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <Card className={classes.mainCard} elevation={6}>
                <Typography className={classes.titleText} > Profile </Typography>
                <Typography className={classes.subText} > The information can be edited </Typography>
                {/* <CardHeader
                subheader="The information can be edited"
                title="Profile"
                /> */}
            <CardContent sx={{ pt: 0 }}>
            <Grid container spacing={2}>
                <Input name="name" label="Name" handleChange={handleChange} value={formData?.name} required={true} />
                <Input name="codeforces" label="Codeforces Id" handleChange={handleChange} value={formData?.codeforces} required={false} />
                <Input name="leetcode" label="Leetcode Id" handleChange={handleChange} value={formData?.leetcode} required={false} />
                <Input name="codechef" label="Codechef Id" handleChange={handleChange} value={formData?.codechef} required={false} />
                <Input name="atcoder" label="Atcoder Id" handleChange={handleChange} value={formData?.atcoder} required={false} />
            </Grid>
            <LoadingButton
                className={classes.submitBtn}
                type='submit'
                loading={isLoading}
                loadingPosition="end"
                endIcon={<SendIcon />}
                variant="contained"
                sx={{marginTop: 3, backgroundColor: "#0F1B4C", border: "2px solid transparent", "&:hover": {backgroundColor: "#fff",color: "#0F1B4C",borderColor: "#0F1B4C",},}}
                >
                Update Details
            </LoadingButton>
            </CardContent>
            </Card>
        </form>
    );
};
