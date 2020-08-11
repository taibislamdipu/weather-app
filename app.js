




// api.openweathermap.org / data / 2.5 / weather ? q = { city name } & appid={ your api key }


const weatherApi = {
    key: "2c184dd171013138d018de35731d14d4",
    baseUrl: "https://api.openweathermap.org/data/2.5/weather"
}

// Event Listener Function on keypress
const searchInputBox = document.getElementById('input-box');
searchInputBox.addEventListener('keypress', (event) => {

    if (event.keyCode == 13) { // 13 is the Enter button keyboard keycode
        console.log(searchInputBox.value);
        getWeatherReport(searchInputBox.value);
    }
})


// Get weather Report
function getWeatherReport(city) {
    fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`)
        .then(weather => {
            return weather.json();
        }).then(showWeatherReport);
}

// Show weather Report
function showWeatherReport(weather) {
    console.log(weather);

    let city = document.getElementById('city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let temperature = document.getElementById('temp');
    temperature.innerHTML = `${Math.round(weather.main.temp)},&deg;C`;

    let minMaxTemp = document.getElementById('min-max');
    minMaxTemp.innerHTML = `${Math.floor(weather.main.temp_min)}&deg;C (min)/${Math.ceil
        (weather.main.temp_max)}&deg;C (max)`;

    let weatherType = document.getElementById('weather');
    weatherType.innerText = `${weather.weather[0].main}`;

    let date = document.getElementById('date');
    let todayDate = new Date();
    date.innerText = dateManage(todayDate);

    if (weatherType.textContent == 'clear') {
        document.body.style.backgroundImage = "url('images/sunny.jpg')";
    }
    else if (weatherType.textContent == 'Clouds') {
        document.body.style.backgroundImage = "url('images/cloudy.jpg')";
    }
    else if (weatherType.textContent == 'Drizzle') {
        document.body.style.backgroundImage = "url('images/snowy.jpg')";
    }
    else if (weatherType.textContent == 'Hazy') {
        document.body.style.backgroundImage = "url('images/hazy.jpg')";
    }
    else if (weatherType.textContent == 'Rain') {
        document.body.style.backgroundImage = "url('images/rainy.jpg')";
    }
    else if (weatherType.textContent == 'Snow') {
        document.body.style.backgroundImage = "url('images/snowy.jpg')";
    }


}

// Date Manage
function dateManage(dateArg) {

    let days = ['Mondays', 'Tuesdays', 'Wednesdays', 'Thursdays', 'Fridays', 'Saturdays', 'Sundays'];

    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    let year = dateArg.getFullYear();
    let month = months[dateArg.getMonth()];
    let date = dateArg.getDate();
    let day = days[dateArg.getDay()];

    return `${date} ${month} (${day}, ${year})`

}

