const tg = window.Telegram.WebApp;

tg.ready();
tg.expand();

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
document.getElementById('data').onclick = () => {
  tg.sendData(JSON.stringify({ action: 'open' }));
};

