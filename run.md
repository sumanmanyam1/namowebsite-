# NAMO Hospital Website — Running the Project

This is a static website (HTML, CSS, JavaScript). No build step or dependencies are required — you just need to serve the files with any static web server.

## Project Structure

```
website/
├── index.html        # Home page
├── about.html        # About page
├── services.html     # Services page
├── doctors.html      # Doctors page
├── contact.html      # Contact page
├── styles.css        # Global stylesheet
├── script.js         # JavaScript
├── hospital-building.jpg
└── aassests/         # Images (logo + doctor photos)
```

## Quick Start

Pick any one of the options below, then open the printed URL in your browser.

### Option 1: Python (usually pre-installed)

```bash
# Python 3
python3 -m http.server 8000
```

Then open: http://localhost:8000

### Option 2: Node.js

```bash
# No install needed (npx downloads on demand)
npx serve .

# or
npx http-server -p 8000
```

Then open the URL printed in the terminal (e.g. http://localhost:8000 or http://localhost:3000).

### Option 3: PHP

```bash
php -S localhost:8000
```

Then open: http://localhost:8000

### Option 4: VS Code Live Server

1. Install the **Live Server** extension.
2. Right-click `index.html` → **Open with Live Server**.

## Notes

- Because pages link to each other with relative paths (e.g. `doctors.html`, `aassests/logo.jpeg`), always serve from the project root (`website/`) so the links resolve correctly.
- Opening `index.html` directly with `file://` mostly works, but using a local server is recommended for consistent behavior.
