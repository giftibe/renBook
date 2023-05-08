const express = require('express');
require('dotenv').config()
const cors = require('cors');
const database = require('./src/database/mongo.database')

const app = express();
const PORT = process.env.PORT
app.use(cors());





app.listen(PORT, () => {
    console.log('Server running :)');
    database()

})
