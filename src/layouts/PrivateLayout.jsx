import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom'
import { Alert, AlertTitle, Box, Container, CssBaseline, Divider, Drawer, Snackbar, Toolbar } from '@mui/material';
import Header from '../components/header';
import Sidebar from '../components/sidebar';
import { setSuccesMessage } from '../store/digimon';


const drawerWidth = 240;

export const PrivateLayout = ({ children, component }) => {
    const dispatch = useDispatch();
    const { status } = useSelector(state => state.auth)
    const { setMessage } = useSelector(state => state.digimon)
    const content = component ?? children;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Header drawerWidth={drawerWidth} />
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="permanent"
                anchor="left"
            >
                <Toolbar />
                <Divider />
                <Sidebar />
            </Drawer>
            <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
                <Toolbar />
                {status === 'authenticated' ? content : <Navigate to="/" />}
            </Container>

            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                open={setMessage}
                autoHideDuration={6000}
                onClose={() => dispatch(setSuccesMessage(null))} >
                <Alert severity="success" sx={{ width: '100%' }} variant='filled'>
                    <AlertTitle>Exitoso</AlertTitle>
                    {setMessage}
                </Alert>
            </Snackbar>
        </Box>
    );

}