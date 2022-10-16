import React, { useState } from "react";
import { AppBar, IconButton, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { AccountCircle } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { startLogout } from "../store/auth";

const Header = ({ email, cerrar }) => {

    const [anchorEl, setAnchorEl] = useState(null);

    const dispatch = useDispatch();

    const { displayName } = useSelector(state => state.auth);

    const onLogout = () => {
        dispatch(startLogout());
    }

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };


    return (

        <AppBar position="static">
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Digimon Catalog
                </Typography>
                <Typography>Hola, {displayName}</Typography>
                <div>

                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit"
                    >
                        <AccountCircle />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorEl)}
                        onClose={() => setAnchorEl(null)}
                    >
                        <MenuItem onClick={onLogout}>Log out</MenuItem>
                    </Menu>
                </div>
            </Toolbar>
        </AppBar>

    );
};

export default Header;
