const url = 'https://api.openweathermap.org/data/2.5/'
const key = '35bd8f11c5f6f8625d6d5dfc78b3dcaa';

const searchBar = document.getElementById('searchBar');

function setQuery(e) {
  (e.code === 'Enter') ? getResult(searchBar.value) : null;

}

function getResult(cityName) {
  let query = `${url}weather?q=${cityName}&appid=${key}&units=metric&lang=eng`;
  
  fetch(query)
    .then(res => res.json())
    .then(weather => {      
      locationDOM(weather.name, weather.sys.country)
      tempratureDOM(weather.main.feels_like)
      description(weather.weather[0].description)
      weatherMinMax(weather.main.temp_max, weather.main.temp_min)
    }) 
}

function locationDOM(location, country) {
  const city = document.getElementById('city');
  city.innerText = `${location}, ${country}`
}

function tempratureDOM(temp) {
  const temperature = document.getElementById('temperature');
  temperature.innerText = `${temp.toFixed(0)} °C`
}

function description(desc) {
  const description = document.getElementById('description');
  description.innerText = `${desc}`
}

function weatherMinMax(min,max) {
  const minMax = document.getElementById('min-max');
  minMax.innerText = `${min.toFixed(0)} °C / ${max.toFixed(0)} °C`
}


 





searchBar.addEventListener('keypress', setQuery);