var container = document.querySelector("#container");
var input = document.querySelector("#userInput");
var button = document.querySelector("#searchBtn");
var cityname = document.querySelector("#cityName");
var date = document.querySelector("#todayDate");
var current = document.querySelector("#currentWeather");
var humid = document.querySelector("#humidity");
var wind = document.querySelector("#windSpeed");

button.addEventListener("click", function () {
    container.innerHTML = ""
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=fcd594fc4b7accf846134105a10b76ac&units=imperial`).then(function (response) {
        return response.json()
    }).then(function (weather) {
        console.log(weather);
        displayWeather(weather)

        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${weather.coord.lat}&lon=${weather.coord.lon}&exclude=current,minutely,hourly,alerts&appid=fcd594fc4b7accf846134105a10b76ac&units=imperial`).then(function (response) {
            return response.json()
        }).then(function (forecast) {
            console.log(forecast)
            fiveDayForecast(forecast)

        })
    })
})

function displayWeather(weather) {
    cityname.textContent = weather.name;
    current.textContent = weather.main.temp;
    date.textContent = moment().format('L');
    humid.textContent = weather.main.humidity;
    wind.textContent = weather.wind.speed;
}

function fiveDayForecast(forecast) {
    debugger
    for (let index = 0; index < 5; index++) {
        var card = document.createElement("div");
        card.classList.add("card");
        var cardHeader = document.createElement("div");
        cardHeader.classList.add("card-header");
        var unorderList = document.createElement("ul");
        unorderList.className = "list-group list-group-flush";
        var listTemp = document.createElement("li");
        listTemp.classList.add("list-group-item");
        var listWind = document.createElement("li");
        listWind.classList.add("list-group-item");
        var listHumid = document.createElement("li");
        listHumid.classList.add("list-group-item");

        container.appendChild(card);
        card.append(cardHeader, unorderList);
        unorderList.append(listTemp, listWind, listHumid);
        
        cardHeader.textContent = moment().add(1, 'days').format('L');
        listTemp.textContent = "Temperature: " + forecast.daily[index].temp.day;
        listWind.textContent = "Wind speed: " + forecast.daily[index].wind_speed;
        listHumid.textContent = "Humidity: " + forecast.daily[index].humidity;
    }
}