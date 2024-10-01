import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Weather from './components/Weather';
import WeatherStyling from './components/WeatherStyling';

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<WeatherStyling />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;