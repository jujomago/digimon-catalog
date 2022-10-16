import React, { useMemo, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../hooks/useForm';
import { startRegisterWithEmailPassword } from '../store/auth';
import { Alert } from '@mui/material';

const formValidations = {
    email: [(value) => value.includes('@'), 'El correo debe de tener una @'],
    password: [(value) => value.length >= 6, 'El password debe de tener más de 6 letras.'],
    firstName: [(value) => value.length >= 1, 'El nombre es obligatorio.'],
    lastName: [(value) => value.length >= 1, 'El apellido es obligatorio.'],
}
const formData = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
}

export default function RegisterPage() {

    const dispatch = useDispatch();
    const [formSubmitted, setFormSubmitted] = useState(false);

    const { status, errorMessage } = useSelector(state => state.auth);
    const isAuthenticating = useMemo(() => status == 'checking', [status])

    const {
        formState, firstName, lastName, email, password, onInputChange,
        isFormValid, firstNameValid, lastNameValid, emailValid, passwordValid,
    } = useForm(formData, formValidations);


    console.log(firstNameValid);
    console.log('formsubmitted:', formSubmitted)

    const onSubmit = (event) => {
        event.preventDefault();
        setFormSubmitted(true);

        if (!isFormValid) return;

        dispatch(startRegisterWithEmailPassword(formState));
    }




    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Registrase
                </Typography>
                <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="given-name"
                                name="firstName"
                                value={firstName}
                                error={!!firstNameValid && formSubmitted}
                                helperText={formSubmitted && firstNameValid}
                                onChange={onInputChange}
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="lastName"
                                value={lastName}
                                error={!!lastNameValid && formSubmitted}
                                helperText={formSubmitted && lastNameValid}
                                onChange={onInputChange}
                                label="Last Name"
                                name="lastName"
                                autoComplete="family-name"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                value={email}
                                error={!!emailValid && formSubmitted}
                                helperText={formSubmitted && emailValid}
                                onChange={onInputChange}
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                onChange={onInputChange}
                                value={password}
                                error={!!passwordValid && formSubmitted}
                                helperText={formSubmitted && passwordValid}
                                id="password"
                                autoComplete="new-password"
                            />
                        </Grid>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        display={!!errorMessage ? '' : 'none'}
                    >
                        <Alert severity='error'>{errorMessage}</Alert>
                    </Grid>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={isAuthenticating}
                    >
                        Registrarse
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link href="/login" variant="body2">
                                Ya tienes una cuenta? Haz login
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}