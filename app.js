const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

const flightRoutes = require('./routes/flightRoutes');
const errorController = require('./controllers/errorController');

app.use(flightRoutes);
app.use(errorController.errorPage);

app.listen(3000);