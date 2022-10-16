import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    all: [],
    filtered: [],
    favoritos: [],
    isFiltering: false,
    loading: false,
    loadingFavorites: false,
    isAddingFavorite: false,
    setMessage: null,
}

export const digimonSlice = createSlice({
    name: 'digimons',
    initialState,
    reducers: {
        setLoading(state, action) {
            console.log('load Digimons:');
            console.log(action);
            state.loading = action.payload
        },
        setData(state, action) {
            state.isFiltering = false
            state.all = action.payload
        },
        setLoadingFavorite(state, action) {
            state.isAddingFavorite = action.payload;
        },
        setIsFiltering(state, action) {
            state.isFiltering = action.payload
        },
        searchName(state, { payload }) {
            state.isFiltering = true
            state.filtered = state.all.filter(item => item.name.toLowerCase().includes(payload.toLowerCase()))
        },
        searchByType(state, { payload }) {
            state.isFiltering = true
            state.filtered = state.all.filter(item => item.types[0]?.id === payload)
        },
        searchByLevel(state, { payload }) {
            state.isFiltering = true
            state.filtered = state.all.filter(item => item.levels[0]?.id === payload)
        },
        setSuccesMessage(state, action) {
            state.setMessage = 'ok'
        },
        setErrorMessage(state, action) {
            state.setMessage = null
        },
        setLoadingFavorites(state, action) {
            state.loadingFavorites = action.payload
        },
        setFavorites(state, action) {
            state.favoritos = state.all.filter(item => action.payload.includes(item.id))
        }
    }
});

export const { setLoading,
    setData, searchName, setErrorMessage,
    setSuccesMessage, setLoadingFavorite,
    setLoadingFavorites,
    setFavorites,
    searchByType, searchByLevel } = digimonSlice.actions

