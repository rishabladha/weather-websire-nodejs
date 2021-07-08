

console.log('Client side javascript file is loaded!')



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')
const messageFour = document.querySelector('#message-4')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    console.log(location);
    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            console.log(location);
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = 'temperature :' + data.temp
                messageTwo.textContent = 'humidity :' + data.humidity
                messageThree.textContent = 'humidity :' + data.humidity
                messageFour.textContent = 'location :' + location
            }
        })
    })
})
