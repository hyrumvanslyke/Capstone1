const express = require('express')
const cors = require('cors')
const db = require('./database')
const seed = require('./seed')


const app = express()
app.use(express.json())
app.use(cors())
const controller = require('./controller')
const {getNotes, deleteNotes, createNotes, updateNotes} = controller
app.get('/api/notes', getNotes)
app.delete('/api/notes/:id', deleteNotes)
app.post('/api/notes', createNotes)
app.put('/api/notes/:id',updateNotes)
// need to figure out my api id stuff

app.listen(5050, () => console.log('Server is up and running on port 5050'))