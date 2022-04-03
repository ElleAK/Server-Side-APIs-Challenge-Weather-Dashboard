//open weather api key
const apiKey ="f99926ec7e6734adcf20edaa2bdc5d87";
// Search City


//form submit
var formSubmitHandler = function(event) {
    event.preventDefault();
    // get value from input element
var city = cityInputEl.value.trim();
    if (city) {
        getCityWeather(city);
        userFormEl.textContent = "";
        cityInputEl.value = "";
      } else {
        alert("Please enter a city");
      }
    console.log(event);
  };

//Search City Button Function
//document.getElementById("btn").addEventListener("click", getWeatherCity);



// Call API
function getCityWeather() {
    var cityName = document.getElementById("city-input").value
    fetch("https://api.openweathermap.org/data/2.5/weather?units=imperial&q=" + cityName + "&appid=" + apiKey)
    
    .then(function(response) {
        response.json().then(function(data){
        displayCity(data);

        });
    });
};

function getUvIndex(lon, lat) {
    var cityName = document.getElementById("city-input").value
    fetch("https://api.openweathermap.org/data/2.5/onecall?units=imperial&lat=" + lat + "&lon=" + lon + "&appid=" + apiKey)
    
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
    console.log(data.name, data.main.temp);

    getUvIndex(long,lat)

};

function displayUvIndex(data){
    var uvIndex = data.current.uvi
    console.log(uvIndex);
    };



    userFormEl.addEventListener("submit", formSubmitHandler);
