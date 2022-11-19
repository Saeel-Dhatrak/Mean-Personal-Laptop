const express = require('express')
const utils = require('../../utils')
const config = require('../../config')
const db = require('../../db')
const crypto = require('crypto-js') 
const mailer = require('../../mailer')


const router = express.Router()



// ----------------------------------------------------------
//                            GET                            
// ----------------------------------------------------------




// ----------------------------------------------------------
//                            POST                            
// ----------------------------------------------------------

router.post('/signup', (request, response) => {
    const {firstName, lastName, email, password} = request.body
    const encryptedPassword = crypto.SHA256(password, config.secret)
    const statement = `insert into user (firstName, lastName, email, password) values '${firstName}', '${lastName}', '${email}', '${encryptedPassword}'`
    db.query(statement, (error, data) => {
        mailer.sendEmail(email, 'Welcome to MyStore', '<h1>Welcome</h1>',(error, info) => {
                console.log(error)
                console.log(info)
                response.send(utils.createResult(error, data))
        })       
    })
})


// ----------------------------------------------------------
//                            PUT                            
// ----------------------------------------------------------





// ----------------------------------------------------------
//                            DELETE                            
// ----------------------------------------------------------

module.exports = router