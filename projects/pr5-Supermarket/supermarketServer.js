// importing modules
const express = require('express')

const path = require('path')
const fs = require('fs');
const bodyParser = require('body-parser')

// use app
const app = express()

// Active reading user input from Forms
app.use(express.urlencoded({extended:true}))


// Specify the template engine to our app
app.set("view engine", "ejs") // set extension ejs
app.set("views", path.resolve(__dirname, "templates")) // set the directory location of the templates

// ------------------ CLASS ------------------
class Json {
    #filename
    constructor(filename) {
      this.#filename = filename;
    }
  
    getJSON() {
        return new Promise((resolve, reject) => {
            fs.readFile(this.#filename, (err, data) => {
                if (err) {
                    reject(err);
                }
                resolve(JSON.parse(data)['itemsList']);
            });
        });
    }
}


// ------------------ USER INTERFACE ------------------
const prompt = "Type itemsList or stop to shutdown the server:"
let dataInput = "";
process.stdin.setEncoding("utf8");

// Handle when user input is not correct
if (process.argv.length != 3) {
    console.error(`Usage supermarketServer.js jsonFile`);
    process.exit(1);
}

const listChoice = process.argv[2]
if(listChoice !== "itemsList.json" && listChoice !=="itemsListTwo.json") {
    console.error(`Error: There is no item list called ${listChoice} in our system`)
    process.exit(1);
}

// ------------------ EXPRESS ------------------
// This endpoint renders the main page of the application and it will display the contents of the index.ejs template file.
app.get("/", (req,res) => {
    res.render("index");
})

// This endpoint displays the displayItems.ejs template with the table of items available.
app.get("/catalog", async (request, response) => { 
    // Create a table with the info in js (itemsTable), pass variable to placeOrder.js
    let itemsTable = `<table border="1"> 
                        <theader> 
                            <tr><th>Item</th> <th>Cost</th>
                        </theader>
                        <tbody>`
    const jsonFile = new Json(listChoice);
    
    let myJSON = await jsonFile.getJSON();
    myJSON.forEach(element => {
        // save elements.name and element.cost in the table
        itemsTable += `<tr><td>${element.name}</td><td>${element.cost}</td></tr>`
    });
    // Close table
    itemsTable += `</tbody></table>`

    response.render("displayItems", { itemsTable })
}); 

// This endpoint displays the placeOrder.ejs template with the table of items available.
app.get("/order", async (request, response) => { 
    /* You implement */ 
    // Create a table with the info in js (items), pass variable to placeOrder.js
    // <option value="option1">Option 1</option>
    
    let items = ``
    const jsonFile = new Json(listChoice);
    
    let myJSON = await jsonFile.getJSON();
    myJSON.forEach(element => {
        // save elements.name 
        items += `<option value="${element.name}">${element.name}</option>`
    });

    response.render("placeOrder", { items })
}); 


// This endpoint will process the submission of the placeOrder form, retrieving the order values and processing the order. Processing an order requires displaying the orderConfirmation.ejs template with a table that includes the items to be purchased, along with their cost. The last table row has the sum of all the items in the order.
app.post("/order", async (request, response) => {

    let totalCost = 0;
    let { name, email, delivery, itemsSelected} = request.body;

    if (name === undefined) {name = ''}

    if( email === undefined) { email = ''}

    if (delivery === undefined) {delivery = ''}

    let itemsTable = `<table border="1"> 
                    <theader> 
                        <tr><th>Item</th> <th>Cost</th>
                    </theader>
                    <tbody>`

    const jsonFile = new Json(listChoice);
    let myJSON = await jsonFile.getJSON();
    

    if (itemsSelected === undefined) {
        // DO NOTHING
    } else if (typeof itemsSelected === typeof '') {
        myJSON.forEach(element => {
            if (element.name === itemsSelected) {
                itemsTable += `<tr><td>${element.name}</td><td>${element.cost.toFixed(2)}</td></tr>`
                totalCost += element.cost
            }
        })
    } else {
        myJSON.forEach(element => {

            if (itemsSelected.find(each => each === element.name)) {
                itemsTable += `<tr><td>${element.name}</td><td>${element.cost.toFixed(2)}</td></tr>`
                totalCost += element.cost
            }
        });
    }

    totalCost = totalCost.toFixed(2);

    itemsTable += `<tr><td>Total Cost:</td><td>${totalCost}</td><tr>`;
    // Close table
    itemsTable += `</tbody></table>`;

    response.render('orderConfirmation', {name, email, delivery, orderTable: itemsTable});

}); 

const PORT = 5000
app.listen(PORT);
console.log(`Web server started and running at http://localhost:${PORT}`)



// ----------------- USER INTERFACE CONTINUE --------------------
process.stdout.write(`${prompt} `)
process.stdin.on('readable', async () => {
    dataInput = process.stdin.read()
    if (dataInput !== null) {
        let command = dataInput.trim()
        if (command === 'itemsList') {
            const jsonFile = new Json(listChoice);
            let myJSON = await jsonFile.getJSON();
            console.log(myJSON);
            process.stdout.write(`${prompt} `);
            
        } else if (command === 'stop'){
            console.log('Shutting down the server')
            process.exit(0);
        } else {
            console.error(`Invalid command: ${dataInput}`)
            process.stdout.write(`${prompt} `);
        }
        //process.stdout.write(prompt)
        process.stdin.resume();
    }
})