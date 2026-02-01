# CLAUDE.md

This file provides guidance to Claude Code when working with the keiro.me website.

## Project Overview

This is the **marketing website** for the Keiro mobile app (Flutter). It serves as the public-facing landing page at keiro.me.

**Purpose:**
- Present the Keiro app and its features to potential users
- Collect beta signups via email form (stored in Supabase)
- Provide legal pages (Privacy Policy, Terms of Service)
- Display pricing information

**Related Project:** The main Flutter app is located at `/Users/weck0/Apps/keiro_flutter`

## Site Structure

```
keiro.me/
├── index.html          # Landing page with hero + 4 showcase sections
├── pricing.html        # Pricing plans
├── privacy.html        # Privacy policy
├── terms.html          # Terms of service
├── css/
│   └── style.css       # All styles (dark theme, Noto Serif JP font)
├── js/
│   └── beta-signup.js  # Beta form submission to Supabase
└── assets/
    └── images/         # App screenshots and branding
```

## Key Features

### Beta Signup Form
- Email collection with iOS/Android platform preference
- Honeypot field for bot protection
- Submits to Supabase `beta_signups` table
- Located in hero section of index.html

### Showcase Sections (index.html)
4 feature presentations with phone mockups:
1. Daily Energy Reading
2. Souls Compatibility
3. AI Chat Insights
4. Complete Profile

## Design System

- **Background:** Pure black (#000000)
- **Font:** Noto Serif JP (light weight)
- **Theme:** Dark mode only, minimalist Japanese aesthetic
- **Responsive:** Mobile-first with breakpoints at 480px, 768px, 1024px

## Testing — OBLIGATOIRE

**Apres chaque modification CSS/JS/HTML, tu DOIS tester visuellement avec Chrome DevTools MCP avant de commit.**

Teste au minimum sur mobile (iPhone 390x844) et verifie les erreurs console. Pour le guide complet, lis `chrome_mcp.md` a la racine du projet.

Si les outils `mcp__chrome-devtools__*` ne sont pas disponibles dans ta session, demande a l'utilisateur de relancer avec le MCP installe (voir `chrome_mcp.md` pour la procedure d'installation).

### Supabase MCP

Use for backend/database operations:

```
# Check beta signups table
execute_sql (query: "SELECT * FROM beta_signups ORDER BY created_at DESC LIMIT 10")

# List tables
list_tables (schemas: ["public"])

# Check for issues
get_advisors (type: "security")
```

## Development

### Local Testing
Open `index.html` directly in browser or use a local server:
```bash
cd /Users/weck0/Apps/keiro.me
python3 -m http.server 8000
# Then navigate to http://localhost:8000
```

### Deployment
Site is deployed via GitHub Pages or similar static hosting.

## Common Tasks

### Update Showcase Screenshots
1. Take new screenshots from the Flutter app
2. Save to `assets/images/screen-*.png`
3. Maintain aspect ratio for phone mockups

### Modify Beta Form
1. Edit form HTML in `index.html` (lines 46-92)
2. Update validation/submission in `js/beta-signup.js`
3. Test with Chrome DevTools MCP

### Style Changes
All styles in `css/style.css`:
- CSS variables at top (`:root`)
- Component styles organized by section
- Responsive breakpoints at bottom
