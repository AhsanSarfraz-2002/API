import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Weather from './components/Weather';
import WeatherAxios from './components/WeatherAxios';

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<WeatherAxios />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;