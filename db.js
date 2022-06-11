const { MongoClient } = require('mongodb')
const dotenv = require('dotenv')

// loading all values defined in .env
dotenv.config()

const client = new MongoClient(process.env.CONNECTIONSTRING)

const startConnection = async () => {
    await client.connect()
    module.exports = client.db()
    const app = require('./app')
    app.listen(process.env.PORT)
}

startConnection()