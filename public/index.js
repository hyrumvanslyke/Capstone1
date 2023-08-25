console.log('connected')
const note = document.getElementById('notes-container')
const getNotes = () =>{
    axios
    .get('http://localhost:5050/api/getNotes')
    .then((res) =>{
        console.log(res.data)
        res.data.forEach(displayNote)
    })
    .catch((err) =>{
        console.log(err)
    })
}

const deleteNote = (id) =>{
    console.log(id)
    axios
    .delete(`http://localhost:5050/api/deleteNote/${id}`)
    .then((res) =>{
        note.innerHTML = ''
        getNotes()
    })
    .catch((err) =>{
        console.log(err)
    })
}

const createNote = (event) =>{
    event.preventDefault()
    console.log(title)
    console.log(body)
    let bodyObj = {
        title: title.value,
        body: body.value,
        rank: rank.value
    }
    axios
    .post(`http://localhost:5050/api/createNote`,bodyObj)
    .then((res) =>{
      note.innerHTML=''
      res.data.forEach(displayNote)
    })
    .catch((err) =>{
        console.log(err)
    })

}
const formSubmit = document.getElementById('create-new-note')
formSubmit.addEventListener('submit', createNote)

const displayNote = (note) =>{
    let content = document.getElementById('notes-container')

    let holder = document.createElement('div')
    holder.classList += 'note'

    let title = document.createElement('h3')
    title.textContent = note.title

    let importHolder = document.createElement('section')
    importHolder.classList += 'import-holder'
    importHolder.innerHTML =
    `<button id = "minus-btn" onclick="updateNote(${note.id}, 'minus')">-</button>
        <p class="importance-rank">${note.ranking}</p>
        <button id = "plus-btn" onclick="updateNote(${note.id}, 'plus')">+</button>`

    let body = document.createElement('p')
    body.textContent = note.body

    let deleteBtn = document.createElement('button')
    deleteBtn.classList += 'Delete'
    deleteBtn.textContent += '🚮'
    deleteBtn.addEventListener('click', () => deleteNote(note.id))

    let updateBtn = document.createElement('button')
    updateBtn.classList += 'Update'
    updateBtn.textContent += '🔁'
    updateBtn.addEventListener('click', () => updateNote(note.id))

   holder.appendChild(title)
   holder.appendChild(body)
   holder.appendChild(importHolder)
   holder.appendChild(deleteBtn)
   holder.appendChild(updateBtn)
    content.appendChild(holder)
}

const updateNote = (id, change) =>{
    axios
    .put(`http://localhost:5050/api/updateNote/${id}`, { change })
    .then((res) => {
        note.innerHTML = ''
        res.data.forEach(createNote)
    })
    .catch((err) => {
        console.log(err)
    })
}

getNotes()