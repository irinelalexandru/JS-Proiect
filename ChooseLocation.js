const bucharestButton = document.querySelector('.dropdown-menu .bucharest');
const timisoaraButton = document.querySelector('.dropdown-menu .timisoara');
const oradeaButton = document.querySelector('.dropdown-menu .oradea');
const brasovButton = document.querySelector('.dropdown-menu .brașov');
const constantaButton = document.querySelector('.dropdown-menu .constanta');

function updateCurrentCityName(city) {
    // Prima data selectam tag-ul de HTML car eeste dedicat afisarii orasului curent
    const currentCity = document.querySelector('.current-city');
    currentCity.innerHTML = city;
}

function updateWeather(city) {
    // Actualizam orasul in localStorage
    localStorage.setItem('city', city);
    // Actualizam orasul afisat pe ecran
    updateCurrentCityName(city);
    // Afisam vremea curenta pentru orasul selectat din drop-down
    displayCurrentWeather(city);
    // Afisam vremea pe urmatoare 5 zile
    displayWeatherForecast(city);
}

// Adaugam event listenrii pentru butoanele din drop=down
bucharestButton.addEventListener('click', function(){
    updateWeather('București');
});

timisoaraButton.addEventListener('click', function(){
    updateWeather('Timișoara');
});

oradeaButton.addEventListener('click', function(){
    updateWeather('Oradea');
});

brasovButton.addEventListener('click', function(){
    updateWeather('Brașov');
});

constantaButton.addEventListener('click', function(){
    updateWeather('Constanța');
});