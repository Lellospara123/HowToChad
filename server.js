const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();
const PORT = 3000;
const SALT_ROUNDS = 10;

// Configura CORS per permettere richieste da GitHub Pages
const corsOptions = {
    origin: 'https://lellospara123.github.io/ImperoLucrinese/',
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Endpoint per la registrazione
app.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    if (username && password) {
        try {
            const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
            let users = [];
            try {
                const data = fs.readFileSync('users.json', 'utf8');
                if (data) {
                    users = JSON.parse(data);
                }
            } catch (err) {
                console.error('Error reading users.json:', err);
            }
            users.push({ username, password: hashedPassword });
            fs.writeFileSync('users.json', JSON.stringify(users, null, 2));
            res.send('Signup successful! You can now login.');
        } catch (err) {
            console.error('Error during signup:', err);
            res.status(500).send('Error during signup. Please try again.');
        }
    } else {
        res.status(400).send('Please enter both username and password.');
    }
});

// Endpoint per il login
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const data = fs.readFileSync('users.json', 'utf8');
        const users = data ? JSON.parse(data) : [];
        const user = users.find(user => user.username === username);
        if (user && await bcrypt.compare(password, user.password)) {
            res.send('Login successful!');
        } else {
            res.status(400).send('Incorrect username or password.');
        }
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).send('Error during login. Please try again.');
    }
});

// Endpoint per le richieste
app.post('/requests', async (req, res) => {
    const { username, request } = req.body;
    if (username && request) {
        try {
            let requests = [];
            try {
                const data = fs.readFileSync('requests.json', 'utf8');
                if (data) {
                    requests = JSON.parse(data);
                }
            } catch (err) {
                console.error('Error reading requests.json:', err);
            }
            requests.push({ username, request, date: new Date().toISOString() });
            fs.writeFileSync('requests.json', JSON.stringify(requests, null, 2));
            res.send('Request submitted successfully.');
        } catch (err) {
            console.error('Error during request submission:', err);
            res.status(500).send('Error during request submission. Please try again.');
        }
    } else {
        res.status(400).send('Please enter both username and request.');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});