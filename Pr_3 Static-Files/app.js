const express = require('express');
const port = 8001;
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get("/", (req, res) => {
    return res.render('dashboard');
})
app.get("/charts", (req, res) => {
    return res.render('charts');
})

app.get("/widget", (req, res) => {
    return res.render('widget');
})

app.get("/table", (req, res) => {
    return res.render('table');
})

app.get("/form-basic", (req, res) => {
    return res.render('form-basic');
})

app.get("/fullwidth", (req, res) => {
    return res.render('fullwidth');
})

app.get("/form-wizard", (req, res) => {
    return res.render('form-wizard');
})

app.get("/buttons", (req, res) => {
    return res.render('buttons');
})

app.get("/material-icons", (req, res) => {
    return res.render('material-icons');
})
app.get("/fontawesome", (req, res) => {
    return res.render('fontawesome');
})

app.get("/elements", (req, res) => {
    return res.render('elements');
})

app.get("/2", (req, res) => {
    return res.render('index2');
})

app.get("/gallery", (req, res) => {
    return res.render('gallery');
})

app.get("/calendar", (req, res) => {
    return res.render('calendar');
})

app.get("/invoice", (req, res) => {
    return res.render('invoice');
})
app.get("/chat", (req, res) => {
    return res.render('chat');
})

app.get("/login", (req, res) => {
    return res.render('login');
})
app.get("/register", (req, res) => {
    return res.render('register');
})

app.get("/error-403", (req, res) => {
    return res.render('error-403');
})

app.get("/error-404", (req, res) => {
    return res.render('error-404');
})

app.get("/error-405", (req, res) => {
    return res.render('error-405');
})

app.get("/error-500", (req, res) => {
    return res.render('error-500');
})

app.listen(port, () => {
    console.log('Server Start at http://localhost:8001');
})