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
      getNotes()
    })
    .catch((err) =>{
        console.log(err)
    })

}
const formSubmit = document.getElementById('create-new-note')
formSubmit.addEventListener('submit', createNote)

function plus(id, element) {
    let current = +element.textContent
    current += 1
    element.textContent = current
}
function minus(id, element){
    let current = element.textContent
    current -= 1
    element.textContent = current
}

const displayNote = (note) =>{
    let content = document.getElementById('notes-container')
    let imgs = [
        './sticky_note_pngs/blue_sticky.png',
        './sticky_note_pngs/green_sticky.png',
        './sticky_note_pngs/pink_sticky.png',
        './sticky_note_pngs/yellow_sticky.png'
    ]
    let stickyNote = imgs[Math.floor(Math.random()*imgs.length)]
    let holder = document.createElement('div')
    holder.classList += 'note'
    holder.innerHTML = `<img src="${stickyNote}">`
    let title = document.createElement('h3')
    title.textContent = note.title

    let importHolder = document.createElement('section')
    importHolder.classList += 'import-holder'
    
    let ranking = document.createElement('p')
    ranking.classList += 'importance-rank'
    ranking.textContent += `${note.ranking}`

    let minBtn = document.createElement('button')
    minBtn.textContent += '-'
    minBtn.addEventListener('click', () => minus(note.id, ranking))

    let plusBtn = document.createElement('button')
    plusBtn.textContent += '+'
    plusBtn.addEventListener('click', () => plus(note.id, ranking))
   
    importHolder.appendChild(minBtn)
    importHolder.appendChild(ranking)
    importHolder.appendChild(plusBtn)

    let body = document.createElement('p')
    body.textContent = note.body

    let deleteBtn = document.createElement('button')
    deleteBtn.classList += 'Delete'
    deleteBtn.textContent += '🚮'
    deleteBtn.addEventListener('click', () => deleteNote(note.id))

   holder.appendChild(title)
   holder.appendChild(body)
   holder.appendChild(importHolder)
   holder.appendChild(deleteBtn)
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