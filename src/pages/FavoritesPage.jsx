import React, { useEffect } from "react";

import Grid from "@mui/material/Unstable_Grid2";
import DigiCard from "../components/digi-card";
import { useDispatch, useSelector } from "react-redux";
import { startLoadingFavorites, startRemovingFAvorite } from "../store/digimon";

const FavoritePage = () => {
    const { favoritos, loadingFavorites, isProcessingDelete, processingId } = useSelector(state => state.digimon);
    const { uid } = useSelector(state => state.auth)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(startLoadingFavorites(uid));
    }, []);

    const handleRemoveFavorito = (id) => {
        dispatch(startRemovingFAvorite(id));
    }



    return (
        <Grid container spacing={3}>
            {loadingFavorites && <p>Loading Favoritos...</p>}
            {!loadingFavorites && favoritos.map(({ id, name, images, releaseDate, types, levels }) => (
                <Grid xs={12} sm={6} md={4} lg={3} key={id}>
                    <DigiCard
                        id={id}
                        name={name}
                        image={images[0].href}
                        isFavorito={true}
                        type={(!types.length) ? '-' : types[0].type}
                        level={(!levels.length) ? '-' : levels[0].level}
                        releaseDate={releaseDate}
                        isProcessingDelete={isProcessingDelete && processingId === id}
                        onRemoveFavorito={() => handleRemoveFavorito(id)}
                    />
                </Grid>
            ))}
        </Grid>
    );
}

export default FavoritePage;
