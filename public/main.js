

const dayform = document.querySelector('#dayForm')
const name = document.querySelector("#name")
const date = document.querySelector('#date')
const weather = document.querySelector('#weather')
const location1 = document.querySelector('#location1')
const duration = document.querySelector('#duration')
const distance = document.querySelector('#distance')
const daysInfo = document.querySelector('#days')
const add = document.querySelector('#add')
const spForm = document.querySelector('#spForm')
// const allSpecies =document.querySelector('#allSpecies')
const dayCard = document.querySelector('#dayCard')
const species1 = document.querySelector('#species')
const quantity1 = document.querySelector('#quantity')
const day_id = document.querySelector('#day_id')
const allDays = document.querySelector('#allDays')
const allSpecies = document.querySelector('#allSpecies')
// const name1 =document.querySelector("#name").value
// const date1 = document.querySelector("#name").value
// function getDayId(){
//     axios.get('/day_id',{

//     })
// }

dayform.addEventListener('submit',(e)=>{
    daysInfo.setAttribute('class','daysShow')
    getSpecificDay()
    e.preventDefault();
    
    axios.post('/day',{
        name: name.value,
        date: date.value,
        weather: weather.value,
        location1: location1.value,
        distance: distance.value,
        duration: duration.value
    })
    .then(()=>{
    dayform.reset()})
    .catch(err => console.log('add day failed', err))

})

function getSpecificDay (){
    
    axios.get('/daySp')
    .then(res=>{
        res.data.forEach(day=>{

            const dayElement = 
        `<div id="dayCard">
            <h2>Name:${day.name}    ID:${day.day_id}</h2>
            <h3>${day.date}</h3>
            <p>${day.weather}</p>, ${day.location}, ${day.duration}, ${day.distance}</p>
        </div>`
        allDays.innerHTML +=dayElement;
        })
    })
    .catch(err => console.log(err));
}

// function getDays (){
    
//     axios.get('/days')
//     .then(res=>{
//         res.data.forEach(day=>{

//             const dayElement = 
//         `<div id="dayCard">
//             <h2>${day.name}    ${day.day_id}</h2>
//             <h3>${day.date}</h3>
//             <p>${day.weather}, ${day.location}, ${day.duration}, ${day.distance}</p>
            

//         </div>`

//         allDays.innerHTML +=dayElement;
        

//         })
   

//     })

//     .catch(err => console.log(err));

// }
function getDaySpecies(){
    
    axios.get('/species')
    .then(res=>{
    res.data.forEach(species=>{
        const speciesElement =
        `<div>
        <p>${species.species}  ${species.quantity}</p>
        </div>`
        allSpecies.innerHTML +=  speciesElement

    })
})
}



spForm.addEventListener('submit', (e)=>{
    e.preventDefault();

    axios.post('/species', {
        day_id: day_id.value,
        species: species1.value,
        quantity: quantity1.value
    })
    .then(()=>{
    location.reload()})
    .catch(err => console.log('add species failed', err))
})



getSpecificDay()
