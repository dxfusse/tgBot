const tg = window.Telegram.WebApp;

tg.ready();
tg.expand();

const userInfo = tg.initDataUnsafe.user

fetch('/entering', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({user : userInfo})
})
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
