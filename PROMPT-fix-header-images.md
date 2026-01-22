/ralph-loop:ralph-loop

# Change: Fix Header Navigation and Broken Images

## Problem
1. Header shows "Tarifs" and "Confidentialité" links but pricing page should not be visible yet
2. Screenshot images are broken on the live French site (showing alt text instead of images)
3. The image paths use relative `../assets/images/` which may not work correctly on the deployed site

## Why we want it
- Clean user experience without broken images
- Hide pricing page until it's ready to launch
- Ensure French pages work correctly on the live site

## What we want
1. Remove "Pricing/Tarifs" and "Privacy/Confidentialité" links from header navigation on ALL pages (EN + FR)
2. Fix image paths in French pages to use absolute paths from root
3. Keep footer links to privacy and terms (legal pages should still be accessible)
4. Test locally with Chrome MCP before deploying

## Files to modify

### index.html
Remove from header nav:
```html
<a href="pricing.html">Pricing</a>
<a href="privacy.html">Privacy</a>
```
Keep only: logo, lang-switch, and "Join Beta" button

### pricing.html
Remove from header nav:
```html
<a href="pricing.html">Pricing</a>
<a href="privacy.html">Privacy</a>
```

### fr/index.html
1. Remove from header nav:
```html
<a href="/fr/pricing.html">Tarifs</a>
<a href="/fr/privacy.html">Confidentialité</a>
```

2. Fix ALL image paths - change from relative to absolute:
- `../assets/images/app-icon.png` → `/assets/images/app-icon.png`
- `../assets/images/screenshot-home.png` → `/assets/images/screenshot-home.png`
- `../assets/images/screen-home.png` → `/assets/images/screen-home.png`
- `../assets/images/screen-souls.png` → `/assets/images/screen-souls.png`
- `../assets/images/screen-chat.png` → `/assets/images/screen-chat.png`
- `../assets/images/screen-you.png` → `/assets/images/screen-you.png`
- `../css/style.css` → `/css/style.css`
- `../js/beta-signup.js` → `/js/beta-signup.js`

### fr/pricing.html
1. Remove nav links (Tarifs, Confidentialité)
2. Fix all asset paths to absolute

### fr/privacy.html
Fix all asset paths to absolute:
- `../assets/images/` → `/assets/images/`
- `../css/style.css` → `/css/style.css`

### fr/terms.html
Fix all asset paths to absolute:
- `../assets/images/` → `/assets/images/`
- `../css/style.css` → `/css/style.css`

## VERIFY with Chrome MCP

Start local server and test with Chrome DevTools MCP:

```bash
# Start local server (run in background)
cd /Users/weck0/Sites/keiro.me && python3 -m http.server 8000
```

### Test 1: English index page
```
navigate_page (url: "http://localhost:8000/index.html")
take_snapshot
```
Verify:
- Header shows only: logo, lang-switch, "Join Beta" button
- NO "Pricing" or "Privacy" links in header
- Images load correctly

### Test 2: French index page
```
navigate_page (url: "http://localhost:8000/fr/index.html")
take_snapshot
```
Verify:
- Header shows only: logo, lang-switch, "Rejoindre la Beta" button
- NO "Tarifs" or "Confidentialité" links in header
- ALL 5 images load correctly (hero + 4 showcase screenshots)
- No broken image icons

### Test 3: French pricing page
```
navigate_page (url: "http://localhost:8000/fr/pricing.html")
take_snapshot
```
Verify:
- Page loads correctly
- Images/CSS load correctly

### Test 4: Check console for errors
```
list_console_messages
```
Verify: No 404 errors for images or assets

## COMPLETION CRITERIA
- [ ] Header nav on all pages shows ONLY: logo, lang-switch, CTA button
- [ ] No "Pricing/Tarifs" or "Privacy/Confidentialité" in any header
- [ ] All 4 French pages use absolute paths for assets
- [ ] Chrome MCP tests pass:
  - [ ] EN index: no broken images, correct header
  - [ ] FR index: no broken images, correct header
  - [ ] FR pricing: assets load correctly
  - [ ] No 404 console errors
- [ ] Footer still contains privacy and terms links

## COMMIT

Only after ALL Chrome MCP tests pass:

```bash
git add -A && git commit -m "fix: remove pricing from header nav and fix French image paths"
```

## DEPLOY

Only after commit succeeds:

```bash
git push origin main
```

## OUT OF SCOPE
- Removing the pricing page entirely (keep it accessible via direct URL)
- Changing footer links
- Any other navigation changes
