const db = require('./database')
let noteID = 3
module.exports ={
    getNotes: (req, res) => {
        db.query(`
        SELECT * FROM notes
        ORDER BY ranking ASC;
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
        INSERT INTO notes(title, body, ranking)
        VALUES(
            '${title}',
            '${body}',
            '${rank}'
        )
        RETURNING *
        `)
        .then((dbRes) =>{
            res.status(200).send(dbRes[0])
        })
    },
    updateNotes: (req, res) => {
        const { id } = req.params;
        const { title, body, rank } = req.body;

        db.query(`
            UPDATE notes
            SET 
                title = '${title}',
                body = '${body}',
                ranking = '${rank}'
            WHERE id = ${id}
            RETURNING *
        `)
        .then((dbRes) => {
            res.status(200).send(dbRes[0]);
        })
        .catch((err) => {
            console.error(err)
        })
    }
}
