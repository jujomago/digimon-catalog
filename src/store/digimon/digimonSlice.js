import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    all: [],
    filtered: [],
    favoritos: [],
    isFiltering: false,
    loading: false,
    loadingFavorites: false,
    isProcessingAdd: false,
    isProcessingDelete: false,
    setMessage: null,
    processingId: null,
}

export const digimonSlice = createSlice({
    name: 'digimons',
    initialState,
    reducers: {
        setLoading(state, action) {
            state.loading = action.payload
        },
        setData(state, action) {
            state.isFiltering = false
            state.loading = false
            state.all = action.payload
        },
        setIsProcessingAdd(state, action) {
            state.processingId = action.payload.id
            state.isProcessingAdd = action.payload.value;
            if (!action.payload.value) {
                const index = state.all.findIndex(item => item.id === action.payload.id)

                state.all[index].isFavorite = true
            }
        },
        setIsProcessingDelete(state, action) {
            state.processingId = action.payload.id
            state.isProcessingDelete = action.payload.value;
            if (!action.payload.value) {
                const index = state.all.findIndex(item => item.id === action.payload.id)
                state.all[index].isFavorite = false
            }
        },
        setIsFiltering(state, action) {
            state.isFiltering = action.payload
        },
        searchName(state, { payload }) {
            state.isFiltering = true
            const data = (state.filtered.length) ? state.filtered : state.all;
            state.filtered = data.filter(item => item.name.toLowerCase().includes(payload.toLowerCase()))
        },
        searchByType(state, { payload }) {
            state.isFiltering = true

            const data = (state.filtered.length) ? state.filtered : state.all;
            state.filtered = data.filter(item => item.types[0]?.id === payload)
        },
        searchByLevel(state, { payload }) {
            state.isFiltering = true
            const data = (state.filtered.length) ? state.filtered : state.all;
            state.filtered = data.filter(item => item.levels[0]?.id === payload)
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
            state.loadingFavorites = false;
        }
    }
});

export const { setLoading,
    setData, searchName, setErrorMessage,
    setSuccesMessage, setIsProcessingAdd, setIsProcessingDelete,
    setLoadingFavorites,
    setFavorites,
    setIsFiltering,
    searchByType, searchByLevel } = digimonSlice.actions

