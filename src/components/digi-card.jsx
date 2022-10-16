import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import { Button, CircularProgress } from '@mui/material';
import { DeleteForever } from '@mui/icons-material';
import { Box } from '@mui/system';




const DigiCard = ({ id, name, image, level, type, isFavorito, onAddFavorito, onRemoveFavorito, isProcessingDelete, isProcessingAdd }) => {
    return (
        <Card sx={{ maxWidth: 345 }} raised>
            <CardMedia
                component="img"
                height="194"
                image={image}
                alt={name}
                loading="lazy"
            />
            <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                    {name}
                </Typography>
                <Box display={'flex'} gap={4}>
                    <Typography variant='strong' color="primary">
                        Type:{type}
                    </Typography>
                    <Typography color="secondary">
                        Level:{level}
                    </Typography>
                </Box>
            </CardContent>
            <CardActions disableSpacing>
                {isFavorito && <Button endIcon={isProcessingDelete ? <CircularProgress /> : <DeleteForever />} variant="contained" color="error" onClick={onRemoveFavorito} disabled={isProcessingDelete}>Remover de Favoritos</Button>}
                {!isFavorito && <Button endIcon={isProcessingAdd ? <CircularProgress /> : <FavoriteIcon />} variant="contained" color="success" onClick={onAddFavorito} disabled={isProcessingAdd}>Agregar a Favoritos</Button>}
            </CardActions>
        </Card>
    );
}

export default React.memo(DigiCard)
