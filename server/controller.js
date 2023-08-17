const notes = require('./db.json')
let noteID = 3
module.exports ={
    getNotes: (req, res) => {
        res.status(200).send(notes)
    },
    deleteNotes: (req, res) =>{
        let index = notes.findIndex((elem) => elem.id === +req.params.id)
        notes.splice(index, 1)
        res.status(200).send(notes)
    },
    createNotes: (req, res) =>{
        const {title, body} = req.body
        let newNote ={
            id : noteID,
            title : title,
            body : body
        }
        notes.push(newNote)
        noteID++
        res.status(200).send(notes)
    }
}