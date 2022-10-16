import { Box, Container, CssBaseline, Drawer, Toolbar } from '@mui/material';
import React, { useContext, useState } from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom'
import Header from '../components/header';
import Sidebar from '../components/sidebar';



export const PrivateLayout = ({ children, component }) => {
    const { status } = useSelector(state => state.auth)
    const [open, setOpen] = useState(true);
    const [digimons, setDigimons] = useState([]);
    const [digimonsFiltered, setDigimonsFiltered] = useState(digimons);
    const [typeSelected, setTypeSelected] = useState();
    const [levelSelected, setLevelSelected] = useState(5);
    const [searchName, setSearchName] = useState()

    const handleTypeChange = (event) => {
        setTypeSelected(event.target.value);
    };

    const handleLevelChange = (event) => {
        setLevelSelected(event.target.value);
    };

    const handleNameChange = (event) => {
        setSearchName(event.target.value);
    };

    const toggleDrawer = () => {
        setOpen(!open);
    };


    const content = component ?? children;

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <Header

            />

            <Box
                component="main"
                sx={{
                    backgroundColor: (theme) =>
                        theme.palette.mode === "light"
                            ? theme.palette.grey[100]
                            : theme.palette.grey[900],
                    flexGrow: 1,
                    height: "100vh",
                    overflow: "auto",
                }}
            >
                <Toolbar />
                <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
                    {status === 'authenticated' ? content : <Navigate to="/" />}
                </Container>
            </Box>
        </Box>
    );

}