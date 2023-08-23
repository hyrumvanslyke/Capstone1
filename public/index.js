console.log('connected')
const note = document.getElementById('notes-container')

const getNotes = () =>{
    axios.get('http://localhost:5050/api/getNotes')
    .then((res) =>{
        console.log(res.data)
        res.data.forEach(createNote)
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
        res.data.forEach(createNote)
    })
    .catch((err) =>{
        console.log(err)
    })
}

const createNote = (note) =>{
    let holder = document.createElement('div')
    holder.classList += 'note-card'

    let title = document.createElement('h3')
    title.textContent = note.title

    let body = document.createElement('p')
    body.textContent = note.body

    let deleteBtn = document.createElement('button')
    deleteBtn.classList += 'delete-Btn'

    let plusBtn = document.createElement('button')
    plusBtn.classList += 'plus-Btn'

    let minusBtn = document.createElement('button')
    plusBtn.classList += 'minus-Btn'

    let remove = document.createElement('button')



}