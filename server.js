const express = require('express');
const nunjucks = require('nunjucks');
const config = require('./config');

const app = express();
const port = process.env.PORT || 3000;
const host = '0.0.0.0';

// Render terminates TLS at its proxy, so trust it when generating absolute URLs.
app.set('trust proxy', 1);

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
    if (route === 'network') return '/network';
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
    res.locals.siteUrl = `${req.protocol}://${req.get('host')}`;
    res.locals.pagePath = req.path;
    next();
});

// Routes
app.get('/health', (req, res) => res.status(200).json({ status: 'ok' }));
// Keep the root URL as the primary continuous-scroll experience.
app.get('/', (req, res) => res.redirect('/home'));
app.get('/robots.txt', (req, res) => {
    res.type('text/plain').send([
        'User-agent: *',
        'Allow: /',
        'Disallow: /contact',
        `Sitemap: ${res.locals.siteUrl}/sitemap.xml`
    ].join('\n'));
});
app.get('/sitemap.xml', (req, res) => {
    const urls = ['/', '/home', '/register', '/network'].concat(Object.keys(config.CLUBS).map((slug) => `/clubs/${slug}`));
    const body = urls.map((path) => `    <url><loc>${res.locals.siteUrl}${path}</loc></url>`).join('\n');
    res.type('application/xml').send(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>`);
});
app.get('/home', (req, res) => res.render('home.html'));
app.get('/register', (req, res) => res.render('register.html'));
app.get('/network', (req, res) => res.render('network.html'));
app.get('/developers', (req, res) => res.render('developers.html'));
app.get('/clubs/:slug', (req, res) => {
    const club = config.CLUBS[req.params.slug];
    if (!club) return res.status(404).render('404.html');
    return res.render('club.html', { club });
});
app.post('/contact', async (req, res) => {
    const name = typeof req.body.name === 'string' ? req.body.name.trim() : '';
    const email = typeof req.body.email === 'string' ? req.body.email.trim() : '';
    const message = typeof req.body.message === 'string' ? req.body.message.trim() : '';
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || name.length > 100 || !emailPattern.test(email) || email.length > 254 || !message || message.length > 2000) {
        return res.status(400).send('Please provide a valid name, email address, and message.');
    }

    return res.redirect('/home#contact');
});

// Error Pages
app.use((req, res) => {
    res.locals.noIndex = true;
    return res.status(404).render('404.html');
});
app.use((err, req, res, next) => {
    res.locals.noIndex = true;
    return res.status(500).render('500.html');
});

if (require.main === module) {
    app.listen(port, host, () => {
        console.log(`Server is running on ${host}:${port}`);
    });
}

module.exports = app;