# EQUINOX 2027 Official Website

An international 36-hour hybrid hackathon website built with Node.js,
Express, Nunjucks, HTML5, vanilla CSS, and vanilla JavaScript.

## Run locally

From the project directory in PowerShell:

```powershell
npm install
node server.js
```

Open <http://localhost:3000>. The primary visitor experience is the
continuous-scroll homepage at `/home`; `/` redirects there for compatibility.

## Contact form and developer credits

The contact form validates submissions and acknowledges them. No external
database or deployment service is required. Click the footer's
**Organisers** heading five times to reveal the developer credits page.

## Project structure

* `server.js` - Express server, Nunjucks setup, routes, and contact validation.
* `config.js` - Event information, track metadata, and configurable external URLs.
* `base.html` - Shared navigation, search overlay, and scripts.
* `home.html` - The complete welcome-to-footer continuous-scroll website.
* `developers.html` - Developer credits and profile placeholders.
* `register.html` - Backward-compatible standalone registration page.
* `style.css` / `main.js` - Responsive styling and accessible interactions.

External registration URLs are intentionally blank until confirmed. When
configured in `config.js`, they are rendered with safe external-link attributes.
