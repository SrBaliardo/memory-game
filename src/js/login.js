const inputName = document.querySelector('.login-input')
const btnSubmit = document.querySelector('.login-btn-submit')

const form = document.querySelector('.login-form')

const validateInput = ({target}) => {
    if(target.value.length > 2) {
        btnSubmit.removeAttribute('disabled')
    } else {
        btnSubmit.setAttribute('disabled', '')
    }
}

const handleSubmit = (event) => {
    event.preventDefault()

    localStorage.setItem('player', inputName.value)
    window.location = 'src/pages/game.html'
}

inputName.addEventListener('input', validateInput)
form.addEventListener('submit', handleSubmit)