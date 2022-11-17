const express = require('express')
const utils = require('../../utils')
const db = require('../../db')
const config = require('../../config')
const crypto = require('crypto-js')
const jwt = require('jsonwebtoken')
//const { application } = require('express')

const router = express.Router()
// --------------------------------------------------------
//--------------GET ROUTES STARTED-------------------------
// --------------------------------------------------------
 
/*router.get('/profile', (request, response) => {
    //console.log('secret = ' + config.secret)
    //const token = request.headers['token']
    //const data = jwt.verify(token, config.secret)
    const statement = `select firstName, lastName, email, phone, address, city, zip, country from user where id = '${request.userId}';`
    db.query(statement, (error, users) =>{
        if(error){
            response.send({status: 'error', error: 'error'})
        }
        else{
            if(users.length == 0){
                response.send({status: 'error', error: 'user does not exist'})
            }else{
                const user = users[0]
                response.send(utils.createResult(error, user))
            }
        }
    })
})*/



/**
 * @swagger
 * 
 * /admin/profile:
 *    get:
 *      description: For getting  administrator
 *      produces:
 *        - application/json
 *      parameters:
 *      responses:
 *         200:
 *           description: successful message
*/
router.get('/admin', (request, response) => {
    const statement = `select firstName, lastName, email, phone from admin where id = '${request.userId}';`
    db.query(statement, (error, admins) => {
        if(error){
            response.send({ status: 'error', error: error })
        }else{
            if(admins.length == 0){
                response.send({ status: 'error', error: error })
            }else{
                const admin = admins[0]
                response.send(utils.createResult(error, admin))
            }
        }
    })
})


// --------------------------------------------------------
//--------------POST ROUTES STARTED------------------------
// --------------------------------------------------------

/*router.post('/signup', (request, response) => {
    const {firstName, lastName, email, password} = request.body
    const encryptedPassword = crypto.SHA256(password)
    const statement = `insert into user (firstName, lastName, email, password) values ('${firstName}', '${lastName}', '${email}', '${encryptedPassword}');`
    db.query(statement, (error, data) => {
        response.send(utils.createResult(error, data))
    })
}) */


/**
 * @swagger
 * 
 * /admin/signup:
 *    post:
 *      description: For signing up an administrator
 *      produces:
 *        - application/json
 *      parameters:
 *        - name: firstName
 *          description: first name of admin user
 *          in: formData
 *          required: true
 *          type: string
 *        - name: lastName
 *          description: last name of admin user
 *          in: formData
 *          required: true
 *          type: string
 *        - name: email
 *          description: email of admin user
 *          in: formData
 *          required: true
 *          type: string
 *        - name: password
 *          description: password of admin user
 *          in: formData
 *          required: true
 *          type: string
 *      responses:
 *         200:
 *           description: successful message
*/

router.post('/signup', (request, response) => {
    const {firstName, lastName, email, password} = request.body
    const encryptedPassword = crypto.SHA256(password)
    const statement = `insert into admin (firstName, lastName, email, password) values ('${firstName}', '${lastName}', '${email}', '${encryptedPassword}');`
    db.query(statement, (error, data) => {
        response.send(utils.createResult(error, data))
    })
})



/* router.post('/signin', (request, response) => {
   const {email, password} = request.body
   const encryptedPassword = crypto.SHA256(password)
   const statement = `select id, firstName, lastName from user where email = '${email}' and password = '${encryptedPassword}';`
   db.query(statement, (error, users) =>{
    if(error){
        response.send({status: 'error', error: 'error'})
    }
    else{
        if(users.length == 0){
            response.send({status: 'error', error: 'user does not exist'})
        }else{
            const user = users[0]
            const token = jwt.sign({id: user['id']}, config.secret)
            response.send(utils.createResult(error, {
                firstName: user['firstName'],
                lastname: user['lastName'],
                token: token
            }))
        }
    }
   })
}) */



/**
 * @swagger
 * 
 * /admin/signin:
 *    post:
 *      description: For signing in an administrator
 *      produces:
 *        - application/json
 *      parameters:
 *        - name: email
 *          description: email of admin user
 *          in: formData
 *          required: true
 *          type: string
 *        - name: password
 *          description: password of admin user
 *          in: formData
 *          required: true
 *          type: string
 *      responses:
 *         200:
 *           description: successful message
*/
router.post('/signin', (request, response) => {
    const {email, password} = request.body
    const encryptedPassword = crypto.SHA256(password)
    const statement = `select id, firstName, lastName from admin where email = '${email}' and password = '${encryptedPassword}';`
    db.query(statement, (error, admins) =>{
     if(error){
         response.send({status: 'error', error: error})
     }
     else{
         if(admins.length == 0){
             response.send({status: 'error', error: 'admin does not exist'})
         }else{
             const admin = admins[0]
             const token = jwt.sign({id: admin['id']}, config.secret)
             response.send(utils.createResult(error, {
                 firstName: admin['firstName'],
                 lastname: admin['lastName'],
                 token: token
             }))
         }
     }
    })
 })


// --------------------------------------------------------
// -------------PUT ROUTES STARTED-------------------------
// --------------------------------------------------------
router.put('/', (request, response) => {
    response.send()
})


// --------------------------------------------------------
// -------------DELETE ROUTES STARTED----------------------
// --------------------------------------------------------
router.delete('/', (request, response) => {
    response.send()
})


// --------------------------------------------------------
// -----------ALL ROUTES ENDED-----------------------------
// --------------------------------------------------------
module.exports = router