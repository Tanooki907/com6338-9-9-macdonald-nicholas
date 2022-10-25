const display = document.getElementById('weather')
let userQuery
const weatherURL = "https://api.openweathermap.org/data/2.5/weather"
let queryString = `?units=imperial&appid=8681e15d1f719fff05e4013753695305&q=${userQuery}`
let fetchURL = weatherURL + queryString
const errMessage = document.createElement('h2')
errMessage.textContent = 'Location not Found'
const form = document.querySelector('form')
const br = document.createElement('br')

form.onsubmit = async function(e) {
    e.preventDefault()
    display.innerHTML = ''
    userQuery = form.search.value.trim()
    console.log(userQuery)
    if (!userQuery) return
    form.search.value = ''
    queryString = `?units=imperial&appid=8681e15d1f719fff05e4013753695305&q=${userQuery}`
    fetchURL = weatherURL + queryString
    console.log(fetchURL)
    try {
    const res = await fetch(fetchURL)
    console.log(res.status)
        if (res.status !== 200) throw new Error('Location not Found')
        const data = await res.json()
        console.log(data)
        renderWeather(data)
}catch(err){
    display.appendChild(errMessage)
}
}

const renderWeather = ({
    name,
    sys: {
        country,
    },
    coord: {
        lat,
        lon
    },
    weather: {
        0: {
            icon,
            description
        }
    },
    main: {
        temp,
        feels_like
    },
    dt
}) => {
    console.log('rendering!')
    display.innerHTML = `<h2>${name}, ${country}</h2>
    <a href="https://www.google.com/maps/search/?api=1&query=${lat},${lon}"
    target="_BLANK">Click to view map</a>
    <img src="https://openweathermap.org/img/wn/${icon}@2x.png">
    <p style="text-transform: capitalize;">${description}</p><br>
    <p>Current: ${temp}</p>
    <p>Feels like: ${feels_like}</p>
    <p>Last updated: ${FindDate(dt)}`
}

const FindDate = time => {
    time = time * 1000
    const date = new Date(time)
    return time = date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit'
    })
}