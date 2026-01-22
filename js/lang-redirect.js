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
