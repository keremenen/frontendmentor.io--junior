const form = document.querySelector('.newsletter__form')
const newsletterCard = document.querySelector('.newsletter')
const emailInput = document.querySelector('.newsletter__input')
const errorMessage = document.querySelector('.newsletter__error-message')
const dismissBtn = document.querySelector('.success-modal__btn')
const successCard = document.querySelector('.success-modal')
const currentEmail = document.querySelector('.currentEmail')

const errorMessages = {
  empty: 'Email field cannot be empty',
  incorrectFormat: 'Valid email required',
}

const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

const toggleCards = () => {
  newsletterCard.classList.toggle('hidden')
  successCard.classList.toggle('hidden')
}

const handleSubmit = (e) => {
  e.preventDefault()

  // Clearing previous states
  form.classList.remove('error')

  // Setting the message based on input value and validation
  let message = ''

  if (!emailInput.value) {
    message = errorMessages.empty
    form.classList.add('error')
    errorMessage.textContent = message

    return
  } else if (!validateEmail(emailInput.value)) {
    message = errorMessages.incorrectFormat
    form.classList.add('error')
    errorMessage.textContent = message

    return
  }
  // Updating the error message
  currentEmail.innerHTML = emailInput.value
  toggleCards()
}

form.addEventListener('submit', handleSubmit)
dismissBtn.addEventListener('click', toggleCards)
