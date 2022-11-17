const express = require('express')
const router = express.Router()
const utils = require('../../utils')
const db = require('../../db')
const multer = require('multer')
const upload = multer({ dest: 'images/' })  // here  in the dest location will start from the root thats why we don't need ../../
/* const jwt = require('jsonwebtoken')
// const config = require('../../config')
// const crypto = require('crypto-js')*/




// --------------------------------------------------------
//--------------GET ROUTES STARTED-------------------------
// GET  
router.get('/', (request, response) => {
    const statement = `select p.id, p.title, p.description,
    c.id as categoryId, c.title as categoryTitle,
    b.id as brandId, b.title as brandTitle,
    p.price, p.image from product p
    inner join category c
    on c.id = p.category
    inner join brand b on b.id = p.category;`
    db.query(statement, (error, data) => {
        if(error){
            response.send(utils.createError(error))
        }else{
             // empty products collection
        const products = []

        for(let index = 0; index< data.length; index++){
            const tmpProduct = data[index]
            const product = {
                id: tmpProduct['id'],
                title: tmpProduct['title'],
                description: tmpProduct['description'],
                price: tmpProduct['price'],
                brand: {
                    id: tmpProduct['brandId'],
                    title: tmpProduct['brandTitle']
                },
                category: {
                    id: tmpProduct['categryId'],
                    title: tmpProduct['categoryTitle']
                }                
            }
            products.push(product)
        }

        response.send(utils.createSuccess(products))
        }
    })
})


// --------------------------------------------------------
//--------------POST ROUTES STARTED------------------------
// POST

router.post('/upload-image/:productId', upload.single('image'), (request, response) =>{
    const {productId} = request.params
    const file = request.file.filename
    const statement = `update product set image = '${file}' where id = '${productId}';`
    db.query(statement, (error, data) => {
        response.send(utils.createResult(error, data))
    })
})





router.post('/', (request, response) => {
    const { title, description, category, brand, price, image } = request.body
    const statement = `insert into product (title, description, category, brand, price, image ) values ('${title}', '${description}', '${category}', '${brand}', '${price}', '${image}');`
    db.query(statement, (error, data) => {
        response.send(utils.createResult(error, data))
    })
})


// --------------------------------------------------------
//--------------PUT ROUTES STARTED-------------------------
// PUT
router.put('/:id', (request, response) => {
    const {id} = request.params
    const {title, description, category, price, brand} = request.body
    const statement = `update product set
     title = '${title}',
     description = '${description}',
     category = '${category}',
     price = '${price}',
     brand = '${brand}'
     where id = '${id}'
    `
    db.query(statement, (error, data) => {
        response.send(utils.createResult(error, data))
    })
})


// --------------------------------------------------------
//--------------DELETE ROUTES STARTED----------------------
// DELETE
router.delete('/:id', (request, response) => {
    const {id} = request.params
    const statement = `delete from product where id = '${id}'`
    db.query(statement, (error, data) => {
        response.send(utils.createResult(error, data))
    })
})


// -------------------------------------------------
//--------------------------------------------------
module.exports = router