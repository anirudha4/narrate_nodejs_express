const closeModal = document.querySelector('#close')
const modal = document.querySelector('.modal')
const info = document.querySelector('#info')
closeModal.addEventListener('click', e => {
    modal.style.display = 'none'
})
info.addEventListener('click', e => {
    modal.style.display = 'flex'
})

const mardown = document.querySelector('#markdown')

const preview = document.querySelector('.preview')

mardown.addEventListener('keyup', e => {
    preview.innerHTML = marked(e.target.value)
})

const author = document.querySelector('#author')
author.addEventListener('change', async e => {
    try{
        const data = await axios.post('http://localhost:8000/checkauthor/', {authorName : e.target.value})
        console.log(data.data.allow);
        if(data.data.allow){
            author.classList.add('ok')
            author.classList.remove('notok')
            document.querySelector('button[type="submit"]').classList.remove('disabled')
        }
        else{
            author.classList.add('notok')
            author.classList.remove('ok')
            document.querySelector('button[type="submit"]').classList.add('disabled')
        }
    }
    catch(err){
        console.log(err);
    }
})