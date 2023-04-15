const http = require("http");
const express = require("express");   /* Accessing express module */
const portNumber = 5000;

const app = express();  /* app is a request handler function */

app.use((request, response) => {
   console.log(`Received url: ${request.url}`);
   response.end(`Request received by server (port ${portNumber}). Check node console`);
});

app.listen(portNumber);
console.log(`To access server: http://localhost:${portNumber}`);