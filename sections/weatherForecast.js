// Declaram functia care o sa ne faca predictia pentru vreme pentru urmatoarele 5 zile. Apelul functiei se va face in fisierul ChooseLocation.js si in index.js
function displayWeatherForecast(city) {
    // generam link-ul server-uluui catre care trebiuie sa facem call-ul pe baza orasului
    const forecastEndpoint = getForecastEndpoint(city);

    // Inainte sa facem call-ul catre server si ca sa putem sa afisam noile informatii in HTML, trebuie sa selectam elementul de interes
    let weatherForecastContainer = document.querySelector(".weather-forecast");
    // Stergem de pe ecran datele vechi
    weatherForecastContainer.innerHTML = '';

    fetch(forecastEndpoint)
        .then((response) => response.json())
        .then((data) => {
            // Din datele venite de la OpenWeather API noi o sa pastram doar proprietatea list(deoarece ea contine predictia vremii pe urmatoarele zile) - care este un array
            const {list} = data;

            // Avem nevoie de un obiect in care sa grupam predictiile pe zile
            const daysMap = {};
            
            // Iteram prin cele 40 de predictii primite de la server pe care le gasim in variabila list
            list.forEach((element) => {
                // Extragem proprietatea dt de pe elementul iterat
                const {dt} = element;
                // Folosim functia getDayOfTheWeek din utilitarul date.js pentru a transforma data in: Luni, Marti, Miercuri etc.
                const day = getDayOffTheWeek(dt);
                // Daca deja avem ziua saptamanii in obiectul daysMap atunci ii adaugam o noua predictie de vreme(adica obiectul peste care iteram: element)
                if (daysMap[day]) {
                    daysMap[day].push(element);
                } else {
                    // Altfel daca ziua saptamnii nu exista in obiectul daysMap atunci il adaugam impreuna cu noua predictie (adica obiectul curent peste care iteram: element)
                    daysMap[day] = [element];
                }
            });
            // Parcurgem cu ajutorul for...in continutul din obiectul daysMap - cheile sunt zilele saptamanii pentru care o sa afisam predictiile
            for (key in daysMap) {
                // Afisam ziua saptamnii pe ecran (o inseram in html)
                weatherForecastContainer.innerHTML += `<h3 class="text-primary">${key}</h3>`;

                let daysPredictions = daysMap[key];
                // Pt fiecare element (predictie) dintr-o zi extragem datele necesare:
                daysPredictions.forEach((element) => {
                    const {dt, main, weather} = element;
                    // Formatam ora folosind functia deja creata de noi care se numeste getHour
                    const hour = getHour(dt);
                    // Rotunjim temperaturile
                    const temperature = Math.round(main.temp);
                    const realFeel = Math.round(main.feels_like);
                    // Ne extragem descrierea - o luam de pe obiectul weather care ATENTIE este un array
                    const weatherDescription = weather[0].description;
                    // Ne extragem iconita pe care o formatam cu functia deja creata de noi: getWeatherIcon
                    const weatherIcon = getWeatherIcon(weather[0].icon);
                    // Afisam pe ecran (adica inseram in HTML) toate informatiile de mai sus
                    weatherForecastContainer.innerHTML += `
                        <div class="weather-forecast-box w-100 d-flex justify-content-between align-items-center border rounded p-3 mb-3">
                            <div>${hour}</div>
                            <div><img src="${weatherIcon}" alt="weather icon"></div>
                            <div class="fs-3"><strong>${temperature}°C</strong></div>
                            <div>${weatherDescription}</div>
                            <div class="real-feel">Real feel: <strong>${realFeel}°C</strong></div>
                       </div>
                    `;
                })
            }
        })
}