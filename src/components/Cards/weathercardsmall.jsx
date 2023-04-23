import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ConvertTemperature from '../Temperature/ConvertTemperature.jsx';
function WeatherCardSmall(props) {
    const { weather, picture, unit} = props;

    function SmallCard({weather, dailyWeather, picture, unit, index}){
        return(
            <Card sx={{ width:'20%'}}>
            <CardHeader
                title={weather.city.name+" ("+weather.city.country+")"}
                subheader={<Typography sx={{fontSize:"20px"}}> {(new Date(dailyWeather.dt * 1000)).toLocaleDateString()}</Typography>}
            />
            <CardMedia
                sx={{
                    
                  }}
                component="img"
                height="194"
                image={picture.photos[index].src.landscape}
                alt={weather.city.name}
            />
            <CardContent >
                <Typography variant="body1" color="text.secondary" fontWeight="bold" style={{fontSize:"20px"}}>
                <img src={"http://openweathermap.org/img/wn/"+dailyWeather.weather[0].icon+".png"} alt="weather icon"/>
                </Typography>
                <Typography variant="body1" color="text.secondary" fontWeight="bold" style={{fontSize:"20px"}}>
                    Weather: {dailyWeather.weather[0].main}
                </Typography>
                <ConvertTemperature unit={unit} temp = {dailyWeather.temp.day} header="Day"/>
                <ConvertTemperature unit={unit} temp = {dailyWeather.temp.night} header="Night"/>
                <ConvertTemperature unit={unit} temp = {dailyWeather.temp.max} header="Max"/>
                <ConvertTemperature unit={unit} temp = {dailyWeather.temp.min} header="Min"/>
                <Typography variant="body1" color="text.secondary">
                    Sunrise: {(new Date(dailyWeather.sunrise * 1000)).getHours()<10?"0"+(new Date(dailyWeather.sunrise * 1000)).getHours():(new Date(dailyWeather.sunrise * 1000)).getHours()}:{(new Date(dailyWeather.sunrise * 1000)).getMinutes()<10?"0"+(new Date(dailyWeather.sunrise * 1000)).getMinutes():(new Date(dailyWeather.sunrise * 1000)).getMinutes()}
                </Typography>
                <Typography variant="body1" color="text.secondary" >
                    Sunset: {(new Date(dailyWeather.sunset * 1000)).getHours()<10?"0"+(new Date(dailyWeather.sunset * 1000)).getHours():(new Date(dailyWeather.sunset * 1000)).getHours()}:{(new Date(dailyWeather.sunset * 1000)).getMinutes()<10?"0"+(new Date(dailyWeather.sunset * 1000)).getMinutes():(new Date(dailyWeather.sunset * 1000)).getMinutes()}
                </Typography>
                <Typography variant="body1" color="text.secondary" >
                    Wind: {dailyWeather.speed} m/s, {dailyWeather.deg}°
                </Typography>
                
                <Typography variant="body1" color="text.secondary" >
                    Humidity: {dailyWeather.humidity}%
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Pressure: {dailyWeather.pressure} hPa
                </Typography>
            </CardContent>
        </Card>
        )
    }
    return (
        <Card sx={{ display: "flex", width: '80%', gap: "16px",maxWidth: '80%' }}>
            {weather&&weather.list.map((dailyWeather, index) => <SmallCard 
            key={index}
            index={index}
            weather={weather}
            dailyWeather={dailyWeather}
            picture={picture}
            unit={unit}
            />)}
        </Card>

    );
}
export default WeatherCardSmall;

