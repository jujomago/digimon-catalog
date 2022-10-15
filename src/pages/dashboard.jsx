import React, { useState } from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
//import Grid from '@mui/material/Grid';
import Grid from "@mui/material/Unstable_Grid2";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import { DashboardSharp, Favorite } from "@mui/icons-material";
import DigiCard from "../components/digi-card";
import { Chip, FormControl, InputLabel, ListItem, ListSubheader, MenuItem, Select } from "@mui/material";
import types from '../data/types.json'
import levels from '../data/levels.json'
import unknowns from '../data/unknowns.json'


const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    "& .MuiDrawer-paper": {
        position: "relative",
        whiteSpace: "nowrap",
        width: drawerWidth,
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        boxSizing: "border-box",
        ...(!open && {
            overflowX: "hidden",
            transition: theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            width: theme.spacing(7),
            [theme.breakpoints.up("sm")]: {
                width: theme.spacing(9),
            },
        }),
    },
}));

function DashboardContent() {
    const [open, setOpen] = useState(true);
    const [digimons, setDigimons] = useState([]);
    //const [types, setTypes] = useState([]);

    const toggleDrawer = () => {
        setOpen(!open);
    };

    React.useEffect(() => {
        getDigimons();
        //  getTypes()
    }, []);

    /*const getTypes = async () => {
        const types = [];
        let nextPage;
        let curPage = 0;
        try {
            do {
                const response = await fetch(
                    `https://digimon-api.com/api/v1/level?page=${curPage}`
                );
                const { pageable, content } = await response.json();
                nextPage = pageable.nextPage;
                curPage++;
                types.push(...content.fields)
            } while (nextPage !== '')
            setTypes(types);
        } catch (e) {
            console.log(e);
        }
    }*/
    const getDigimons = async () => {
        const unknownsIds = unknowns.map(item => item.id)
        try {
            const response = await fetch(
                "https://www.digi-api.com/api/v1/digimon?pageSize=1500"
            );
            const { content, pageable } = await response.json();

            const knowDigmons = content.filter(item => !unknownsIds.includes(item.id))

            const digimonsData = await Promise.all(
                knowDigmons.map(async (digimon) => {
                    const respponse2 = await fetch(digimon.href);
                    const data = await respponse2.json();
                    return data;
                })
            );
            setDigimons(digimonsData);
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBar position="absolute" open={open}>
                <Toolbar
                    sx={{
                        pr: "24px", // keep right padding when drawer closed
                    }}
                >
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={toggleDrawer}
                        sx={{
                            marginRight: "36px",
                            ...(open && { display: "none" }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        component="h1"
                        variant="h6"
                        color="inherit"
                        noWrap
                        sx={{ flexGrow: 1 }}
                    >
                        Digimon Catalog
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <Toolbar
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-end",
                        px: [1],
                    }}
                >
                    <IconButton onClick={toggleDrawer}>
                        <ChevronLeftIcon />
                    </IconButton>
                </Toolbar>
                <Divider />
                <List component="nav">
                    <ListItemButton>
                        <ListItemIcon>
                            <DashboardSharp />
                        </ListItemIcon>
                        <ListItemText primary="Catalog" />
                    </ListItemButton>
                    <ListItemButton>
                        <ListItemIcon>
                            <Favorite />
                        </ListItemIcon>
                        <ListItemText primary="Favorites" />
                    </ListItemButton>
                </List>
                <Divider />
                <ListSubheader component="div" inset>
                    Types
                </ListSubheader>
                <ListItem>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Type</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            //   value={age}
                            label="Age"
                        // onChange={handleChange}
                        >
                            {types.sort((a, b) => a.name.localeCompare(b.name)).map((item) => <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>)}
                        </Select>
                    </FormControl>
                </ListItem>
                <Divider />
                <ListSubheader component="div" inset>
                    Levels
                </ListSubheader>
                <ListItem>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Levels</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            //   value={age}
                            label="Age"
                        // onChange={handleChange}
                        >
                            {levels.sort((a, b) => a.name.localeCompare(b.name)).map((item) => <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>)}
                        </Select>
                    </FormControl>
                </ListItem>
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
                    <Grid container spacing={2}>
                        {!digimons.length && <p>Loading...</p>}
                        {digimons.map(({ id, name, images, releaseDate, types, levels }) => (
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
    return <DashboardContent />;
}
