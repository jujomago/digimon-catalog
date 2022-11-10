import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@mui/material/Unstable_Grid2";
import DigiCard from "../components/digi-card";
import { startAddingFavorite, startLoadingDigimons, startRemovingFAvorite } from "../store/digimon";



const Dashboard = () => {
    const { all, filtered, loading, isFiltering, isProcessingDelete, isProcessingAdd, processingId } = useSelector(state => state.digimon);
    const { uid } = useSelector(state => state.auth)
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(startLoadingDigimons(uid));
    }, []);

    const handleAddFavorito = (id, name) => {
        dispatch(startAddingFavorite(id, name, uid));
    }
    const handleRemoveFavorito = (id) => {
        dispatch(startRemovingFAvorite(id));
    }

    const datos = isFiltering ? filtered : all;
    return (
        <Grid container spacing={3}>
            {loading && <p>Loading Catalog...</p>}
            {!loading && datos.map(({ id, name, isFavorite, images, releaseDate, types, levels }) => (
                !isFavorite && <Grid xs={12} sm={6} md={4} lg={3} key={id}>
                    <DigiCard
                        id={id}
                        name={name}
                        image={images[0].href}
                        isFavorito={isFavorite}
                        type={(!types.length) ? '-' : types[0].type}
                        level={(!levels.length) ? '-' : levels[0].level}
                        releaseDate={releaseDate}
                        onAddFavorito={() => handleAddFavorito(id, name)}
                        isProcessingDelete={isProcessingDelete && processingId === id}
                        isProcessingAdd={isProcessingAdd && processingId === id}
                        onRemoveFavorito={() => handleRemoveFavorito(id)}
                    />
                </Grid>
            ))}
        </Grid>
    );
}

export default Dashboard;
