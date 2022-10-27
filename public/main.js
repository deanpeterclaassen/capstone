const form = document.querySelector('form')
const name = document.querySelector("#name")
const date = document.querySelector('#date')
const weather = document.querySelector('#weather')
const location1 = document.querySelector('#location1')
const duration = document.querySelector('#duration')
const distance = document.querySelector('#distance')
const daysInfo = document.querySelector('#days')

form.addEventListener('submit',(e)=>{
    e.preventDefault();

    axios.post('/day',{
        name: name.value,
        date: date.value,
        weather: weather.value,
        location: location1.value,
        distance: distance.value,
        duration: duration.value
    })
    .then(()=>{
    location.reload()})
    .catch(err => console.log('add day failed', err))

})

function getDays (){
    axios.get('/days')
    .then(res=>{
        res.data.forEach(day=>{
            const dayElement = 
        `<div id="dayCard">
            <h2>${day.name}</h2>
            <h3>${day.date}</h3>
            <h3>${day.weather}</h3>
            <h3>${day.location}</h3>
            <h3>${day.duration}</h3>
            <h3>${day.distance}</h3>
        </div>`
        daysInfo.innerHTML +=dayElement
        })
    })
    .catch(err => console.log(err))
}
getDays()