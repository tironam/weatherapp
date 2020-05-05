fetch('https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={775ad81aec4e8e43e36233ea18090329}')
    .then(r => r.json())
    .then(weather => {
        console.log(weather)
    })