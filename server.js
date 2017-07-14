const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080; // default port 8080
const path = require('path');
// const bodyParser = require('body-parser')
const json = require('./public/donations.json');

// app.set('view engine', 'ejs')

app.use(express.static(path.join(__dirname, '/public')));

app.get('/', (req, res) => {
	var templateVars = {datajson: json};
	res.render('index.html', templateVars);
});

app.get('/donations.json', (req, res) => {
	res.json(json);
});

app.listen(PORT);
console.log(`App listening on localhost:${PORT}!`);