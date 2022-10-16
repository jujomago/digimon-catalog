import React, { useEffect, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import DigiCard from "../components/digi-card";
import unknowns from '../data/unknowns.json'
import { Drawer } from "./style";
import Header from "../components/header";
import Sidebar from "../components/sidebar";


const localStorageKey = 'digimonData';
const apiUrl = 'https://www.digi-api.com/api/v1/digimon?pageSize=1500';


function DashboardContent() {
    const [open, setOpen] = useState(true);
    const [digimons, setDigimons] = useState([]);
    const [digimonsFiltered, setDigimonsFiltered] = useState(digimons);
    const [typeSelected, setTypeSelected] = useState(4);
    const [levelSelected, setLevelSelected] = useState(5);
    const [searchName, setSearchName] = useState(4)



    useEffect(() => {
        if (!localStorage.getItem(localStorageKey)) {
            console.log('requesting first time');
            getDigimons();
            return;
        }
        console.log('gettin from cachee')
        const cachedDigimons = JSON.parse(localStorage.getItem(localStorageKey));
        setDigimons(cachedDigimons)
    }, []);

    useEffect(() => {
        let filtered = digimons;

        if (searchName?.trim().length > 5) {
            filtered = filtered.filter(item => item.name.toLowerCase().includes(searchName.toLowerCase()))
        }

        if (typeSelected)
            filtered = filtered.filter(item => item.types[0]?.id === typeSelected)
        if (levelSelected)
            filtered = filtered.filter(item => item.levels[0]?.id === levelSelected)


        setDigimonsFiltered(filtered);
    }, [typeSelected, levelSelected, searchName, digimons])



    const getDigimons = async () => {
        const unknownsIds = unknowns.map(item => item.id)
        try {
            const response = await fetch(apiUrl);
            const { content, pageable } = await response.json();

            const knowDigmons = content.filter(item => !unknownsIds.includes(item.id))

            const digimonsData = await Promise.all(
                knowDigmons.map(async (digimon) => {
                    const respponse2 = await fetch(digimon.href);
                    const data = await respponse2.json();
                    return data;
                })
            );
            localStorage.setItem(localStorageKey, JSON.stringify(digimonsData));
            setDigimons(digimonsData);
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <Header />
            <Drawer variant="permanent" open={open}>
                <Sidebar />
            </Drawer>
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
                    <Grid container spacing={3}>
                        {!digimonsFiltered.length && <p>Loading...</p>}
                        {digimonsFiltered
                            .map(({ id, name, images, releaseDate, types, levels }) => (
                                <Grid xs={12} sm={6} md={4} lg={3} key={id}>
                                    <DigiCard
                                        name={name}
                                        image={images[0].href}
                                        type={(!types.length) ? '-' : types[0].type}
                                        level={(!levels.length) ? '-' : levels[0].level}
                                        releaseDate={releaseDate}
                                    />
                                </Grid>
                            ))}
                    </Grid>
                </Container>
            </Box>
        </Box>
    );
}

export default function Dashboard() {
    return null;
    //return <DashboardContent />;
}
