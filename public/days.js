const days = document.querySelector('#days')

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
        </div>

        `
        days.innerHTML +=dayElement
        })
    })
}
getDays()