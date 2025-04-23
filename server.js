const express = require('express');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// 👇 Insert your actual OpenWeatherMap API key here
const API_KEY = "4e23d6c2dbb60e1011a349d3eff0fa17";

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/weather', async (req, res) => {
  const city = req.query.city;
  if (!city) return res.json({ error: "City is required" });

  const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

  try {
    const response = await fetch(apiURL);
    const weatherData = await response.json();

    if (weatherData.cod !== 200) {
      return res.json({ error: weatherData.message });
    }

    const result = {
      city: weatherData.name,
      temp: weatherData.main.temp,
      description: weatherData.weather[0].description,
      icon: `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`
    };

    res.json(result);
  } catch (err) {
    res.json({ error: "Failed to fetch weather data" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
