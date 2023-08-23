const db = require('./database')
let noteID = 3
module.exports ={
    getNotes: (req, res) => {
        db.query(`
        SELECT * FROM notes
        ORDER BY rank ASC;
        `)
    },
    deleteNotes: (req, res) =>{
       let {id} = req.params
       db.query(`
       DELETE FROM notes WHERE id = ${id};
       SELECT * FROM notes
       `)
       .then((dbRes) =>{
        res.status(200).send(dbRes[0])
       })
    },
    createNotes: (req, res) =>{
        const {title, body,rank} = req.body
        db.query(`
        INSERT INTO notes(title, body, rank)
        VALUES(
            '${title}',
            '${body}',
            '${rank}',
        )
        RETURNING *
        `)
        .then((dbRes) =>{
            res.status(200).send(dbRes[0])
        })
    },
    updateNotes: (req, res) =>{
        const {type} = req.body
        let index = notes.findIndex((elem) => elem.id === +req.params.id)
        if(type === 'minus'){
            notes[index].rank -= 1
            res.status(200).send(notes)
        }else if(type === 'plus'){
            notes[index].rank += 1
            res.status(200).send(notes)
        }else{
            res.status(400).send("Can't calculate")
        }
    }
}