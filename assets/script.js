//open weather api key
var apiKey ="f99926ec7e6734adcf20edaa2bdc5d87";
//declare variables
var cityHistory = $('#city-history-list');
var searchCityInput = $("#city-input");
var searchCityButton = $("#search-button");
var clearHistoryButton = $("#clear-history");
var currentCity = $("#current-city");
var currentTemp = $("#current-temp");
var currentHumidity = $("#current-humidity");
var currentWindSpeed = $("#current-wind-speed");
var UVindex = $("#uv-index");
var currentWeather = $("#current-weather");
var cityList = [];
//date and time
var currentDate = moment().format('MMMM Do YYYY, h:mm a')
$("#current-date").text( currentDate );

//check for history when page loads
//initalizeHistory();
//showClear();

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

// Clear the sidebar of past cities searched
clearHistoryButton.on("click", function(){
    // Empty out the  city list array
    cityList = [];
    // Update city list history in local storage
    listArray();
    
    $(this).addClass("hide");
});

//button will populate weather info
cityHistory.on("click","li.city-btn", function(event) {
    // console.log($(this).data("value"));
    var value = $(this).data("value");
    currentWeatherReturned(value);
    searchHistory(value); 

});

// get info for open weather api for city
function currentWeatherReturned(cityName) {
    
    // url var for ajax
    var currentURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=" + apiKey;
    
    // call for current weather
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

        var UVurl = "https://api.openweathermap.org/data/2.5/uvi?&lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;
        // call for uv index
        $.ajax({
            url: UVurl,
            method: "GET"
        }).then(function(response){
            // console.log("UV call: ")
            // console.log(response);
            UVindex.text(response.value);
        });

        var countryCode = response.sys.country;
        var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?&units=imperial&appid=" + apiKey + "&lat=" + lat +  "&lon=" + lon;   


         // AJAX call for 5-day forecast
         $.ajax({
            url: forecastURL,
            method: "GET"
        }).then(function(response){
            console.log(response);
            $('#five-day-forecast').empty();
            for (var i = 1; i < response.list.length; i+=8) {

                var forecastDateString = moment(response.list[i].dt_txt).format("L");
                console.log(forecastDateString);

                var forecastCol = $("<div class='col-12 col-md-6 col-lg forecast-day mb-3'>");
                var forecastCard = $("<div class='card'>");
                var forecastCardBody = $("<div class='card-body'>");
                var forecastDate = $("<h5 class='card-title'>");
                var forecastIcon = $("<img>");
                var forecastTemp = $("<p class='card-text mb-0'>");
                var forecastHumidity = $("<p class='card-text mb-0'>");


                $('#five-day-forecast').append(forecastCol);
                forecastCol.append(forecastCard);
                forecastCard.append(forecastCardBody);

                forecastCardBody.append(forecastDate);
                forecastCardBody.append(forecastIcon);
                forecastCardBody.append(forecastTemp);
                forecastCardBody.append(forecastHumidity);
                
                forecastIcon.attr("src", "https://openweathermap.org/img/w/" + response.list[i].weather[0].icon + ".png");
                forecastIcon.attr("alt", response.list[i].weather[0].main)
                forecastDate.text(forecastDateString);
                forecastTemp.text(response.list[i].main.temp);
                forecastTemp.prepend("Temp: ");
                forecastTemp.append("&deg;F");
                forecastHumidity.text(response.list[i].main.humidity);
                forecastHumidity.prepend("Humidity: ");
                forecastHumidity.append("%");
                
                console.log(response.list[i].dt_txt);
                console.log(response.list[i].main.temp);
                console.log(response.list[i].main.humidity);

            }
        });
    });
};

// List the array into the search history sidebar
function listArray() {
    // Empty out the elements in the sidebar
    searchHistoryList.empty();
    // Repopulate the sidebar with each city
    // in the array
    cityList.forEach(function(city){
        var searchHistoryItem = $('<li class="list-group-item city-btn">');
        searchHistoryItem.attr("data-value", city);
        searchHistoryItem.text(city);
        searchHistoryList.prepend(searchHistoryItem);
    });
}
    // Update city list history in local storage
    localStorage.setItem("cities", JSON.stringify(cityList));

// Display and save the search history of cities
function searchHistory(cityName) {
    // Grab value entered into search bar 
    //var cityName = searchCityInput.val().trim();
    
    // If there are characters entered into the search bar
    if (cityName) {
        // Place value in the array of cities
        // if it is a new entry
        if (cityList.indexOf(cityName) === -1) {
            cityList.push(cityName);

            // List all of the cities in user history
            listArray();
            clearHistoryButton.removeClass("hide");
            currentWeather.removeClass("hide");
        } else {
            // Remove the existing value from
            // the array
            var removeIndex = cityList.indexOf(cityName);
            cityList.splice(removeIndex, 1);

            // Push the value again to the array
            cityList.push(cityName);

            // list all of the cities in user history
            // so the old entry appears at the top
            // of the search history
            listArray();
            clearHistoryButton.removeClass("hide");
            currentWeather.removeClass("hide");
        }
    }
    // console.log(cityList);
};