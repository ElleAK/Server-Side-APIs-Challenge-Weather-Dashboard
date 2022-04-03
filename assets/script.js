//open weather api key
const apiKey ="f99926ec7e6734adcf20edaa2bdc5d87";
//declare variables
var cityHistory = $('#city-history-list');
var searchCityInput = $("#city-input");
var searchCityButton = $("#search-button");
var currentCity = $("#current-city");
var currentTemp = $("#current-temp");
var currentHumidity = $("#current-humidity");
var currentWindSpeed = $("#current-wind-speed");
var UVindex = $("#uv-index");
var currentWeather = $("#current-weather");

//date and time
var currentDate = moment().format('MMMM Do YYYY, h:mm a')
$("#current-date").text("(" + currentDate + ")");

//press enter to trigger search
$(document).on("submit", function(){
    event.preventDefault();

   //grab value in search bar
    var cityName = searchCityInput.val().trim();

        currentWeatherReturned(cityName)
        searchHistory(cityName);
        searchCityInput.val(""); 
});
// click search button to trigger search
searchCityButton.on("click", function(event){
    event.preventDefault();

    var cityName = searchCityInput.val().trim();

        currentWeatherReturned(cityName)
        searchHistory(cityName);    
        searchCityInput.val(""); 
});

// get info for open weather api for city
function currentConditionsRequest(cityName) {
    
    // url var for ajax
    var currentURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=" + APIkey;
    
    //ajax call
    $.ajax({
        url: currentURL,
        method: "GET"
    }).then(function(response){
        console.log(response);
        currentCity.text(response.name);
        currentCity.append("<small class='text-muted' id='current-date'>");
        $("#current-date").text("(" + currentDate + ")");
        currentCity.append("<img src='https://openweathermap.org/img/w/" + response.weather[0].icon + ".png' alt='" + response.weather[0].main + "' />" )
        currentTemp.text(response.main.temp);
        currentTemp.append("&deg;F");
        currentHumidity.text(response.main.humidity + "%");
        currentWindSpeed.text(response.wind.speed + "MPH");

        var lat = response.coord.lat;
        var lon = response.coord.lon;

    


/*form submit
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
    };*/
