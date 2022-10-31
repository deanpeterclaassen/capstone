const path = require('path')
require('dotenv').config()
const {DATA_BASE_URL} = process.env
const Sequelize = require('sequelize')
const sequelize = new Sequelize(DATA_BASE_URL, {
    dialect: 'postgres', 
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
})
module.exports={
    getHTML: (req,res)=>{
        res.sendFile(path.join(__dirname, '../public/index.html'))

    },
    addDay: (req,res)=>{
        const {name,date,weather,location1,distance,duration} = req.body
        sequelize.query(`insert into day (name,date,weather,location,distance,duration)
        values ('${name}','${date}','${weather}','${location1}',${distance},${duration})
        returning *;`)
            .then(dbRes => res.status(200).send(dbRes[0]))
            .catch(err => console.log(err))

    },
    getDays: (req,res)=>{
        sequelize.query   (`select * from day;`)
        .then(dbRes => res.status(200).send(dbRes[0]))
        .catch(err => console.log(err))
    },
    getSpecificDay: (req,res)=>{
        sequelize.query(`select * from day order by day_id DESC limit 1`)
        .then(dbRes => res.status(200).send(dbRes[0]))
        .catch(err => console.log(err))
    },
    getDayId: (req, res)=>{
        const {name,date}= req.body
        let day_id = sequelize.query(`select day_id from day
        where name = '${name}' AND date = '${date}'; `)
        .send(day_id)
    },
    addSpecies: (req,res)=>{
        const {species, quantity,day_id} = req.body

        sequelize.query(`insert into species (species,quantity,day_id)
        values ('${species}',${quantity},${day_id})
        returning *;`)
        .then(dbRes => res.status(200).send(dbRes[0]))
        .catch(err => console.log(err))

    },

    getDaySpecies: (req,res)=>{

        sequelize.query(`select species,quantity from
        species
        join day
        on species.day_id = day.day_id; `)
        .then(dbRes => res.status(200).send(dbRes[0]))
        .catch(err => console.log(err))
    }

    }
