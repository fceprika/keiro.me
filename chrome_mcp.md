# Chrome DevTools MCP - Guide

## Verifier l'installation

Au debut de la session, verifie si les outils `mcp__chrome-devtools__*` sont disponibles (ex: `mcp__chrome-devtools__take_screenshot`). Si oui, tout est bon.

Si non, le MCP n'est pas enregistre. Ajoute-le via la CLI :

```bash
claude mcp add chrome-devtools -- npx -y chrome-devtools-mcp@latest
```

Puis demande a l'utilisateur de relancer la session (`/exit` puis `claude`).

## Demarrer un serveur local

Les chemins absolus (`/css/`, `/js/`, `/fr/`) ne fonctionnent pas avec `file://`. Il faut un serveur HTTP :

```bash
python3 -m http.server 8000
```

Lancer en background avec `run_in_background: true` pour ne pas bloquer la session.

## Workflow de test

### 1. Ouvrir une page

```
mcp__chrome-devtools__navigate_page (type: "url", url: "http://localhost:8000/index.html")
```

### 2. Emuler un mobile (iPhone 15 Pro)

```
mcp__chrome-devtools__emulate (
  viewport: { width: 390, height: 844, deviceScaleFactor: 3, isMobile: true, hasTouch: true },
  userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1"
)
```

Recharger la page apres emulation pour que le CSS responsive s'applique :

```
mcp__chrome-devtools__navigate_page (type: "reload")
```

### 3. Prendre un screenshot

```
mcp__chrome-devtools__take_screenshot
```

**JAMAIS** `fullPage: true` - les images > 8000px echouent.

### 4. Inspecter le contenu (prefere aux screenshots)

```
mcp__chrome-devtools__take_snapshot
```

Retourne l'arbre a11y avec les `uid` des elements, utilisables pour `click`, `fill`, etc.

### 5. Scroller

```
mcp__chrome-devtools__evaluate_script (function: "() => { window.scrollBy(0, 1200); }")
```

Puis `take_screenshot` pour voir la nouvelle position.

### 6. Tester un formulaire

```
mcp__chrome-devtools__fill (uid: "<uid-du-input>", value: "test@example.com")
mcp__chrome-devtools__click (uid: "<uid-du-bouton>")
```

### 7. Verifier les erreurs

```
mcp__chrome-devtools__list_console_messages (types: ["error", "warn"])
```

## Gestion des pages

Si la page se ferme (erreur "selected page has been closed") :

```
mcp__chrome-devtools__new_page (url: "http://localhost:8000/index.html")
```

Pour lister les pages ouvertes :

```
mcp__chrome-devtools__list_pages
```

## Viewports courants

| Device         | width | height | scale | isMobile |
|---------------|-------|--------|-------|----------|
| iPhone 15 Pro | 390   | 844    | 3     | true     |
| iPhone SE     | 375   | 667    | 2     | true     |
| iPad          | 810   | 1080   | 2     | true     |
| Desktop       | 1440  | 900    | 1     | false    |
