import { Alert, Box, Container, CssBaseline, Divider, Drawer, Snackbar, Toolbar, Typography } from '@mui/material';
import React, { useContext, useState } from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom'
import Header from '../components/header';
import Sidebar from '../components/sidebar';


const drawerWidth = 240;

export const PrivateLayout = ({ children, component }) => {
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
            <Snackbar open={!setMessage} autoHideDuration={6000} >
                <Alert severity="success" sx={{ width: '100%' }}>
                    Se guardo en favoritos!
                </Alert>
            </Snackbar>
        </Box>
    );

}