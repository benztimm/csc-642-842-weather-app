import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ConvertTemperature from '../Temperature/ConvertTemperature.jsx';
import ScrollAnimation from "../pages/scrollanimation";
import weatherBackground from "../statics/weatherBackground.json"
function WeatherCardHourly(props) {
    const { weather, picture, unit } = props;

    function SmallCardHourly({ weather, dailyWeather, picture, unit, index }) {
        return (

            <Card sx={{
                flexBasis: 'calc(25% - 2 * 16px)',
                background: "#1976d2",
                borderRadius: "25px",
                backgroundImage: `url(${weatherBackground[dailyWeather.weather[0].main]})`,//`url(${picture.photos[index].src.portrait})`
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                overflow: 'auto',

            }}>
                <ScrollAnimation>
                    <CardHeader
                        title={(new Date(dailyWeather.dt * 1000)).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                        }) + ' ' + (new Date(dailyWeather.dt * 1000)).toLocaleTimeString('en-US', {
                            hour: '2-digit',
                            minute: '2-digit',
                        })}
                        subheader={weather.city.name + ', ' + weather.city.country}
                        titleTypographyProps={{
                            style: {
                                backgroundColor: 'white',
                                display: 'inline',
                                padding: '2px 4px',
                                borderRadius: 'px',
                                borderTopLeftRadius: '4px',
                                borderTopRightRadius: '4px',
                            },
                        }}
                        subheaderTypographyProps={{
                            style: {
                                backgroundColor: 'white',
                                display: '',
                                padding: '2px 4px',
                                borderRadius: 'px',
                                borderBottomLeftRadius: '4px',
                                borderBottomRightRadius: '4px',
                            },
                        }}
                    />
                    <CardContent sx={{}}>

                        <Typography variant="body1" color="text.secondary" fontWeight="bold" style={{ fontSize: "20px" }}>
                            <img style={{
                                background: "grey",
                                borderRadius: "25px",
                                width: '50%',
                                height: '50%',
                            }} src={"http://openweathermap.org/img/wn/" + dailyWeather.weather[0].icon + "@2x.png"} alt="weather icon" />
                        </Typography>

                        <div style={{ textAlign: "left", background: "white", padding: "20px", borderRadius: "20px" }}>
                            <Typography variant="body1" color="text.secondary" style={{ fontSize: "20px" }}>
                                <strong>Weather: </strong>{dailyWeather.weather[0].main}
                            </Typography>

                            <Typography variant="body1" color="text.secondary" style={{ fontSize: "20px" }}>
                                <strong>Condition: </strong>{dailyWeather.weather[0].description}
                            </Typography>

                            <Typography variant="body1" color="text.secondary" style={{ fontSize: "20px" }}>
                                <ConvertTemperature unit={unit} temp={dailyWeather.main.temp} header="Temperature" />
                            </Typography>

                            <ConvertTemperature unit={unit} temp={dailyWeather.main.feels_like} header="Feel Like" />

                            <div style={{ display: "flex", gap: "16px" }}>
                                <ConvertTemperature unit={unit} temp={dailyWeather.main.temp_max} header="Max" />
                                <ConvertTemperature unit={unit} temp={dailyWeather.main.temp_min} header="Min" />
                            </div>

                            <Typography variant="body1" color="text.secondary" style={{ fontSize: "20px" }}>
                                <strong>Wind:</strong> {dailyWeather.wind.speed} m/s, {dailyWeather.wind.deg}°
                            </Typography>

                            <div style={{ display: "flex", gap: "16px" }}>
                                <Typography variant="body1" color="text.secondary" style={{ fontSize: "17px" }}>
                                    <strong>Humidity: </strong>{dailyWeather.main.humidity}%
                                </Typography>
                                <Typography variant="body1" color="text.secondary" style={{ fontSize: "17px" }}>
                                    <strong>Pressure: </strong>{dailyWeather.main.pressure} hPa
                                </Typography>
                            </div>
                        </div>
                    </CardContent>
                </ScrollAnimation>
            </Card>

        )
    }
    return (
        <Card sx={{ display: "flex", flexWrap: "wrap", gap: "16px", justifyContent: "center", marginBottom: "100px", maxWidth: "90%", boxShadow:"none", padding:"4px" }}>
            {weather && weather.list.map((dailyWeather, index) => <SmallCardHourly
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
export default WeatherCardHourly;

