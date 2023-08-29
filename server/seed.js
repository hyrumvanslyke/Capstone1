const db = require('./database')

const seed = () =>{
    db.query(`
        CREATE TABLE notes(
            id SERIAL PRIMARY KEY,
            title VARCHAR(30) NOT NULL,
            body VARCHAR(400) NOT NULL,
            ranking INTEGER NOT NULL
        );
    `)
    .then(() =>{
        console.log('seeded 😁')
    })
}

module.exports = seed