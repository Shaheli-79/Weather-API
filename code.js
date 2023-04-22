let fetchButton = document.getElementById('fetchButton');
let latLongBox = document.getElementById('latLong');
let latitude = document.getElementById('lat');
let longitude = document.getElementById('long');
let map = document.getElementById('map');
let locate = document.getElementById('locate');
let latitude2 = document.getElementById('latitude');
let longitude2 = document.getElementById('longitude');
let timezone = document.getElementById('timezone');
let windSpeed = document.getElementById('windSpeed');
let pressure = document.getElementById('pressure');
let humidity = document.getElementById('humidity');
let windDirection = document.getElementById('windDirection');
let feelsLike = document.getElementById('feelsLike');
let whiteContainer = document.getElementById('whiteContainer');

fetchButton.addEventListener('click', showWeather);

function showWeather() {
     showLocation();
     setTimeout(()=>{
        APICall()
     }, 2000);
}

function showLocation() {
    console.log("SB");
    fetchButton.style.display = "none";
    latLongBox.style.display = "block";
    map.style.display = "block";
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
        console.log("checking");
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
}

function showPosition(position) {
    latt = position.coords.latitude;
    long = position.coords.longitude;
    latitude.innerHTML = "Lat: " + position.coords.latitude;
    longitude.innerHTML = "Long: " + position.coords.longitude;

    var lattlong = new google.maps.LatLng(latt, long);
    var myOptions = {
        center: lattlong,
        zoom: 15,
        mapTypeControl: true,
        navigationControlOptions: { style: google.maps.NavigationControlStyle.SMALL }
    }
    var maps = new google.maps.Map(document.getElementById("map"), myOptions);
    var markers = new google.maps.Marker({ position: lattlong, map: maps, title: "SB found it!" });
}



async function APICall() {
    
    var lat = parseFloat(latitude.innerText.split(" ")[1]);
    var long = parseFloat(longitude.innerText.split(" ")[1]);
    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&&appid=8f3a65395ce21843d5f2d0e9056240ef`);
    let data = await response.json();
    whiteContainer.style.display = "block";
    locate.innerHTML = "Location: " + data.name;
    latitude2.innerHTML = "Lat: " + data.coord.lat;
    longitude2.innerHTML = "Long: " + data.coord.lon;
    let time = (data.timezone/3600).toString();
    let timeArr = time.split(".");
    let hr = (timeArr[0]);
    let minute = (timeArr[1]*6);
    timezone.innerHTML = "TimeZone: " + "UTC+0" + hr + ":" + minute;
    windSpeed.innerHTML = "Wind Speed: " + data.wind.speed;
    pressure.innerHTML = "Pressure: " + data.main.pressure;
    humidity.innerHTML = "Humidity: " + data.main.humidity;
    windDirection.innerHTML = "Wind Direction: " + data.wind.deg + "°";
    feelsLike.innerHTML = "Feels Like: " + (parseInt(data.main.feels_like) - 273.15).toFixed(2) + "°C";
}




