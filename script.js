const tg = Telegram.WebApp;

function onResize() {
  document.documentElement.style.setProperty(
    '--app-height',
    tg.viewportHeight + 'px'
  );
}
tg.ready();

if (!tg.isExpanded) {
  tg.expand();
}

onResize();

tg.onEvent('viewportChanged', onResize);
