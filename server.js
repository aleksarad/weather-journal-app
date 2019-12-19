const projectData = {};

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

app.use(express.static('website'));

app.listen(3000, function() { 
  console.log('Server running on http://localhost:3000/'); 
});

app.post('/add', function(req, res){
   projectData.newPost = {
     date: req.body.date,
     temp: req.body.temperature,
     feelings: req.body.feelings,
   }
   console.log(projectData);
});

app.get('/g', function (req, res){
	res.send(projectData);
});