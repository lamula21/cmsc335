const http = require("http");
const express = require("express");   /* Accessing express module */
const app = express();  /* app is a request handler function */
const portNumber = 5005;

let message;

app.use((request, response, next) => {
   console.log("Received: " + request.url);
   message = "First middleware function\n";
   console.log(message);
   next();  /* next middleware function */
});

app.use((request, response) => {
   let secondMessage = "Second middleware function";

   console.log(secondMessage);
   message += secondMessage;
   response.end(message);
});

app.listen(portNumber);
console.log(`To access server: http://localhost:${portNumber}`);
