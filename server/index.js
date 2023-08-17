const express = require('express')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())
const controller = require('./controller')
const {getNotes, deleteNotes, createNotes, updateNotes} = controller

app.listen(5050, () => console.log('Server is up and running on port 5050'))