import { Grid,  TextField } from '@material-ui/core'
import PropTypes from 'prop-types';

const Input = ({name, handleChange, label, autoFocus, type, required, half, value}) => {
  return (
    <Grid xs={12} sm={half ? 6 : 12} item={true} >
        <TextField name={name} 
        onChange={handleChange} 
        variant='outlined' 
        required={required}
        fullWidth
        value={value}
        label={label} 
        autoFocus={autoFocus}
        type={type} 
        />
    </Grid>
  )
}

Input.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  handleChange: PropTypes.func,
  autoFocus: PropTypes.bool,
  type: PropTypes.string,
  required: PropTypes.bool,
  half: PropTypes.bool,
  value: PropTypes.string,
};

export default Input;
