import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ConvertTemperature from '../Temperature/ConvertTemperature.jsx';
function weatherCard(props) {
    const { weather, picture, unit} = props;

    return (

        <Card sx={{ maxWidth: 800}}>
            <CardHeader
                title={weather.name}
                subheader={(new Date(weather.dt * 1000)).toLocaleDateString()}
            />
            <CardMedia
                sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                component="img"
                height="194"
                image={picture.photos[0].src.landscape}
                alt="image of city"
            />
            <CardContent >
            <Typography variant="body1" color="text.secondary" fontWeight="bold" style={{fontSize:"20px"}}>
                <img src={"http://openweathermap.org/img/wn/"+weather.weather[0].icon+".png"} alt="weather icon"/>
                </Typography>
                <Typography variant="body1" color="text.secondary" fontWeight="bold" style={{fontSize:"20px"}}>
                    Weather: {weather.weather[0].main}
                </Typography>
                <ConvertTemperature unit={unit} temp = {weather.main.temp} header ="Temperature"/>
                <Typography variant="body1" color="text.secondary" style={{fontSize:"20px"}} fontWeight="bold">
                    Wind: {weather.wind.speed} m/s, {weather.wind.deg}°
                </Typography>
                <Typography variant="body1" color="text.secondary" fontWeight="bold" style={{fontSize:"20px"}}>
                    Humidity: {weather.main.humidity}%
                </Typography>
                <Typography variant="body1" color="text.secondary" fontWeight="bold" style={{fontSize:"20px"}}>
                    Pressure: {weather.main.pressure} hPa
                </Typography>
            </CardContent>

        </Card>

    );
}
export default weatherCard;