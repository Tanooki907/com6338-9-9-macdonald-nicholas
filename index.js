var display = document.getElementById('weather')
var userQuery
var weatherURL = "https://api.openweathermap.org/data/2.5/weather"
var queryString = "?units=imperial&appid=8681e15d1f719fff05e4013753695305&q=" + userQuery
var fetchURL = weatherURL + queryString
var errMessage = document.createElement('h2')
errMessage.textContent = 'Location not Found'
var form = document.querySelector('form')
var br = document.createElement('br')

form.onsubmit = function(e) {
    e.preventDefault()
    display.innerHTML = ''
    userQuery = this.search.value.trim()
    console.log(userQuery)
    if (!userQuery) return
    form.search.value = ''
    queryString = "?units=imperial&appid=8681e15d1f719fff05e4013753695305&q=" + userQuery
    fetchURL = weatherURL + queryString
    console.log(fetchURL)
    fetch(fetchURL)
    .then(function(res) {
        if (res.status !== 200){
            throw new Error('Location not Found')
        }
        return res.json()
    })
    .then(function(data) {
        console.log(data)

        var h2 = document.createElement('h2')
        h2.textContent = data.name + ', ' + data.sys.country
        display.appendChild(h2)

        lat = data.coord.lat
        long = data.coord.lon

        var a = document.createElement('a')
        a.setAttribute('href', 'https://www.google.com/maps/search/?api=1&query=' + lat + ',' + long)
        a.setAttribute('target', '_BLANK')
        a.textContent = 'Click to view map'
        display.appendChild(a)

        var img = document.createElement('img')
        img.setAttribute('src', 'https://openweathermap.org/img/wn/' + data.weather[0].icon + '@2x.png')
        display.appendChild(img)

        var desc = document.createElement('p')
        desc.textContent = data.weather[0].description
        desc.style.textTransform = 'capitalize'
        display.appendChild(desc)

        display.appendChild(br)

        var CurrentTemp = document.createElement('p')
        CurrentTemp.textContent = 'Current: ' + data.main.temp + '° F'
        display.appendChild(CurrentTemp)

        var feelsLike = document.createElement('p')
        feelsLike.textContent = 'Feels like: ' + data.main.feels_like + '° F'
        display.appendChild(feelsLike)

        display.appendChild(br)

        var dt = data.dt * 1000
        var date = new Date(dt)
        var timeString = date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit'
        })
        var update = document.createElement('p')
        update.textContent = 'Last Updated: ' + timeString
        display.appendChild(update)
    })
    .catch(function(err) {
        display.appendChild(errMessage)
    })
}

function renderWeather() {
    var h2 = document.createElement('h2')
    h2.textContent = data.name + ', ' + data.sys.country
    display.appendChild(h2)
}