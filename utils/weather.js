// Pe baza unui cod de iconita primit de la OpenWeather API - noi o sa generam linkul acesteia
function getWeatherIcon(iconCode) {
    return `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
}

// pe baza speed-ului primit de la OpenWeather API care este in m/s noi o sa returnam km/h
function windToKmPerHour(meterPerSec) {
    return (meterPerSec * 3600) / 1000;
}