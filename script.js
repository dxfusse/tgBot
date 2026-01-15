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

tg.sendData(JSON.stringify({ action: 'open' }));

document.getElementById('profile').onclick = () => {
  location.href = 'profile.html';
};
document.getElementById('prognoz').onclick = () => {
  location.href = 'prognoz.html';
};
document.getElementById('global_top').onclick = () => {
  location.href = 'global_top.html';
};
document.getElementById('helper').onclick = () => {
  location.href = 'global_top.html';
};
document.getElementById('profile').onclick = () => {
  tg.sendData(JSON.stringify({ action: 'open' }));
};

