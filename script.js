let cities = JSON.parse(localStorage.getItem('cities')) || []

// loops through my cities array
for (let i = 0; i < cities.length; i++) {
    let newBtn = document.createElement("div")
    newBtn.innerHTML = `
        <button id="savedBtn" class="btn btn-block btn-secondary">${cities[i]}</button>
        `
        // Appends new button and clears out the input field
        document.getElementById('searchBar').append(newBtn)
        document.getElementById('cityName').value = ''
}

document.getElementById('searchBtn').addEventListener('click', event => {
    event.preventDefault()
    // This api grabs the current weather
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${document.getElementById('cityName').value}&units=imperial&appid=775ad81aec4e8e43e36233ea18090329`)
       .then( r => r.json())
        .then(weather => {
            console.log(weather)
            // this api grabs the five day forecast
            fetch(`https://api.openweathermap.org/data/2.5/uvi?appid=775ad81aec4e8e43e36233ea18090329&lat=${weather.coord.lat}&lon=${weather.coord.lon}`)
                .then(r => r.json())
                .then(uvIndex => {
                    console.log(uvIndex)
                    // Code to retrieve the current weather
                    let currentWeather = document.getElementById('cityToday').innerHTML = `
                        <h2 class = "cityName">${weather.name} <span>(${moment().format('MMMM Do, YYYY')})</span><span> <img src=https://openweathermap.org/img/w/${weather.weather[0].icon}.png></span></h2>
                        <p class = "align-left">Temperature: ${Math.floor(weather.main.temp)}°F<p>
                        <p>Humidity: ${weather.main.humidity}%</p>
                        <p>Wind Speed: ${weather.wind.speed} MPH</p>
                        <p>UV Index: <span class = "uv" ><button id="uv" type="button" class="btn btn-success">${uvIndex.value}</button></span></p>
                     `
                    //  Tried getting the color of the UV index to change with the number
                     if (uvIndex.value <= 5) {
                        document.getElementById('uv').classList.remove('btn-success')
                     } 
                    // Creates a button from the value of the search bar
                    let newBtn = document.createElement("div") 
                    newBtn.innerHTML = `
                    <button id="savedBtn" class="btn btn-block btn-secondary">${document.getElementById('cityName').value}</button>
                    `
                    // Converts the city name to string for local storage
                    cities.push(document.getElementById('cityName').value)
                    localStorage.setItem('cities', JSON.stringify(cities))
                    // Appends new button and clears out the input field
                    document.getElementById('searchBar').append(newBtn)
                    document.getElementById('cityName').value = ''

                    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${weather.coord.lat}&lon=${weather.coord.lon}&units=imperial&appid=775ad81aec4e8e43e36233ea18090329`)
                        .then(r => r.json())
                        .then(forecast => {
                            console.log(forecast)
                            // The div elements for the five day forecasts. Tried to do a for loop for these, but it proved to be difficult.
                            document.getElementById('cityDay1').innerHTML = `
                            <div class="card text-white bg-primary mb-3" style="max-width: 18rem;">
                                <div class="card-body">
                                <p><img src=https://openweathermap.org/img/w/${forecast.daily[1].weather[0].icon}.png></p>
                                    <p class="card-title">Temp: ${Math.floor(forecast.daily[1].temp.day)}°F</p>
                                    <p class="card-text">Humidity: ${forecast.daily[1].humidity}%</p>
                                </div>
                            </div>
                            `
                            document.getElementById('cityDay2').innerHTML = `
                            <div class="card text-white bg-primary mb-3" style="max-width: 18rem;">
                                <div class="card-body">
                                    <p><img src=https://openweathermap.org/img/w/${forecast.daily[2].weather[0].icon}.png></p>
                                    <p class="card-title">Temp: ${Math.floor(forecast.daily[2].temp.day)}°F</p>
                                    <p class="card-text">Humidity: ${forecast.daily[2].humidity}%</p>
                                </div>
                            </div>
                            `
                            document.getElementById('cityDay3').innerHTML = `
                            <div class="card text-white bg-primary mb-3" style="max-width: 18rem;">
                                <div class="card-body">
                                    <p><img src=https://openweathermap.org/img/w/${forecast.daily[3].weather[0].icon}.png></p>
                                    <p class="card-title">Temp: ${Math.floor(forecast.daily[3].temp.day)}°F</p>
                                    <p class="card-text">Humidity: ${forecast.daily[3].humidity}%</p>
                                </div>
                            </div>
                            `
                            document.getElementById('cityDay4').innerHTML = `
                            <div class="card text-white bg-primary mb-3" style="max-width: 18rem;">
                                <div class="card-body">
                                    <p><img src=https://openweathermap.org/img/w/${forecast.daily[4].weather[0].icon}.png></p>
                                    <p class="card-title">Temp: ${Math.floor(forecast.daily[4].temp.day)}°F</p>
                                    <p class="card-text">Humidity: ${forecast.daily[4].humidity}%</p>
                                </div>
                            </div>
                            `
                            document.getElementById('cityDay5').innerHTML = `
                            <div class="card text-white bg-primary mb-3" style="max-width: 18rem;">
                                <div class="card-body">
                                    <p><img src=https://openweathermap.org/img/w/${forecast.daily[5].weather[0].icon}.png></p>
                                    <p class="card-title">Temp: ${Math.floor(forecast.daily[5].temp.day)}°F</p>
                                    <p class="card-text">Humidity: ${forecast.daily[5].humidity}%</p>
                                </div>
                            </div>
                            `
                })
                .catch(e => console.log(e))
        })
        .catch(e => console.log(e))
        })
    .catch(e => console.log(e))
    })

// Trying to turn the new button I append into one that will populate its city's info in the container on the right, but so far no luck
// document.getElementById('savedBtn').addEventListener('click', (event) => {
//     event.preventDefault()
//     document.getElementById('cityName').innerText = `
//     ${document.getElementById('savedBtn').value}
//     `
// })