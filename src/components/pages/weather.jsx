import { useState, useEffect } from 'react';
import * as React from 'react';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import { Button } from '@mui/material';
function Weather() {
    const [unit, setUnit] = useState(localStorage.getItem("unit"));
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState(null);
    

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your form submission logic here
        console.log("city", city);
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
        <div style={{ paddingTop: '50px' }}>
            <form onSubmit={handleSubmit}>
                <InputLabel htmlFor="input-with-icon-adornment" position="start">
                    City
                </InputLabel>
                <Input
                    id="input-with-icon-adornment"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    startAdornment={
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    }
                />
                <div style={{ paddingTop: '15px', marginLeft: '10px' }}></div>
                <Button variant="contained" type='submit'>Search</Button>
            </form>
            {city}
            {unit}
        </div>



    );
}
export default Weather;