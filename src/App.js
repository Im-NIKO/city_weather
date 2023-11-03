import maxTemp from "./assets/heat.png"
import minTemp from "./assets/cool.png"
import hum from "./assets/humidity.png"
import wind from "./assets/wind.png"
import axios from "axios";
import './App.css';
import { useState } from "react";

function App() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=274a612bdeb29a9de8fe4aa8981b7c77`

  const getData = () => {
    axios.get(url).then(res => {
      setData(res.data)
      console.log(res.data)
    }).catch(err => {
      console.log(err)
      setLocation(' ERROR: Wrong city')
    })
    setLocation('')
  }

  return (
    <div className="app">
      <div className="section">
        <div className="search">
          <input value={location} onChange={event => setLocation(event.target.value)} placeholder="Enter City"></input>
          <button onClick={getData}>Search</button>
        </div>
        <div className="icon_block">
          <p className="city">{data.name}</p>
          {data.weather ? <img src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} /> : null}
        </div>
        <div className="info" >
          {data.main ? <h1 className="temp">{(data.main.temp - 273.15).toString().split('.')[0]}°С</h1> : null}
          {data.weather ? <p className="weather">{data.weather.main}</p> : null}
          <div className="info_icons_block">
          </div>
          <div className="info_block">
            
            <div>
              <img className="icon" src={maxTemp} />
            {data.main ? <p >{(data.main.temp_min - 273.15).toString().split('.')[0]}°С</p> : null}
            </div>
            <div>
            <img className="icon" src={minTemp} />
            {data.main ? <p >{(data.main.temp_max - 273.15).toString().split('.')[0]}°С</p> : null}
            </div>
            <div>
            <img className="icon" src={hum} />
            {data.main ? <p >{data.main.humidity.toString().split('.')[0]}%</p> : null}
            </div>
            <div>
            <img className="icon" src={wind} />
            {data.wind ? <p >{(data.wind.speed / 0.62137).toString().split('.')[0]} km</p> : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
