import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ConvertTemperature from '../Temperature/ConvertTemperature.jsx';
import ScrollAnimation from "../pages/scrollanimation.jsx";

function WeatherCardDaily(props) {
    const { weather, picture, unit } = props;

    function SmallCardDaily({ weather, dailyWeather, picture, unit, index }) {
        return (
            <Card sx={{
                flexBasis: 'calc(25% - 2 * 16px)',
                background: "#1976d2",
                borderRadius: "25px",
                backgroundImage: `url(${picture.photos[index].src.portrait})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',

            }}>
                <ScrollAnimation>
                    <CardHeader
                        title={(new Date(dailyWeather.dt * 1000)).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                        })}
                        titleTypographyProps={{
                            style: {
                                backgroundColor: 'white',
                                display: 'inline',
                                padding: '2px 4px',
                                borderRadius: '4px',
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

                            <div style={{ display: "flex", gap: "16px" }}>
                                <ConvertTemperature unit={unit} temp={dailyWeather.temp.day} header="Day" />
                                <ConvertTemperature unit={unit} temp={dailyWeather.temp.night} header="Night" />
                            </div>

                            <div style={{ display: "flex", gap: "16px" }}>
                                <ConvertTemperature unit={unit} temp={dailyWeather.temp.max} header="Max" />
                                <ConvertTemperature unit={unit} temp={dailyWeather.temp.min} header="Min" />
                            </div>

                            <div style={{ display: "flex", gap: "16px" }}>
                                <Typography variant="body1" color="text.secondary" style={{ fontSize: "20px" }}>
                                    <strong>Sunrise: </strong>{(new Date(dailyWeather.sunrise * 1000)).getHours() < 10 ? "0" + (new Date(dailyWeather.sunrise * 1000)).getHours() : (new Date(dailyWeather.sunrise * 1000)).getHours()}:{(new Date(dailyWeather.sunrise * 1000)).getMinutes() < 10 ? "0" + (new Date(dailyWeather.sunrise * 1000)).getMinutes() : (new Date(dailyWeather.sunrise * 1000)).getMinutes()}
                                </Typography>
                                <Typography variant="body1" color="text.secondary" style={{ fontSize: "20px" }}>
                                    <strong>Sunset: </strong>{(new Date(dailyWeather.sunset * 1000)).getHours() < 10 ? "0" + (new Date(dailyWeather.sunset * 1000)).getHours() : (new Date(dailyWeather.sunset * 1000)).getHours()}:{(new Date(dailyWeather.sunset * 1000)).getMinutes() < 10 ? "0" + (new Date(dailyWeather.sunset * 1000)).getMinutes() : (new Date(dailyWeather.sunset * 1000)).getMinutes()}
                                </Typography>
                            </div>

                            <Typography variant="body1" color="text.secondary" style={{ fontSize: "20px" }}>
                                <strong>Wind:</strong> {dailyWeather.speed} m/s, {dailyWeather.deg}°
                            </Typography>

                            <div style={{ display: "flex", gap: "16px" }}>
                                <Typography variant="body1" color="text.secondary" style={{ fontSize: "17px" }}>
                                    <strong>Humidity: </strong>{dailyWeather.humidity}%
                                </Typography>
                                <Typography variant="body1" color="text.secondary" style={{ fontSize: "17px" }}>
                                    <strong>Pressure: </strong>{dailyWeather.pressure} hPa
                                </Typography>
                            </div>
                        </div>
                    </CardContent>
                </ScrollAnimation>
            </Card>

        )
    }
    return (
        <Card sx={{ display: "flex", flexWrap: "wrap", gap: "16px", justifyContent: "center", marginBottom: "100px", maxWidth: "90%", overflow: "auto" }}>
            {weather && weather.list.map((dailyWeather, index) => <SmallCardDaily
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
export default WeatherCardDaily;

