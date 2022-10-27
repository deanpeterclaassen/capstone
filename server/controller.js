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
        sequelize.query(`select * from day;`)
        .then(dbRes => res.status(200).send(dbRes[0]))
        .catch(err => console.log(err))
    },
    addSpecies: (req,res)=>{
        const {species, quantity} = req.body
        sequelize.query(`insert into species (species, quantity)
        values ('${species}','${quantity}')
        returning *;`)
        .then(dbRes => res.status(200).send(dbRes[0]))
        .catch(err => console.log(err))

    }

    }
