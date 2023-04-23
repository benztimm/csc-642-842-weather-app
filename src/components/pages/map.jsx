import { useState,useEffect } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { API_KEY } from '../statics/data.js';

const WeatherMap = () => {
    const [selectedLayer, setSelectedLayer] = useState('temp_new');


    useEffect(() => {
      const interval = setInterval(() => {
          const storedUnit = localStorage.getItem('setting');
          if (selectedLayer !== storedUnit) {
            setSelectedLayer(storedUnit);
          }
      }, 100); // Check for updates every 100ms (0.1 second)
      // Clean up the interval when the component unmounts
      return () => clearInterval(interval);
  }, [selectedLayer]);

    const weatherLayerUrl = `https://tile.openweathermap.org/map/${selectedLayer}/{z}/{x}/{y}.png?appid=${API_KEY}`;
    return (
      <MapContainer
        center={[37.7749, -122.4194]} // Set your desired map center (latitude, longitude)
        zoom={13}
        style={{ height: '100vh', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <TileLayer
          url={weatherLayerUrl}
          opacity={1}
        />
      </MapContainer>
    );
  }
  
  export default WeatherMap;