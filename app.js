require('dotenv').config()
require('express-async-errors')

const express = require('express')
const cors = require('cors')
const app = express()

const connectDB = require('./db/connect')
const productsRouter = require('./routes/products')

const notFoundMiddleware = require('./middleware/not-found')
const errorMiddleware = require('./middleware/error-handler')

const corsOptions = require('./middleware/corsConfig')

// middleware
app.use(express.json())

// Enable CORS using imported configuration
app.use(cors(corsOptions))

// routes
app.get('/', (req, res) => {
  res.send('<h1>Products API</h1><a href="/api/v1/products">Products route</a>')
})

app.use('/api/v1/products', productsRouter)

// products routes
app.use(notFoundMiddleware)
app.use(errorMiddleware)

const port = process.env.PORT || 5000

const start = async () => {
  try {
    // connectDB
    await connectDB(process.env.MONGO_URI)

    app.listen(port, () => {
      console.log(`Server is listening on Port ${port}...`)
    })
  } catch (error) {
    console.log(error)
  }
}

start()
