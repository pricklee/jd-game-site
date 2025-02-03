import express from 'express';
import bodyParser from 'body-parser';
import ejs from 'ejs';

const app = express();
const port = 3000;

app.set('views', './views');
app.engine('html', ejs.renderFile);
app.set('view engine', 'ejs');

app.use(bodyParser.json({ extended: true }));
app.use('/static', express.static('static'));

// Routes
app.get('/', (req, res) => {
    res.render('frontpage.html');
});

app.get('/login', (req, res) => {
    res.render('login.html');
});

app.post('/login', express.json(), (req, res) => {
    console.log(req.body);
    res.redirect('/');
});

app.get('/register', (req, res) => {
    res.render('register.html');
});

app.post('/register', express.json(), (req, res) => {
    console.log(req.body);
    res.redirect('/');
});

// Start Server
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
