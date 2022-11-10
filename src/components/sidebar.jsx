import { DashboardSharp, Favorite } from '@mui/icons-material'
import { Divider, FormControl, InputLabel, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader, MenuItem, Select, TextField } from '@mui/material'
import React, { useEffect } from 'react'
import types from '../data/types.json'
import levels from '../data/levels.json'
import { useDispatch } from 'react-redux'
import { searchByLevel, searchByType, searchName, setIsFiltering } from '../store/digimon'
import { useForm } from '../hooks/useForm'
import { useNavigate } from 'react-router-dom'

const Sidebar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { filterName, filterType, filterLevel, onInputChange } = useForm({
        filterName: '',
        filterType: '',
        filterLevel: ''
    });

    useEffect(() => {
        console.log('filterType:', filterType);
        console.log('filterLevel:', filterLevel);
        console.log('filterName:', filterName);

        if (filterName?.trim().length > 5) {
            dispatch(searchName(filterName))
        }
        if (filterType)
            dispatch(searchByType(filterType))

        if (filterLevel)
            dispatch(searchByLevel(filterLevel))

        if (!filterType && !filterLevel && !filterName) {
            dispatch(setIsFiltering(false))
        }


    }, [filterName, filterType, filterLevel])

    return (
        <>
            <ListSubheader component="div" >
                Search a Name
            </ListSubheader>
            <ListItem>
                <TextField id="standard-basic" variant="standard" name="filterName" fullWidth onChange={onInputChange} value={filterName} />
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
                        name='filterType'
                        value={filterType}
                        label="Type"
                        onChange={onInputChange}
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
                        name='filterLevel'
                        value={filterLevel}
                        label="Level"
                        onChange={onInputChange}                    >
                        <MenuItem value="">
                            <em>Ninguno</em>
                        </MenuItem>
                        {levels.sort((a, b) => a.name.localeCompare(b.name)).map((item) => <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>)}
                    </Select>
                </FormControl>
            </ListItem>
            <Divider />
            <List component="nav">
                <ListItemButton onClick={() => navigate('/dashboard')}>
                    <ListItemIcon>
                        <DashboardSharp />
                    </ListItemIcon>
                    <ListItemText primary="Catalog" on />
                </ListItemButton>
                <ListItemButton onClick={() => navigate('/favoritos')}>
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