import { useState, useEffect } from 'react';
import * as React from 'react';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Typography from '@mui/material/Typography';
import { uniqueCitylist, API_KEY, NEWS_API_KEY, PEXEL_API_KEY } from '../statics/data.js';
import ScrollAnimation from "./scrollanimation";



import WeatherCardSmall from '../Cards/weathercardDaily.jsx';
import NewsCard from '../Cards/newcard.jsx';
import FoodCard from '../Cards/foodcard.jsx';


function Trip() {
    const [departure, setDeparture] = useState(null);
    const [destination, setDestination] = useState(null);
    const [departureWeather, setDepartureWeather] = useState(null);
    const [destinationWeather, setDestinationWeather] = useState(null);
    const [unit, setUnit] = useState(sessionStorage.getItem("unit"));
    const [departurePicture, setDeparturePicture] = useState(null);
    const [destinationPicture, setDestinationPicture] = useState(null);
    const [news, setNews] = useState(null);
    const [food, setFood] = useState(null);


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const departureResponse = fetch(`https://api.openweathermap.org/data/2.5/forecast/daily?q=${departure}&cnt=8&appid=${API_KEY}`);
            const destinationResponse = fetch(`https://api.openweathermap.org/data/2.5/forecast/daily?q=${destination}&cnt=8&appid=${API_KEY}`);
            const newsResponse = fetch(`https://newsapi.org/v2/everything?q=${destination}&pageSize=3&apiKey=${NEWS_API_KEY}&sources=bbc-news,cnn`)
            const foodResponse = fetch(`http://localhost:3001/api/yelp?location=${destination}&sort_by=best_match&limit=3`)
            const departurePictureResponse = fetch(`https://api.pexels.com/v1/search?query=${departure}&per_page=8`, {
                headers: {
                    "Authorization": PEXEL_API_KEY,
                },
            });
            const destinationPictureResponse = fetch(`https://api.pexels.com/v1/search?query=${destination}&per_page=8`, {
                headers: {
                    "Authorization": PEXEL_API_KEY,
                },
            });


            const [departureData, destinationData, newsData, foodData, departurepictureData, destinationpictureData] = await Promise.all([
                departureResponse.then((res) => res.json()),
                destinationResponse.then((res) => res.json()),
                newsResponse.then((res) => res.json()),
                foodResponse.then((res) => res.json()),
                departurePictureResponse.then((res) => res.json()),
                destinationPictureResponse.then((res) => res.json()),
            ]);

            setDepartureWeather(departureData);
            setDestinationWeather(destinationData);
            setDeparturePicture(departurepictureData);
            setDestinationPicture(destinationpictureData);
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
        }, 100); // Check for updates every 100ms (0.1 second)

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
                    value={departure}
                    onChange={(e, v) => setDeparture(v)}
                    options={uniqueCitylist.filter((city) => city !== destination)}
                    sx={{ width: 300, marginLeft: 'auto', marginRight: 'auto', paddingBottom: '10px' }}
                    renderInput={(params) => <TextField {...params} label="Departure From" />}
                />

                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    value={destination}
                    onChange={(e, v) => setDestination(v)}
                    options={uniqueCitylist.filter((city) => city !== departure)}
                    sx={{ width: 300, marginLeft: 'auto', marginRight: 'auto', paddingBottom: '10px' }}
                    renderInput={(params) => <TextField {...params} label="Your Destination" />}
                />
                <Button variant="contained" type='submit' style={{ marginLeft: '10px' }}>Search</Button>
            </form>
            <ScrollAnimation>
                {departureWeather && <Typography variant="body1" color="text.secondary" fontWeight="bold" style={{ fontSize: "30px", marginTop: "10px" }}>{departure} Weather</Typography>}
                {departureWeather && <WeatherCardSmall weather={departureWeather} picture={departurePicture} unit={unit} />}
            </ScrollAnimation>
            <ScrollAnimation>
                {destinationWeather && <Typography variant="body1" color="text.secondary" fontWeight="bold" style={{ fontSize: "30px", marginTop: "10px" }}>{destination} Weather</Typography>}
                {destinationWeather && <WeatherCardSmall weather={destinationWeather} picture={destinationPicture} unit={unit} />}
            </ScrollAnimation>

            <ScrollAnimation>
                {news &&
                    <Typography variant="body1" color="text.secondary" fontWeight="bold" style={{ fontSize: "30px", marginTop: "10px" }}>
                        News in {destination}
                    </Typography>}
                {news && <NewsCard news={news} />}
            </ScrollAnimation>

            <ScrollAnimation>
                {food && <Typography variant="body1" color="text.secondary" fontWeight="bold" style={{ fontSize: "30px", marginTop: "10px" }}>
                    Food in {destination}
                </Typography>}
                {food && <FoodCard food={food} />}
            </ScrollAnimation>

        </div>
    );
}
export default Trip;