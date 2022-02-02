var input = document.querySelector("#userInput");
var button = document.querySelector("#searchBtn");
var cityname = document.querySelector("#cityName");
var date = document.querySelector("#todayDate");
var current = document.querySelector("#currentWeather");
var humid = document.querySelector("#humidity");
var wind = document.querySelector("#windSpeed");

button.addEventListener("click", function(){
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=fcd594fc4b7accf846134105a10b76ac&units=imperial`).then(function(response) {
    return response.json()
}).then(function (weather){
    console.log(weather);
    displayWeather(weather)
    
})
})

function displayWeather(weather) {
    cityname.textContent = weather.name;
    current.textContent = weather.main.temp;
    date.textContent = moment().format('L');
    humid.textContent = weather.main.humidity;
    wind.textContent = weather.wind.speed;
}