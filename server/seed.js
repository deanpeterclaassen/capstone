const Sequelize = require("sequelize");

require('dotenv').config()

const sequelize = new Sequelize(process.env.DATA_BASE_URL, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
});

module.exports = {
    seed: (req, res) => {
        sequelize.query(`
        drop table if exists day;
        drop table if exists species;


        create table day (
            day_id serial primary key, 
            name varchar(100) NOT NULL, 
            date varchar(50) NOT NULL, 
            weather varchar(50) NOT NULL, 
            location varchar(50) NOT NULL,
            distance float NOT NULL,
            duration float NOT NULL
        );
        create table species (
            species_id serial primary key ,
            day_id integer references day(day_id) NOT NULL,
            species varchar(50)NOT NULL,
            quantity integer NOT NULL
        );

        `)
        .then(() => {
            console.log('seeded')
            res.sendStatus(200)
        }).catch(err => console.log('error when seeding', err))}
     }