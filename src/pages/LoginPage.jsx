
import React, { useMemo } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Google, LockOutlined } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../hooks/useForm';
import { Alert } from '@mui/material';
import { startGoogleSignIn, startLoginWithEmailPassword } from '../store/auth';



export default function LoginPage() {

    const dispatch = useDispatch();
    const { status, errorMessage } = useSelector(state => state.auth);
    const isAuthenticating = useMemo(() => status === 'checking', [status])

    const { email, password, onInputChange } = useForm({
        email: '',
        password: ''
    });

    const onSubmit = (event) => {
        event.preventDefault();
        dispatch(startLoginWithEmailPassword({ email, password }));
    }

    const onGoogleSignIn = () => {
        dispatch(startGoogleSignIn());
    }

    return (

        <Grid container component="main" sx={{ height: '100vh' }}>
            <CssBaseline />
            <Grid
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                    backgroundImage: 'url(https://source.unsplash.com/random/?anime)',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: (t) =>
                        t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <Box
                    sx={{
                        my: 8,
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlined />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Login
                    </Typography>
                    <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            value={email}
                            onChange={onInputChange}
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            value={password}
                            onChange={onInputChange}
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <Grid
                            container
                            display={!!errorMessage ? '' : 'none'}
                            sx={{ mt: 1 }}>
                            <Grid
                                item
                                xs={12}
                            >
                                <Alert severity='error'>{errorMessage}</Alert>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
                            <Grid item xs={12} sm={6}>
                                <Button
                                    disabled={isAuthenticating}
                                    type="submit"
                                    variant='contained'
                                    fullWidth>
                                    Login
                                </Button>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Button
                                    disabled={isAuthenticating}
                                    variant='contained'
                                    fullWidth
                                    onClick={onGoogleSignIn}>
                                    <Google />
                                    <Typography sx={{ ml: 1 }}>Google</Typography>
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item>
                                <Link href="/register" variant="body2">
                                    {"No tienes una cuenta? Creala ahora"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Grid>
        </Grid>

    );
}