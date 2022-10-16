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
import { Button } from '@mui/material';




const DigiCard = ({ name, image, level, type, releaseDate }) => {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                component="img"
                height="194"
                image={image}
                alt={name}
                loading="lazy"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Type : {type}
                    <br />
                    Level : {level}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <Button endIcon={<FavoriteIcon />} variant="contained" color="secondary">Agregar a Favoritos</Button>
            </CardActions>
        </Card>
    );
}

export default React.memo(DigiCard)
