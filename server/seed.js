const db = require('./database')

const seed = () =>{
    db.query(`
        CREATE TABLE notes(
            id SERIAL PRIMARY KEY,
            title VARCHAR(30),
            body VARCHAR(400),
            ranking INTEGER
        );
    `)
    .then(() =>{
        console.log('seeded 😁')
    })
}

module.exports = seed