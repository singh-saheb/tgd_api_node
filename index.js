const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const {pool} = require('./config')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())

const getProducts = (request, response) => {
  pool.query('SELECT * FROM products', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}


app
  .route('/products')
  // GET endpoint
  .get(getProducts)


  app.post('/addProduct',function (request, response)  {

    console.log(request.body.description)
    //const {name, description,category,price,image} = request.body
  
    pool.query(
      'INSERT INTO products(name,description,category,price,image) VALUES($1,$2,$3,$4,$5)',
      [request.body.name, request.body.description,request.body.category,request.body.price,request.body.image],
      (error) => {
        if (error) {
          throw error
        }
        response.status(201).json({status: 'success', message: 'Product added.'})
      },
    )
  });


  app.post('/demo',function(request,response){
    console.log(request.body)
    response.status(200).send("This Post works")
  })

// Start server
app.listen(process.env.PORT || 3002, () => {
  console.log(`Server listening`)
})