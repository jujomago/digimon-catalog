import { DashboardSharp, Favorite } from '@mui/icons-material'
import { Divider, FormControl, InputLabel, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader, MenuItem, Select, TextField } from '@mui/material'
import React from 'react'
import types from '../data/types.json'
import levels from '../data/levels.json'

const Sidebar = ({ handleLevelChange, handleNameChange, handleTypeChange, typeSelected, levelSelected, searchName }) => {
    return (
        <>
            <ListSubheader component="div" >
                Search a Name
            </ListSubheader>
            <ListItem>
                <TextField id="standard-basic" variant="standard" fullWidth onChange={handleNameChange} value={searchName} />
            </ListItem>
            <ListSubheader component="div">
                Filters
            </ListSubheader>
            <ListItem>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Type</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={typeSelected}
                        label="Type"
                        onChange={handleTypeChange}
                    >
                        <MenuItem value="">
                            <em>Ninguno</em>
                        </MenuItem>
                        {types.sort((a, b) => a.name.localeCompare(b.name)).map((item) => <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>)}
                    </Select>
                </FormControl>
            </ListItem>
            <ListItem>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Levels</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={levelSelected}
                        label="Level"
                        onChange={handleLevelChange}
                    >
                        <MenuItem value="">
                            <em>Ninguno</em>
                        </MenuItem>
                        {levels.sort((a, b) => a.name.localeCompare(b.name)).map((item) => <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>)}
                    </Select>
                </FormControl>
            </ListItem>
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
        </>
    )
}

export default Sidebar