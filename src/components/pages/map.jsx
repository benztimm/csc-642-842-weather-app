import { useState,useEffect } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { API_KEY } from '../statics/data.js';
import Legend from '../Legends/legend.jsx';

const WeatherMap = () => {
    const [selectedLayer, setSelectedLayer] = useState('TA2');


    useEffect(() => {
      const interval = setInterval(() => {
          const storedUnit = sessionStorage.getItem('setting');
          if (storedUnit===null){
            sessionStorage.setItem("setting", "TA2");
        }
          if (selectedLayer !== storedUnit) {
            setSelectedLayer(storedUnit);
          }
      }, 100); // Check for updates every 100ms (0.1 second)
      // Clean up the interval when the component unmounts
      return () => clearInterval(interval);
  }, [selectedLayer]);

    //const weatherLayerUrl = `https://tile.openweathermap.org/map/${selectedLayer}/{z}/{x}/{y}.png?appid=${API_KEY}`;
    const weatherLayerUrl =`http://maps.openweathermap.org/maps/2.0/weather/${selectedLayer}/{z}/{x}/{y}?appid=${API_KEY}`

    return (
      <MapContainer
        center={[37.7749, -122.4194]} // Set your desired map center (latitude, longitude)
        zoom={13}
        style={{ height: '92vh', width: '100%', marginTop: '70px' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <TileLayer
          url={weatherLayerUrl}
          opacity={selectedLayer === 'HRD0'?0.6:0.8}
        />
          <Legend />
      </MapContainer>
      
    );
  }
  
  export default WeatherMap;
