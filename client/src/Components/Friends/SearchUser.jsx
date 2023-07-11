import PropTypes from 'prop-types';
import { Card, CardContent, IconButton, InputAdornment, TextField, Typography, makeStyles } from '@material-ui/core';
import { Stack } from "@mui/material"
import { useState } from 'react';
import axios from 'axios';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from "react-router-dom";

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
        fontWeight: '400',
        textAlign: 'center',
        textDecoration: 'none',
        color: 'black',
        '&:hover': {
            textDecoration: 'underline',
        },
    }
}))

export const SearchUser = (props) => {
    const { sx, style } = props;
    const classes = useStyles();

    const [searchQuery, setSearchQuery] = useState('');
    const [users, setUsers] = useState([]);

    const handleChange = async (e) => {
        setSearchQuery(e.target.value);

        const res = await axios.get(`http://localhost:5001/users/search?user=${searchQuery}`);
        if (searchQuery=='') {
            setUsers([])
        }
        else setUsers(res.data);
    };
    const handleSearch = async (e) => {
        e.preventDefault();
        // Call the API endpoint with the search query
        const res = await axios.get(`http://localhost:5001/users/search?user=${searchQuery}`);
        console.log(res);
        //   onSearch(response.data);
        setUsers(res.data);
    };

    return (
        <Card elevation={4} className={classes.mainCard} sx={sx} style={style} >
            <CardContent>
                <Stack>
                    <Typography className={classes.title} variant="h5" >
                        Search User
                    </Typography>
                    <form style={{display: 'flex', justifyContent: 'center', marginBottom: 15}} onSubmit={handleSearch}>
                        {/* <Input type='text' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder='Search Users' /> */}
                        <TextField
                            value={searchQuery}
                            onChange={handleChange}
                            placeholder='Search Users'
                            style={{width: "75%"}}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton type='submit'>
                                            <SearchIcon />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </form>
                    {users.length > 0 ? users.map((user, index) => {
                        const url = `/users/${user.username}`;
                        return  (
                        <Typography component={Link} to={url} key={index} className={classes.details} variant="h6">
                            {user.username}
                        </Typography>
                    )})
                        :
                        <Typography className={classes.comingSoon} variant="h6">
                            No users found
                        </Typography>
                    }
                </Stack>
            </CardContent>
        </Card>
    );
};

SearchUser.propTypes = {
    sx: PropTypes.object,
    style: PropTypes.object,
};
