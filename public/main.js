const notesContainer = document.querySelector('#notes-container')
const form = document.querySelector('form')


const notesCallback = ({data : notes}) => displayNotes(notes)
const errCallback = err => console.log(err)
const baseURL = null// need to figure out what it would be

const getAllNotes = () => axios
.get(baseURL)
.then(notesCallback)
.catch(errCallback)
const createNotes = body => axios
.post(baseURL, body)
.then(notesCallback)
.catch(errCallback)
const deleteNotes = id => axios
.delete(`${baseURL}/${id}`)
.then(notesCallback)
.catch(errCallback)
const updateNotes = (id, type) => axios
.put(`${baseURL}/${id}`, {type})
.then(notesCallback)
.catch(errCallback)

function submitHandler(e){
    e.preventDefault()
    let title = document.querySelector('#title')
    let body = document.querySelector('#body')
    let bodyObj = {
        title: title.value,
        body: body.value
    }
    createNotes(bodyObj)
    title.value = ''
    body.value = ''
}