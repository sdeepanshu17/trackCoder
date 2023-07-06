import { useState } from 'react'
import useStyles from "./styles";
import { Avatar, Button, Container, Grid, Paper, Typography } from '@material-ui/core';
// import LockOutlinedIcon from "@material-ui/icons/LockOpenOutlined"
import LockOutlinedIcon from "@mui/icons-material/LockOpenOutlined"
import Input from './Input';

const Auth = () => {

    const initialState = {firstName:'',lastName:'',email:'',password:'',confirmPassword:'',}

    const classes = useStyles();
    const [isSignup,setisSignup] = useState(false);
    const [showPassword,setShowPassword] = useState(false);
    const [formData,setFormData] = useState(initialState);
    // const dispatch = useDispatch(); 
    // const history = useHistory();


    const submitHandler = (e) => {
        e.preventDefault();
        // console.log(formData);
        // if (isSignup) {
        //     dispatch(signup(formData,history));
        // }
        // else{
        //     dispatch(signin(formData,history));
        // }
    }
    const handleChange = (e) => {
        setFormData({...formData,[e.target.name]: e.target.value});
    }
    const switchMode = () => {
        setisSignup(!isSignup);
        setShowPassword(false);
    }
    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    return (
    <Container component="main" maxWidth="xs" >
        <Paper className={classes.paper} elevation={3}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography variant="h5">{isSignup ? "Sign Up" : "Sign In"}</Typography>
            <form className={classes.form} onSubmit={submitHandler}>
                <Grid container spacing={2}>
                    {isSignup && (
                        <>
                            <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                            <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                        </>
                    )}
                    <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                    <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                    {isSignup && <Input name="confirmPassword" label="Confirm Password" handleChange={handleChange} type="password" />}
                </Grid>
                <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                    {isSignup ? "Sign Up" : "Sign In"}
                </Button>
                <Grid container justifyContent="flex-end">
                    <Grid item>
                        <Button onClick={switchMode}>
                        {isSignup ? "Have an account? Sign In." : "Don't have an account? Sign Up."}
                        </Button>
                    </Grid>
                </Grid>
            </form>

        </Paper>
    </Container>
  )
}

export default Auth;