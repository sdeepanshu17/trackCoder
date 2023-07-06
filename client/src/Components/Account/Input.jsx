import { Grid,  TextField } from '@material-ui/core'


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

export default Input
