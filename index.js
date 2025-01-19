import express from 'express';
import bodyParser from 'body-parser';
import ejs from 'ejs';

const app = express();
const port = 3000;

app.use(bodyParser.json({ extended: true }));

app.engine('html', ejs.renderFile);
app.use('/static', express.static('static'));

app.get('/login', (req, res) => {
	res.render('login.html');
});

app.get('/', (req, res) => {
	res.render('frontpage.html');
})

app.post('/login', express.json(), (req, res) => {
	console.log(req.body);
	res.redirect('/');
});

app.post('/register', express.json(), (req, res) => {
	console.log(req.body);
	res.redirect('/');
});

app.get('/register', (req, res) => {
	res.render('register.html');
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});