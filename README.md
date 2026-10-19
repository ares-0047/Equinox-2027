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
continuous-scroll homepage at `/home`; `/` redirects there for
compatibility.

## Project structure

* `server.js` - Express server, Nunjucks setup, routes, and contact validation.
* `config.js` - Event information, track metadata, and configurable external URLs.
* `base.html` - Shared navigation, search overlay, and scripts.
* `home.html` - The complete welcome-to-footer continuous-scroll website.
* `register.html` - Backward-compatible standalone registration page.
* `style.css` / `main.js` - Responsive styling and accessible interactions.

External registration URLs are intentionally blank until confirmed. When
configured in `config.js`, they are rendered with safe external-link attributes.

## Brand assets

Keep these image files in the project root beside `server.js`; Express serves this directory as static assets:

* `equinox-header-logo.png` - official EQUINOX logo used in the navigation and footer.
* `equinox-logo-transparent.png` - EQUINOX hero/presentation logo.
* `qtm-logo.png` - Quantum University logo used in host-institution areas.

The visual refresh changes the shared template, homepage, and stylesheet. The original server, configuration, JavaScript interactions, package manifests, and supporting pages are included unchanged.


## Branding assets

The public root includes the EQUINOX wordmark and header logo, Quantum University logo, and organiser logos for Velocity, Horizon IoT Club, and the International Partnership Office. Keep these image files in the project root beside `server.js`; Express serves that directory as the static asset root.
