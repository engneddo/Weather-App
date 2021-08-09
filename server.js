// Setup empty JS object to act as endpoint for all routes
let projectData = {};
// Require Express to run server and routes
const express = require("express");
// Start up an instance of app
const myApp = express();
/* Dependencies */
const bodyParser = require('body-parser');
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
myApp.use(bodyParser.urlencoded({ extended: false }));
myApp.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
myApp.use(cors());
// Initialize the main project folder
myApp.use(express.static("website"));

// Setup Server
const port = 3030;
const myServer = myApp.listen(port, running)
function running(){
  console.log(`Weather-Journal App is running on port ${port}!`);
}

//Get data function
function getData(req, res){
  res.send(projectData);
}
myApp.get('/get', getData);
//Post data function
function postData(req, res){
  projectData = req.body;
  res.send();
}
myApp.post('/post', postData);