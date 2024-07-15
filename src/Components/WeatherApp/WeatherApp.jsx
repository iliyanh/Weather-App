import React, { useState } from 'react'
import './WeatherApp.css'

import search_icon from "../Assets/search.png"
import clear_day from "../Assets/clear_day.png"
import clear_night from "../Assets/clear_night.png"
import partly_cloudy_day from "../Assets/PartlyCloudyDay.png"
import partly_cloudy_night from "../Assets/PartlyCloudyNight.png"
import cloudy_day from "../Assets/cloudy_day.png"
import cloudy_night from "../Assets/cloudy_night.png"

import heavy_rain from "../Assets/HeavyRain.png"
import rain_day from "../Assets/HeavyRainSwrsDay.png"
import rain_night from "../Assets/HeavyRainSwrsNight.png"
import rain_thunderstorm from "../Assets/CloudRainThunder.png"
import snow from "../Assets/snow.png"
import mist from "../Assets/Fog.png"


import humidity_icon from "../Assets/humidity.png"
import wind_icon from "../Assets/wind.png"

export const WeatherApp = () => {
    const [data, setData] = useState({});
    const [location, setLocation] = useState('');
    const [weatherIcon , setWeatherIcon] = useState();

    const API_KEY = "2c27722eb33dd324ab6d8b109eb0897a"
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=Metric&APPID=${API_KEY}`

    const search = async () => {

        const request = await fetch(url);
        const response = await request.json();
        setData(response);
        setLocation("");

    
    if(response.weather[0].icon === '01d'){
        setWeatherIcon(clear_day);
    } else if(response.weather[0].icon === '01n') {
        setWeatherIcon(clear_night)
    } else if(response.weather[0].icon === '02d' || response.weather[0].icon === '04d' ) {
        setWeatherIcon(partly_cloudy_day)
    } else if(response.weather[0].icon === '02n' || response.weather[0].icon === '04n') {
        setWeatherIcon(partly_cloudy_night)
    } else if(response.weather[0].icon === '03d') {
        setWeatherIcon(cloudy_day)
    } else if(response.weather[0].icon === '03n') {
        setWeatherIcon(cloudy_night)
    } else if(response.weather[0].icon === '09d' || response.weather[0].icon === '09n') {
        setWeatherIcon(heavy_rain)
    } else if(response.weather[0].icon === '10d') {
        setWeatherIcon(rain_day)
    } else if(response.weather[0].icon === '10n') {
        setWeatherIcon(rain_night)
    } else if(response.weather[0].icon === '11d' || response.weather[0].icon === '11n') {
        setWeatherIcon(rain_thunderstorm)
    }else if(response.weather[0].icon === '13d' || response.weather[0].icon === '13n') {
        setWeatherIcon(snow)
    }else if(response.weather[0].icon === '50d' || response.weather[0].icon === '50n') {
        setWeatherIcon(mist)
    }
    }
  return (
    <div className='container'>
        <div className="top-bar">
            <input value={location}
            onChange={event => setLocation(event.target.value)} type="text" className="cityInput" placeholder='Enter Location'/>
            <div className="search-icon" onClick={()=>{search()}}>
                <img src={search_icon} alt="" />
            </div>
        </div>
        
        <div className="weather-image">
            <img src={weatherIcon} alt="" />
        </div>
        {data.main ? <div className="weather-temp">{(data.main.temp.toFixed())}&deg;c</div> : null}
        {data.name ? <div className="weather-location">{data.name}</div> : null}
        
        <div className="data-container">
            {data.main ? 
            <div className="element">
                <img src={humidity_icon} alt="" className="icon" />
                <div className="data">
                    <div className="humidity-percent">{data.main.humidity}%</div>
                    <div className="text">Humidity</div>
                </div>
            </div>
            :
            null}
            {data.main ?
            <div className="element">
                <img src={wind_icon} alt="" className="icon" />
                <div className="data">
                    <div className="humidity-percent">{data.wind.speed}km/h</div>
                    <div className="text">Wind Speed</div>
                </div>
            </div>
            :
            null
}
        </div>
    </div>
    
  )
}
