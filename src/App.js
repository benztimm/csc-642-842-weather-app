import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ResponsiveAppBar from './components/navbar/navbar.jsx';
import Weather from './components/pages/weather.jsx';
import MapPage from './components/pages/map';
import TripPage from './components/pages/trip';
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <ResponsiveAppBar />
        <Routes>
          <Route path="/weather" element={<Weather />}></Route>
          <Route path="/map" element={<MapPage />}> </Route>
          <Route path="/trip" element={<TripPage />}> </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
