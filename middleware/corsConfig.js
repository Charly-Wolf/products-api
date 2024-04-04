const corsOptions = {
  origin: process.env.FRONTEND_PORT,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}

module.exports = corsOptions
