//Object that stores all entry data
const projectData = {};

//Setting up express and middleware
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

//Initializing main project folder
app.use(express.static('website'));

//Server setup
app.listen(3000, () => { 
  console.log('Server running on http://localhost:3000/'); 
});

//Post route
app.post('/add', (req, res) => {
   projectData.newPost = {
     date: req.body.date,
     temp: req.body.temperature,
     feelings: req.body.feelings,
   }
//can be removed, used to test if API data + inputs are being correcly added to projectData
   console.log(projectData);
});

//Get route
app.get('/all', (req, res) =>{
	res.send(projectData);
});