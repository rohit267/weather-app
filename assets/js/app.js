const apikey = "6199bdb67223d448c3f0c5da8eb6b705";
let currentCityName = "";
let lat = "";
let lon = "";

$(document).ready(() => {
    getWeatherData(true);
    $(".cityNameInput").on("keypress", (e) => {
        currentCityName = e.target.value;
        if (currentCityName.length > 0 && e.which == 13) getWeatherData(false);
    });
});

function getWeatherData(byLocation) {
    if (byLocation) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(getWeatherByLocation);
        }
    } else {
        let weatherByCityNameEndpoint = `https://api.openweathermap.org/data/2.5/weather?q=${currentCityName}&units=metric&appid=${apikey}`;
        $.get(weatherByCityNameEndpoint, function (data) {
            populateData(data);
        });
    }
}

function getWeatherByLocation(position) {
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    let weatherByLocationEndpoint = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apikey}`;
    $.get(weatherByLocationEndpoint, function (data) {
        populateData(data);
    });
}

function populateData(data) {
    console.log(data);
    let options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    };
    let today = new Date().toLocaleTimeString("en-us", options).split(",");
    $("#cityName").html(data.name);
    $("#countryCode").html(data.sys.country);
    $("#today").html(`${today[0]}, ${today[1]}, ${today[2]}`);
    $(".temp").html(data.main.temp + "&deg;C");
    $(".tempMinMax").html(data.main.temp_min + "/" + data.main.temp_max);
    $("#weatherIcon").attr(
        "src",
        `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    );
    $("#weatherDescription").html(data.weather[0].main);
    $("#visibility").html(data.visibility);
    $("#humidity").html(data.main.humidity);
}
