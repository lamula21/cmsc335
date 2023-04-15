const express = require('express')
const http = require('http')


const app = express()


function main() {


    const PORT = 5000
    app.listen(PORT, () => console.log(`Server working: http://localhost:${PORT}`));
}