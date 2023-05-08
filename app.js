const express = require('express');
require('dotenv').config()
const cors = require('cors');

const app = express();
const PORT = process.env.PORT
app.use(cors());




app.listen(PORT, () => {
    console.log('Server running :)');
})
console.log('hello');