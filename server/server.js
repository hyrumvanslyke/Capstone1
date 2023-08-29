const express = require('express')
const cors = require('cors')
const db = require('./database')
const seed = require('./seed')
const path = require('path')

const app = express()
app.use(express.json())
app.use(express.static(path.resolve(__dirname,"../public")))
app.use(cors())
const controller = require('./controller')
const {getNotes, deleteNote, createNote, updateNote} = controller
app.get('/api/getNotes', getNotes)
app.delete('/api/deleteNote/:id', deleteNote)
app.post('/api/createNote', createNote)
app.put('/api/updateNote/:id',updateNote)
app.post('/api/seed', seed)

app.listen(5050, () => console.log('Server is up and running on port 5050'))