import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Chip from '@mui/material/Chip';
function foodCard(props) {
    const { food } = props;
    function card(food) {
        
        return (
            <Card sx={{ width: "33%" ,maxHeight :"600px"}}>
                <CardHeader
                    title={food.name}
                    subheader={food.location.address1+" "+food.location.city}
                />
                <CardMedia
                    component="img"
                    height="194"
                    image={food.image_url}
                    alt={food.name}
                />
                <CardContent sx={{ height: '180px', overflow: 'auto' }}>
                    Category: {food.categories.map((category) => <Chip label={category.title} variant="outlined" />)}
                    <Typography variant="body1" color="text.secondary"fontWeight="bold" style={{fontSize:"20px"}}>
                        Price: {food.price}
                    </Typography>
                    <Typography variant="body2" color="text.secondary"style={{fontSize:"20px"}}>
                        Contact: {food.display_phone}
                    </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'center' }}>
                    <Button variant="contained" href={food.url}>Learn More..</Button>
                </CardActions>
            </Card>
        )
    }

    return (
        <Card style={{ display: "flex", width: '80%', gap: "16px" }} sx={{ maxWidth: '80%' }}>
            {food && food.businesses.map((food) => (card(food)))}
        </Card>

    );
}
export default foodCard;