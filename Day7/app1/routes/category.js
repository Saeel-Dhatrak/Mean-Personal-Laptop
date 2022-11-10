const { response } = require('express')
const express = require('express')

const router = express.Router()


router.get('/', (request, response) => {
    console.log('GET / category')
    response.send('inside GET category')
})

module.exports = router