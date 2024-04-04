const corsOptions = {
  origin: 'http://localhost:5',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}

module.exports = corsOptions
