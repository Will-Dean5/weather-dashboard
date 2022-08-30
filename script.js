var appid = '692efab00ae66e9f48137e6ea4766fcd';
var searchBtn = document.querySelector('#search');
var searchForm = document.querySelector('#searchForm');
var searchCities = document.querySelector('#searchCities');

var toJSON = function (response) {
    return response.json();
}
// function to create elements that will be appended to the page 
var displayWeather = function (data, city) {
    console.log(data);
    // currentWeather.innerHTML = null;
    var currentWeather = document.getElementById('weatherNow')
    var h2El = document.createElement('h2');
    var tempEl = document.createElement('p');
    var windEl = document.createElement('p');
    var humidEl = document.createElement('p');
    var uvEl = document.createElement('p');
    h2El.textContent = city.name;
    tempEl.textContent = 'TEMP: ' + data.current.temp;
    windEl.textContent = 'Wind: ' + data.current.wind_speed + 'MPH';
    humidEl.textContent = 'Humidity: ' + data.current.humidity;
    uvEl.textContent = 'UV: ' + data.current.uvi;
    currentWeather.appendChild(h2El);
    currentWeather.appendChild(tempEl);
    currentWeather.appendChild(windEl);
    currentWeather.appendChild(humidEl);
    currentWeather.appendChild(uvEl);
};
// 
var displayBtn = function () {
    var cities = JSON.parse(localStorage.getItem('cities')) || [];
    var showThree = cities.slice(cities.length - 3);
    searchCities.innerHTML = null;
    for (var city of showThree) {
        var buttonEl = document.createElement('button');
        buttonEl.textContent = city;
        buttonEl.className = "btn btn-success mb-3 btn-block";
        searchCities.appendChild(buttonEl);

    }
};

var getOneCall = function (city) {
    var oneCall = `https://api.openweathermap.org/data/3.0/onecall?lat=${city.lat}&lon=${city.lon}&appid=${appid}&units=imperial&exclude=hourly,minutely`;

    fetch(oneCall)
        .then(toJSON)
        .then(function (data) {
            displayWeather(data, city);
            displayForcast(data);
        });
};
// saves the input from the user to local storage 
var saveLocalStorage = function (city) {
    var cities = JSON.parse(localStorage.getItem('cities')) || [];
    cities.push(city);
    var citySet = Array.from(new Set(city.name));
    var data = JSON.stringify(cities);
    localStorage.setItem('cities', data);
    displayBtn();
};

var getGEO = function (locations) {
    var city = locations[0];
    console.log('LAT', city.lat);
    console.log('LON', city.lon);
    saveLocalStorage(city.name)
    getOneCall(city);
};
// displays a 5 day forcast under the current days weather
var displayForcast = function (data) {
    console.log(data);
    var forcastEl = document.getElementById('fiveDay');
    var h3El = document.createElement('h3');
    h3El.className = 'col-lg-12';
    h3El.textContent = 'Five Day Forcast: ';
    forcastEl.appendChild(h3El);

    for (var i = 1; i < 6; i++) {
        console.log('DAY', day);
        var date = new Date(day.dt * 1000).toLocaleDateString();
        var temp = temp;
        var icon = day.weather[0].icon;
        var colEl = document.createElement('div');
        var cardEl = document.createElement('div');
        var dateEl = document.createElement('p');
        var tempEl = document.createElement('p');
        var imgEl = document.createElement('img');
        var h4El = document.createElement('h4');
        h4El.className = 'card-title';


        colEl.className = "col-12 col-md";
        cardEl.className = "card p-3 m-3";

        h4El.textContent = moment(data.daily[i].dt, 'X').format('M/D/YYYY');
        dateEl.textContent = date;
        tempEl.textContent = temp;

        // imgEl.alt = icon;
        // imgEl.src = ""
    }
};
var handleSearch = function (event) {
    event.preventDefault();
    var q = document.querySelector('#citySearch');
    var geoURL = `http://api.openweathermap.org/geo/1.0/direct?q=${q.value}&appid=${appid}`;
    fetch(geoURL)
        .then(toJSON)
        .then(getGEO);

};
// adds a click event to the search button element that searches for a certain city

var handleCitySearch = function (event) {
    event.preventDefault();
    if (event.target.matches('button')){
        var q = event.target.textContent;
        var geoURL = `http://api.openweathermap.org/geo/1.0/direct?q=${q}&appid=${appid}`;
        fetch(geoURL)
        .then(toJSON)
        .then(getGEO);
    }
};

searchBtn.addEventListener('click', handleSearch)
q = document.querySelector('#citySearch').value;
console.log(q);
localStorage.setItem('City', q);

searchCities.addEventListener('click', handleCitySearch);


displayBtn();





// containEl = document.querySelector('container')

// var headEl = document.createElement('header');
// headEl.classList.add('col-12', 'display-1', 'text-center', 'bg-success', 'text-dark');
// containEl.appendChild(headEl);
// headEl.textContent = "Weather Forcast";
// 
// var divEl = document.createElement('div');
// divEl.classList.add('col-3', 'h5');
// containEl.appendChild(divEl);
// 
// var mainEl = document.createElement('main');
// mainEl.classList.add('col-8', 'row', 'flex-row');
// containEl.appendChild(mainEl);
// 
// var weatherEl = document.createElement('div');
// weatherEl.classList.add('col-12', 'py-5', 'h2');
// mainEl.appendChild(weatherEl);
// 
// var forcastEl = document.createElement('div');
// forcastEl.classList.add('col-12', 'h3');
// forcastEl.style.width = '10-rem';
// mainEl.appendChild(forcastEl);