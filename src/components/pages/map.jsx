import { useState, useEffect } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { API_KEY } from '../statics/data.js';
import Legend from '../Legends/legend.jsx';
import Button from '@mui/material/Button';


import dayjs from 'dayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';


const WeatherMap = () => {
  const [selectedLayer, setSelectedLayer] = useState('TA2');
  const [date, setDate] = useState(Math.floor(Date.now() / 1000));
  const [url, setUrl] = useState(`http://maps.openweathermap.org/maps/2.0/weather/TA2/{z}/{x}/{y}?appid=${API_KEY}&date=${date}`);
  const now = Math.floor(Date.now() / 1000)

  useEffect(() => {
    const interval = setInterval(() => {
      const storedUnit = sessionStorage.getItem('setting');
      if (storedUnit === null) {
        sessionStorage.setItem("setting", "TA2");
      }
      if (selectedLayer !== storedUnit) {
        setSelectedLayer(storedUnit);
      }
    }, 100); // Check for updates every 100ms (0.1 second)
    // Clean up the interval when the component unmounts
    setUrl(`http://maps.openweathermap.org/maps/2.0/weather/${selectedLayer}/{z}/{x}/{y}?appid=${API_KEY}&date=${date}`)
    return () => clearInterval(interval);
  }, [selectedLayer, date]);
  return (
    <div style={{ marginTop: ' 80px'}}>
      <div style={{border:"",display:"flex", justifyContent:"center"}}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker
          label="Date"
          value={dayjs.unix(date)}
          onChange={(newValue) => {setDate(newValue.unix())}}
          maxDate={dayjs().add(9, 'day')}
          minDate={dayjs().subtract(2, 'year')}
        />
    </LocalizationProvider>
      <Button
        variant="outlined"
        onClick={() => { setDate(now) }}
        sx={{ marginLeft: "10px" }}>
        Reset
      </Button>
      </div>
      <div style={{ marginBottom: '5px' }}>{selectedLayer === 'TS0' && date>now && <strong style={{fontSize:"15px"}}>Unable to forecast Soil temperature</strong>}</div>


      <MapContainer
        center={[37.7749, -122.4194]} // Set your desired map center (latitude, longitude)
        zoom={13}
        style={{ height: '85vh', width: '100%', }}
      >

        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <TileLayer
          url={url}
          opacity={selectedLayer === 'HRD0' ? 0.6 : 0.8}
        />
        <Legend />
      </MapContainer>
    </div>
  );
}

export default WeatherMap;
