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
    let rank = document.querySelector('#rank')
    let bodyObj = {
        title: title.value,
        body: body.value,
        rank : rank.value
    }
    createNotes(bodyObj)
    title.value = ''
    body.value = ''
    rank,value = ''
}

function createStickyNote(note){
    const stickyNote = document.createElement('div')
    stickyNote.classList.add('sticky-note')
    stickyNote.innerHTML= 
    `<p class= "title"> ${note.title}</p>
    <p class= "body">${note.body}</p>
    <div class="btns-container">
    <button onclick= "updateNotes(${note.id}, 'minus')">-</button>
    <p class= "importanceRank">${note.rank}</p>
    <button onclick= "updateNotes(${note.id}, 'plus')">+</button>
    </div>
    <button onclick ="deleteHouse(${note.id})">Delete Note</button>
    `
    notesContainer.appendChild(stickyNote)
}

function displayNotes(x){
    notesContainer.innerHTML = ``
    for(let i = 0; i < x.length; i++){
        createStickyNote(x[i])
    }
}

form.addEventListener('submit', submitHandler)

getAllNotes()