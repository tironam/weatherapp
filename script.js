fetch('https://api.openweathermap.org/data/2.5/weather?q=los angeles&appid=775ad81aec4e8e43e36233ea18090329')
    .then(r => r.json())
    .then(weather => {
        console.log(weather)
        let currentWeather = document.getElementById('cityToday').innerHTML = `
        <h2 class = "cityName">${weather.name} <span>${moment().format('MMMM Do, YYYY')}</span><h2>

        `
    })