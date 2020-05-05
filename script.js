fetch('https://api.openweathermap.org/data/2.5/weather?q=los angeles&units=imperial&appid=775ad81aec4e8e43e36233ea18090329')
    .then(r => r.json())
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
            })
        
    })