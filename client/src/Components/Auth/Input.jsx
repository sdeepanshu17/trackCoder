import { Grid, IconButton, InputAdornment, TextField } from '@material-ui/core';
import PropTypes from 'prop-types';

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const Input = ({name, handleChange, label, autoFocus, type, handleShowPassword, half, value}) => {
  return (
    <Grid xs={12} sm={half ? 6 : 12} item={true} >
        <TextField name={name} 
        onChange={handleChange} 
        variant='outlined' 
        required 
        fullWidth
        value={value}
        label={label} 
        autoFocus={autoFocus}
        type={type} 
        InputProps={name==='password' ? {endAdornment: (
            <InputAdornment position="end">
                <IconButton onClick={handleShowPassword}>
                    {type === "password" ? <Visibility /> : <VisibilityOff />}
                </IconButton>
            </InputAdornment>
        )} : null} />
    </Grid>
  )
}

Input.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  handleChange: PropTypes.func,
  handleShowPassword: PropTypes.func,
  autoFocus: PropTypes.bool,
  type: PropTypes.string,
  required: PropTypes.bool,
  half: PropTypes.bool,
  value: PropTypes.string,
};

export default Input;
