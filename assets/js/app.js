const apikey = "6199bdb67223d448c3f0c5da8eb6b705";
let currentCityName = "";
let lat = "";
let lon = "";
let weatherByCityNameEndpoint = `https://api.openweathermap.org/data/2.5/weather?q=${currentCityName}&appid=${apikey}`;

$(document).ready(() => {
    getWeatherData(true);

    $(".cityNameInput").on("input", (e) => {
        cityNane = $(this).val();

        if (cityNane.length > 0) getWeatherData(false);
    });
});

function getWeatherData(byLocation) {
    if (byLocation) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(getWeatherByLocation);
        }
    } else {
        // $.get( "ajax/test.html", function( data ) {
        //     $( ".result" ).html( data );
        //     alert( "Load was performed." );
        //   });
    }
}

function getWeatherByLocation(position) {
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    let weatherByLocationEndpoint = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}`;
    $.get(weatherByLocationEndpoint, function (data) {
        populateData(data);
    });
}

function populateData(data) {
    let options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        // hour: "2-digit",
        // minute: "2-digit",
        // second: "2-digit",
        // hour12: false,
    };
    let today = new Date().toLocaleTimeString("en-us", options).substr(0, 25);
    console.log(today);
    $("#cityName").html(data.name);
    $("#countryCode").html(data.sys.country);
    $("#today").html(today);
}
