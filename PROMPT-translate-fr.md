/ralph-loop:ralph-loop

# Change: French Translation of Keiro Marketing Website

## Problem
The Keiro marketing website is only available in English. French-speaking users cannot access the site in their native language, limiting market reach in France and francophone countries.

## Why we want it
- Expand reach to French-speaking markets (France, Belgium, Switzerland, Quebec, Africa)
- Improve user experience for francophone visitors
- Better SEO for French search queries ("numerologie", "astrologie", "compatibilite")
- Sekaijin is a French company (contact@sekaijin.fr)

## What we want
Create a complete French version of the website with:
1. French translations of all 4 HTML pages in `/fr/` subdirectory
2. Language switcher in header (EN | FR links)
3. Automatic language detection with redirect for French browsers
4. Proper French HTML lang attribute and meta tags
5. All internal links updated within French section
6. Shared CSS and JS (no duplication)

## Files to create

### js/lang-redirect.js
Language detection script for automatic redirect:
- Check if user already has language preference cookie
- Detect browser language with navigator.language
- If French (fr, fr-FR, fr-CA, etc.) and on English page, redirect to /fr/ equivalent
- Set cookie when user manually switches language
- Add to head of all English pages BEFORE other scripts

```javascript
(function() {
  if (document.cookie.includes('lang_preference=')) return;
  const userLang = navigator.language || navigator.userLanguage;
  const isFrench = userLang.toLowerCase().startsWith('fr');
  const path = window.location.pathname;
  const isInFrench = path.startsWith('/fr/') || path === '/fr';
  if (isFrench && !isInFrench) {
    let newPath = '/fr' + path;
    if (path === '/' || path === '/index.html') newPath = '/fr/index.html';
    window.location.replace(newPath);
  }
})();
```

### fr/index.html
French landing page with:
- `<html lang="fr">`
- Title: "Keiro - Votre chemin vers la decouverte de soi"
- Meta description: "Keiro combine la numerologie, l'astrologie et le zodiaque chinois pour reveler des insights personnalises sur votre personnalite, vos relations et votre but de vie."
- Open Graph tags in French

Hero section translations:
- "Discover your path through ancient wisdom." → "Decouvrez votre chemin a travers la sagesse ancienne."
- "Keiro combines numerology..." → "Keiro combine la numerologie, l'astrologie et le zodiaque chinois pour reveler des insights personnalises sur votre personnalite, vos relations et votre but de vie."
- "Join the Early Beta" → "Rejoignez la Beta"
- "Enter your email" → "Entrez votre email"
- "Join Beta" button → "Rejoindre la Beta"
- "Help us improve Keiro. Be among the first to try it." → "Aidez-nous a ameliorer Keiro. Soyez parmi les premiers a l'essayer."

Showcase sections:
- "Your journey to self-discovery." → "Votre voyage vers la decouverte de soi."
- "Explore the ancient wisdom..." → "Explorez la sagesse ancienne qui guide votre chemin a travers la vie, les relations et la croissance personnelle."
- 01: "Get your daily energy reading." → "Obtenez votre lecture d'energie quotidienne."
- 02: "Understand your relationships." → "Comprenez vos relations."
- 03: "Ask AI for personalized insights." → "Demandez a l'IA des insights personnalises."
- 04: "Discover your complete profile." → "Decouvrez votre profil complet."

Navigation:
- "Pricing" → "Tarifs"
- "Privacy" → "Confidentialite"
- Footer links to /fr/privacy.html and /fr/terms.html
- "All rights reserved." → "Tous droits reserves."

### fr/pricing.html
French pricing page:
- Title: "Tarifs - Keiro"
- "Simple pricing" → "Tarification simple"
- "Start free, upgrade when you're ready." → "Commencez gratuitement, passez a la version superieure quand vous etes pret."

Free plan:
- "Free" → "Gratuit"
- "forever" → "pour toujours"
- "Full numerology profile" → "Profil numerologique complet"
- "Western & Chinese zodiac" → "Zodiaque occidental et chinois"
- "Daily energy readings" → "Lectures d'energie quotidiennes"
- "3 AI Guide chats / day" → "3 conversations IA / jour"
- "1 Soul Connection" → "1 Connexion d'Ame"
- "Join Beta Free" → "Rejoindre la Beta gratuitement"

Plus plan:
- "Most Popular" → "Le plus populaire"
- "/ month" → "/ mois"
- "billed annually" → "facture annuellement"
- "Everything in Free" → "Tout inclus dans Gratuit"
- "Unlimited" → "Illimite"
- "Deep compatibility readings" → "Lectures de compatibilite approfondies"
- "Chat history & cloud sync" → "Historique de chat et synchronisation cloud"
- "Priority support" → "Support prioritaire"
- "Or €9/month billed monthly" → "Ou 9€/mois facture mensuellement"
- "Subscriptions can be cancelled anytime..." → "Les abonnements peuvent etre annules a tout moment. Les prix peuvent varier selon la region."

### fr/privacy.html
French privacy policy:
- Title: "Politique de confidentialite - Keiro"
- "Back to Home" → "Retour a l'accueil"
- "Privacy Policy" → "Politique de confidentialite"
- "Last updated: January 21, 2026" → "Derniere mise a jour : 21 janvier 2026"
- Translate all 12 sections maintaining legal accuracy
- Keep third-party service names unchanged (Supabase, OpenAI, PostHog, Google)
- GDPR section especially important for French users

### fr/terms.html
French terms of service:
- Title: "Conditions d'utilisation - Keiro"
- "Terms of Service" → "Conditions d'utilisation"
- Translate all 13 sections maintaining legal accuracy
- "Entertainment purposes only" disclaimer clearly translated
- Keep subscription terms accurate

## Files to modify

### css/style.css
Add language switcher styles at end of file:
```css
/* Language Switcher */
.lang-switch {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-left: 1rem;
}

.lang-link {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.6);
  text-decoration: none;
  transition: color 0.2s ease;
}

.lang-link:hover,
.lang-link.active {
  color: #fff;
}

.lang-separator {
  color: rgba(255, 255, 255, 0.3);
}
```

### index.html
- Add `<script src="js/lang-redirect.js"></script>` in head (before other scripts)
- Add language switcher in header nav before "Join Beta" button:
```html
<div class="lang-switch">
  <a href="index.html" class="lang-link active" onclick="document.cookie='lang_preference=en;path=/;max-age=31536000'">EN</a>
  <span class="lang-separator">|</span>
  <a href="/fr/index.html" class="lang-link" onclick="document.cookie='lang_preference=fr;path=/;max-age=31536000'">FR</a>
</div>
```

### pricing.html
- Add lang-redirect.js script in head
- Add language switcher (EN active, FR links to /fr/pricing.html)

### privacy.html
- Add lang-redirect.js script in head
- Add language switcher (EN active, FR links to /fr/privacy.html)

### terms.html
- Add lang-redirect.js script in head
- Add language switcher (EN active, FR links to /fr/terms.html)

## Success looks like
- All 4 French pages exist in /fr/ directory
- All French pages have `lang="fr"` attribute
- Language switcher visible on all 8 pages (4 EN + 4 FR)
- Clicking FR from English pages navigates to French equivalent and sets cookie
- Clicking EN from French pages navigates to English equivalent and sets cookie
- French browser automatically redirects to /fr/ on first visit (no cookie)
- All internal links within French section stay in French section
- Beta form works on French page (same Supabase table)
- Mobile responsive layout preserved
- No console errors

## VERIFY

```bash
# Verify French directory and files exist
ls -la fr/ && echo "French directory exists"

# Verify all French pages have lang="fr"
grep -l 'lang="fr"' fr/*.html | wc -l | xargs -I {} test {} -eq 4 && echo "OK: All 4 French pages have lang=fr" || echo "ERROR: Missing lang=fr"

# Verify lang-redirect.js exists
test -f js/lang-redirect.js && echo "OK: lang-redirect.js exists" || echo "ERROR: lang-redirect.js missing"

# Verify English pages have lang-redirect script
grep -l 'lang-redirect.js' index.html pricing.html privacy.html terms.html | wc -l | xargs -I {} test {} -eq 4 && echo "OK: All EN pages have redirect script" || echo "ERROR: Missing redirect script"

# Verify language switcher in all pages
grep -l 'lang-switch' index.html pricing.html privacy.html terms.html fr/*.html | wc -l | xargs -I {} test {} -eq 8 && echo "OK: Lang switcher in all pages" || echo "ERROR: Missing lang switcher"

# Verify French internal links point to /fr/
grep -E 'href="(index|pricing|privacy|terms)\.html"' fr/*.html && echo "WARNING: Found links not using /fr/ prefix" || echo "OK: French links use /fr/ prefix"
```

## TESTS REQUIRED
Manual browser testing only (static HTML):
- Open site with French browser language → should redirect to /fr/
- Open site with English browser language → should stay on English
- Click FR link → navigate to French, set cookie
- Click EN link → navigate to English, set cookie
- After setting cookie, reload → should respect cookie, not browser language
- Test beta signup form on French page
- Test all navigation links on mobile

## COMPLETION CRITERIA
- All VERIFY commands pass
- 4 French pages created in /fr/ directory
- js/lang-redirect.js created and included in all English pages
- Language switcher added to all 8 pages
- All French content properly translated
- No broken links
- No console errors in browser

## COMMIT

```bash
git add -A && git commit -m "feat: add French translation with language detection"
```

## OUT OF SCOPE
- Other languages (German, Spanish, Japanese, etc.)
- Translation of app screenshots (images stay as-is)
- Translation of beta-signup.js success/error messages
- hreflang tags for SEO
- Server-side language negotiation
- Cookie consent banner for language preference cookie
- URL routing without .html extension
