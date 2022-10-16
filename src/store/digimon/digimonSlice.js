import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    digimons: [],
    filtered: [],
    loading: false,
}

export const digimonSlice = createSlice({
    name: 'digimons',
    initialState,
    reducers: {
        loadDigimons(state, action) {

        },
        filterDigimons(state, action) {

        },
    }
});

export const { } = digimonSlice.actions

