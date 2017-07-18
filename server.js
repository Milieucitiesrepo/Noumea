const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080; // default port 8080
const path = require('path');
const bodyParser = require('body-parser')
const json = require('./public/donations.json');

app.use(express.static(path.join(__dirname, '/public')));

app.get('/', (req, res) => {
	res.render('index.html');
});

app.get('/donations.json', (req, res) => {
	res.json(json);
});

app.listen(PORT);
console.log(`App listening on localhost:${PORT}!`);