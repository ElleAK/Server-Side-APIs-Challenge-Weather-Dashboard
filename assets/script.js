//open weather api key
const apiKey ="f99926ec7e6734adcf20edaa2bdc5d87";
// Search City
var cityContainerEl = document.querySelector("#city-container");
var citySearch = document.querySelector("#city-search");
//Current Weather
var currentWeather = document.querySelector("#today");
//5 Day Forecast
var fiveDayForecast = document.querySelector("#five-day");


//Search City Button Function
document.getElementById("btn").addEventListener("click", getWeatherCity);



// Call API
function getWeatherCity() {
    var cityName = document.getElementById("city-input").value
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey)
    
    .then(function(response) {
        response.json().then(function(data){
        displayCity(data);

        });
    });
};
function getUvIndex(lon, lat) {
    var cityName = document.getElementById("city-input").value
    fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey)
    
    .then(function(response) {
        response.json().then(function(data){
        displayUvIndex(data);

        });
    });
};
function displayCity(data){
    var cityName = data.name
    var temp = data.main.temp
    var humid =data.main.humidity
    var windSpeed = data.wind.speed
    var lat = data.coord.lat
    var long = data.coord.lon
    console.log(data.main.temp);

    getUvIndex(long,lat)

};

function displayUvIndex(data){
    var uvIndex = data.current.uvi
    console.log(uvIndex);
    };



//display results on page


    //cityContainerEl.textContent = "";
    //citySearch.textContent = cityName;

    





var formSubmitHandler = function(event) {
     event.preventDefault();

}


