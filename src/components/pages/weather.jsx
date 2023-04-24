import { useState, useEffect } from 'react';
import * as React from 'react';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Typography from '@mui/material/Typography';
import { uniqueCitylist, API_KEY, NEWS_API_KEY, PEXEL_API_KEY } from '../statics/data.js';
import ScrollAnimation from "./scrollanimation";

import WeatherCard from '../Cards/weathercard.jsx';
import NewsCard from '../Cards/newcard.jsx';
import FoodCard from '../Cards/foodcard.jsx';

import weatherJson from '../statics/weather.json';
import newsJson from '../statics/news.json';
import foodJson from '../statics/food.json';
import cityPictureJson from '../statics/picture.json';


function Weather() {
    const [unit, setUnit] = useState(sessionStorage.getItem("unit"));
    const [city, setCity] = useState(null);
    const [weather, setWeather] = useState(weatherJson);
    const [news, setNews] = useState(newsJson);
    const [food, setFood] = useState(foodJson);
    const [cityPicture, setCityPicture] = useState(cityPictureJson);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const weatherResponse = fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
            const newsResponse = fetch(`https://newsapi.org/v2/everything?q=${city}&pageSize=3&apiKey=${NEWS_API_KEY}&sources=bbc-news,cnn`)
            const foodResponse = fetch(`http://localhost:3001/api/yelp?location=${city}&sort_by=best_match&limit=3`)
            const pictureResponse = fetch(`https://api.pexels.com/v1/search?query=${city}&per_page=1`, {
                headers: {
                    "Authorization": PEXEL_API_KEY,
                },
            });

            const [weatherData, newsData, foodData, pictureData] = await Promise.all([
                weatherResponse.then((res) => res.json()),
                newsResponse.then((res) => res.json()),
                foodResponse.then((res) => res.json()),
                pictureResponse.then((res) => res.json()),
            ]);

            setWeather(weatherData);
            setCityPicture(pictureData);
            setNews(newsData);
            setFood(foodData);

        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            const storedUnit = sessionStorage.getItem('unit');
            if (storedUnit === null) {
                sessionStorage.setItem("unit", "Celsius");
            }
            if (storedUnit !== unit) {
                setUnit(storedUnit);
            }
        }, 100); // Check for updates every 100ms (1 second)

        // Clean up the interval when the component unmounts
        return () => clearInterval(interval);
    }, [unit]);
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: "column",
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '50px'
            }}>


            <form onSubmit={handleSubmit} style={{ marginBottom: '30px', marginTop: "50px" }}>
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    value={city}
                    onChange={(e, v) => setCity(v)}
                    options={uniqueCitylist}
                    sx={{ width: 300, marginLeft: 'auto', marginRight: 'auto', paddingBottom: '10px' }}
                    renderInput={(params) => <TextField {...params} label="City" />}
                />
                <Button variant="contained" type='submit' style={{ marginLeft: '10px' }}>Search</Button>
            </form>

            <ScrollAnimation>
                {weather &&
                    < WeatherCard
                        weather={weather}
                        picture={cityPicture}
                        unit={unit} />
                }
            </ScrollAnimation>
            <ScrollAnimation>
                {news && <Typography variant="body1" color="text.secondary" fontWeight="bold" style={{ fontSize: "50px", marginTop: "60px" }}>
                    NEWS
                </Typography>}

                {news && <NewsCard news={news} />}
            </ScrollAnimation>

            <ScrollAnimation>
                {food && <Typography variant="body1" color="text.secondary" fontWeight="bold" style={{ fontSize: "50px", marginTop: "20px" }}>
                    FOOD
                </Typography>}
                {food && <FoodCard food={food} />}
            </ScrollAnimation>
        </div>



    );
}
export default Weather;
/*
{weather &&
    < WeatherCard
        weather={weather}
        picture={cityPicture}
        unit={unit} />
}
*/