import * as React from 'react';
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
    function FoodCard(food) {
        
        return (
            <Card sx={{ flexBasis: 'calc(33% - 2 * 16px)',borderRadius:"25px" }}>
                <CardHeader
                    title={food.name}
                    subheader={food.location.address1+" "+food.location.city}
                    sx={{height: '120px',
                    '@media screen and (max-width: 600px)': {
                      height: 'auto',
                      minHeight: '50px',
                    },}}
                />
                <CardMedia
                    component="img"
                    height="194"
                    image={food.image_url}
                    alt={food.name}
                />
                <CardContent sx={{ height: '180px', overflow: 'auto' }}>
                    Category: {food.categories.map((category,index) => <Chip key={index} label={category.title} variant="outlined" />)}
                    <Typography variant="body1" color="text.secondary"fontWeight="bold" style={{fontSize:"20px"}}>
                        Price: {food.price}
                    </Typography>
                    <Typography variant="body2" color="text.secondary"style={{fontSize:"20px"}}>
                        Contact: {food.display_phone}
                    </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'center' }}>
                    <Button variant="contained" href={food.url} target="_blank">Learn More..</Button>
                </CardActions>
            </Card>
        )
    }

    return (
        <Card style={{ display: "flex",maxWidth: '80%', gap: "16px",flexWrap: "wrap", justifyContent: "center",marginBottom:"100px", boxShadow:"none", padding:"4px" }} sx={{  }}>
            {food && food.businesses.map((food,index) => <FoodCard key={index} {...food} />)}
        </Card>

    );
}
export default foodCard;