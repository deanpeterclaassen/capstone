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
            name varchar(100), 
            date varchar(50), 
            weather varchar(50), 
            location varchar(50),
            distance float,
            duration float
        );
        create table species (
            species_id serial primary key,
            day_id integer references day(day_id),
            species varchar(50),
            quantity integer
        );

        `)
        .then(() => {
            console.log('seeded')
            res.sendStatus(200)
        }).catch(err => console.log('error when seeding', err))}
     }