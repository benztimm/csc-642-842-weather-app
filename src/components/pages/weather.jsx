import { useState, useEffect } from 'react';
import * as React from 'react';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Typography from '@mui/material/Typography';
import { uniqueCitylist, API_KEY, NEWS_API_KEY, PEXEL_API_KEY } from '../statics/data.js';
import ScrollAnimation from "./scrollanimation";

import NewsCard from '../Cards/newcard.jsx';
import FoodCard from '../Cards/foodcard.jsx';
import WeatherCardHourly from '../Cards/weathercardHourly.jsx';
import WeatherCardDaily from '../Cards/weathercardDaily.jsx'

function Weather() {
    const [unit, setUnit] = useState(sessionStorage.getItem("unit"));
    const [city, setCity] = useState(null);
    const [weatherDaily, setweatherDaily] = useState(null);
    const [weatherHourly, setweatherHourly] = useState(null);
    const [news, setNews] = useState(null);
    const [food, setFood] = useState(null);
    const [cityPicture, setCityPicture] = useState(null);
    const [isHourly, setIsHourly] = useState(true);
    const [isDaily, setIsDaily] = useState(false);

    const handleIsHourly = (e) => {
        e.preventDefault();
        if (isHourly) return;
        setIsHourly(!isHourly);
        setIsDaily(!isDaily);
    };
    const handleIsDaily = (e) => {
        e.preventDefault();
        if (isDaily) return;
        setIsHourly(!isHourly);
        setIsDaily(!isDaily);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const weatherHourlyResponse = fetch(`https://pro.openweathermap.org/data/2.5/forecast/hourly?q=${city}&appid=${API_KEY}&cnt=8`);
            const weatherDailyResponse = fetch(`https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&cnt=8&appid=${API_KEY}`);
            const newsResponse = fetch(`https://newsapi.org/v2/everything?q=${city}&pageSize=3&apiKey=${NEWS_API_KEY}&sources=bbc-news,cnn`);
            const foodResponse = fetch(`http://localhost:3001/api/yelp?location=${city}&sort_by=best_match&limit=3`);



            const [weatherHourlyData, weatherDailyData, newsData, foodData] = await Promise.all([
                weatherHourlyResponse.then((res) => res.json()),
                weatherDailyResponse.then((res) => res.json()),
                newsResponse.then((res) => res.json()),
                foodResponse.then((res) => res.json()),

            ]);
            setweatherHourly(weatherHourlyData);
            setweatherDaily(weatherDailyData);
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

            {(weatherDaily || weatherHourly) &&
                <div style={{ display: "flex", flexDirection: "column", width: "85%" }}>
                    <div style={{ display: "flex", marginBottom: "10px", justifyContent: "flex-end" }}>
                        <Button
                            style={{ marginRight: "10px", alignSelf: "flex-start" }}
                            variant="outlined"
                            onClick={handleIsHourly}
                        >Hourly</Button>
                        <Button
                            style={{ alignSelf: "flex-end" }}
                            variant="outlined"
                            onClick={handleIsDaily}
                        >Daily</Button>
                    </div>
                </div>
            }


            <ScrollAnimation>
                {weatherHourly && isHourly &&
                    < WeatherCardHourly
                        weather={weatherHourly}
                        picture={cityPicture}
                        unit={unit} />}

                {weatherDaily && isDaily &&

                    < WeatherCardDaily
                        weather={weatherDaily}
                        picture={cityPicture}
                        unit={unit} />
                }
            </ScrollAnimation>
            <ScrollAnimation>
                {news && <Typography variant="body1" color="text.secondary" fontWeight="bold" style={{ fontSize: "50px", marginTop: "60px" }}>
                    News in {city}
                </Typography>}

                {news && <NewsCard news={news} />}
            </ScrollAnimation>

            <ScrollAnimation>
                {food && <Typography variant="body1" color="text.secondary" fontWeight="bold" style={{ fontSize: "50px", marginTop: "20px" }}>
                    Food in {city}
                </Typography>}
                {food && <FoodCard food={food} />}
            </ScrollAnimation>
        </div>



    );
}
export default Weather;