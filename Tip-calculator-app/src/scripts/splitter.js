const form = document.querySelector('#splitter-form')
const inputs = form.querySelectorAll('input')
const percentButtons = form.querySelectorAll('button')
const customTipPercentElement = document.querySelector('#custom-tip-percent')
const tipAmountPerPersonElement = document.querySelector('#tip-per-person')
const totalAmountPerPersonElement = document.querySelector('#total-per-person')
const PERCENT_DENOMINATOR = 100
let selectedTipPercent = 0

const setTipPercent = (value) => {
  if (isNaN(value)) {
    selectedTipPercent = 0
  } else {
    selectedTipPercent = value
  }
}

const formatCurrency = (value) => {
  return `$ ${value.toFixed(2)}`
}

const handleButtonClick = (e) => {
  // Remove 'selected' class from every button
  percentButtons.forEach((button) => button.classList.remove('selected'))

  // Add selected class to button that was clicked
  e.target.classList.add('selected')

  // Set tip percent
  setTipPercent(parseFloat(e.target.value))
  calculateValuesPerPerson()
}

const calculateValuesPerPerson = () => {
  const billValue = parseFloat(document.querySelector('#bill').value)
  const numberOfPeople = parseInt(
    document.querySelector('#number-of-people').value,
    10
  )

  if (billValue > 0 && numberOfPeople > 0 && selectedTipPercent > 0) {
    const tipAmountPerPerson =
      (billValue * selectedTipPercent) / PERCENT_DENOMINATOR / numberOfPeople
    tipAmountPerPersonElement.innerText = formatCurrency(tipAmountPerPerson)

    const totalValuePerPerson = billValue / numberOfPeople + tipAmountPerPerson
    totalAmountPerPersonElement.innerText = formatCurrency(totalValuePerPerson)
  }
}

customTipPercentElement.addEventListener('input', (e) => {
  // Usuń klasę 'selected' z każdego przycisku, jeśli niestandardowy procent napiwku jest wprowadzany
  percentButtons.forEach((button) => button.classList.remove('selected'))

  setTipPercent(parseFloat(e.target.value))
  calculateValuesPerPerson()
})

inputs.forEach((input) => {
  input.addEventListener('input', calculateValuesPerPerson)
})

percentButtons.forEach((button) => {
  button.addEventListener('click', handleButtonClick)
})

form.addEventListener('submit', (e) => e.preventDefault())
