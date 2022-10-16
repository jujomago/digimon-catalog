import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth";
import { digimonSlice } from "./digimon";

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        digimon: digimonSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }),
});