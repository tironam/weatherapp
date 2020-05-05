
document.getElementById('searchBtn').addEventListener('click', event => {
    event.preventDefault()
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${document.getElementById('cityName').value}&units=imperial&appid=775ad81aec4e8e43e36233ea18090329`)
       .then( r => r.json())
        .then(weather => {
            console.log(weather)
            fetch(`http://api.openweathermap.org/data/2.5/uvi?appid=775ad81aec4e8e43e36233ea18090329&lat=${weather.coord.lat}&lon=${weather.coord.lon}`)
                .then(r => r.json())
                .then(uvIndex => {
                    console.log(uvIndex)
                    let currentWeather = document.getElementById('cityToday').innerHTML = `
                        <h2 class = "cityName">${weather.name} <span>${moment().format('MMMM Do, YYYY')}</span></h2>
                        <p class = "align-left">Temperature: ${Math.floor(weather.main.temp)} °F<p>
                        <p>Humidity: ${weather.main.humidity}%</p>
                        <p>Wind Speed: ${weather.wind.speed} MPH</p>
                        <p>UV Index: <span class = "uv" >${uvIndex.value}</span></p>
                     `
                    localStorage.setItem('cityName', document.getElementById('cityName').value)
                    let newBtn = document.createElement("div") 
                    newBtn.innerHTML = `
                    <button class="btn btn-block btn-secondary">${document.getElementById('cityName').value}</button>
                    `
                    document.getElementById('searchBar').append(newBtn)
                    document.getElementById('cityName').value = ''
                    // fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${weather.coord.lat}&lon=${weather.coord.lon}&units=imperial&appid=775ad81aec4e8e43e36233ea18090329`)
                    //     .then(r => r.json())
                    //     .then(forecast => {
                    //         console.log(forecast.daily[0])
                    //         let forecastArr = forecast.daily
                    //         for (let i = 0; i <= forecastArr; i++)
                    //         console.log(forecastArr)
                })
                .catch(e => console.log(e))
        })
        .catch(e => console.log(e))
        })
    // .catch(e => console.log(e))
