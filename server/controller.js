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
            body : body,
            rank : rank
        }
        notes.push(newNote)
        noteID++
        res.status(200).send(notes)
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