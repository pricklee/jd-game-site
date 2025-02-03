import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';

const app = express();

app.use(bodyParser.json({ extended: true }));
app.use('/static', express.static(path.join(__dirname, 'static')));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'frontpage.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'register.html'));
});

app.post('/login', express.json(), (req, res) => {
    console.log(req.body);
    res.redirect('/');
});

app.post('/register', express.json(), (req, res) => {
    console.log(req.body);
    res.redirect('/');
});

export default app;
