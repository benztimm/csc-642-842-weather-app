import { useState, useEffect } from 'react';
import * as React from 'react';
import TextField from '@mui/material/TextField';

import { Button } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { uniqueCitylist, API_KEY, NEWS_API_KEY, options } from '../statics/data.js';


function Weather() {
    const [unit, setUnit] = useState(localStorage.getItem("unit"));
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState(null);
    const [news, setNews] = useState(null);
    const [food, setFood] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        /*
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`)
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(err => console.log(err));

        const newsResponse = await fetch(`https://newsapi.org/v2/everything?q=${city}&pageSize=3&apiKey=${NEWS_API_KEY}`)
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(err => console.log(err));
        */
        const foodResponse = fetch(`http://localhost:3001/api/yelp?location=${city}&sort_by=best_match&limit=3`)
            .then((response) => response.json())
            .then((data) => console.log(data))
            .catch((error) => console.error("Error fetching data from Yelp API:", error));
    };
    useEffect(() => {
        const interval = setInterval(() => {
            const storedUnit = localStorage.getItem('unit');
            if (storedUnit !== unit) {
                setUnit(storedUnit);
            }
        }, 100); // Check for updates every 100ms (1 second)

        // Clean up the interval when the component unmounts
        return () => clearInterval(interval);
    }, [unit]);
    return (
        <div style={{ display: 'flex', flexDirection: "column", justifyContent: 'center', marginTop: '50px' }}>
            <div>
                <form onSubmit={handleSubmit}>
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
            </div>
        </div>



    );
}
export default Weather;