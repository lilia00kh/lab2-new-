const express = require('express');
const pug = require('pug');
const path = require('path');

const app = express();


app.use(express.json());
app.use(express.urlencoded());


app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'static', 'views'));

app.listen(3001, () => {
    console.log(3001)
});
