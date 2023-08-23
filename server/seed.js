const db = require('./database')

const seed = () =>{
    db.query(`
        CREATE TABLE notes(
            id SERIAL PRIMARY KEY,
            title VARCHAR(30) REQUIRED,
            body VARCHAR(400) REQUIRED,
            ranking INTEGER REQUIRED
        );
    `)
    .then(() =>{
        console.log('seeded 😁')
    })
}

module.exports = seed