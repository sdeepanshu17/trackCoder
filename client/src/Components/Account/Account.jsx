import { Box, Container, Stack, Unstable_Grid2 as Grid } from '@mui/material';
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { AccountProfile } from './AccountProfile';
import { AccountProfileDetails } from './AccountProfileDetails';

const Account = () => {
    const user = JSON.parse(localStorage.getItem('profile'));
    const history = useNavigate();

    useEffect(() => {
        if (!user) {
            history("/");
        }
        // console.log(user);
    }, [user]);

    return (
        <Box
            component="main"
            sx={{
                flexGrow: 1,
                py: 8
            }}
        >
            <Container maxWidth="lg">
                <Stack spacing={3}>
                    {/* <div>
                        <Typography variant="h4" sx={{fontFamily :'Plus Jakarta Sans', fontWeight: '500'}}>
                            Account
                        </Typography>
                    </div> */}
                    <div>
                        <Grid
                            container
                            spacing={3}
                        >
                            <Grid
                                xs={12}
                                md={6}
                                lg={4}
                            >
                                <AccountProfile user={user} />
                            </Grid>
                            <Grid
                                xs={12}
                                md={6}
                                lg={8}
                            >
                                <AccountProfileDetails user={user} />
                            </Grid>
                        </Grid>
                    </div>
                </Stack>
            </Container>
        </Box>
    )
}

export default Account