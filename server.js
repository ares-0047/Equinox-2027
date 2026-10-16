const express = require('express');
const nunjucks = require('nunjucks');
const config = require('./config');

const app = express();
const port = process.env.PORT || 3000;

// Configure Nunjucks to look for HTML files in the current folder (flat structure)
const env = nunjucks.configure(__dirname, {
    autoescape: true,
    express: app
});

// A helper function to make your existing Flask 'url_for' tags work in Node.js
env.addGlobal('url_for', function(route) {
    if (route === 'home') return '/home';
    if (route === 'register') return '/register';
    if (route === 'contact') return '/contact';
    return '/';
});

// Dummy function to prevent Flask's flashed messages from crashing the template
env.addGlobal('get_flashed_messages', function() {
    return [];
});

// Parse form data
app.use(express.urlencoded({ extended: true }));

// Serve static files (like style.css) directly from this folder
app.use(express.static(__dirname));

// Inject config variables into every page
app.use((req, res, next) => {
    res.locals.config = config;
    next();
});

// Routes
// Keep the root URL as the primary continuous-scroll experience.
app.get('/', (req, res) => res.redirect('/home'));
app.get('/home', (req, res) => res.render('home.html'));
app.get('/register', (req, res) => res.render('register.html'));
app.post('/contact', (req, res) => {
    const name = typeof req.body.name === 'string' ? req.body.name.trim() : '';
    const email = typeof req.body.email === 'string' ? req.body.email.trim() : '';
    const message = typeof req.body.message === 'string' ? req.body.message.trim() : '';
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || name.length > 100 || !emailPattern.test(email) || email.length > 254 || !message || message.length > 2000) {
        return res.status(400).send('Please provide a valid name, email address, and message.');
    }

    // No email provider is configured, so acknowledge receipt without claiming delivery.
    return res.redirect('/home#contact');
});

// Error Pages
app.use((req, res) => res.status(404).render('404.html'));
app.use((err, req, res, next) => res.status(500).render('500.html'));

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});