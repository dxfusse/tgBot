const tg = window.Telegram.WebApp;
tg.ready();

// Расширяем Mini App на весь экран
tg.expand();

// Информация о пользователе
const userDiv = document.getElementById('user');

if (tg.initDataUnsafe.user) {
  const user = tg.initDataUnsafe.user;

  userDiv.innerHTML = `
    👤 Пользователь:<br>
    ID: ${user.id}<br>
    Имя: ${user.first_name}<br>
    Username: @${user.username ?? 'нет'}
  `;
} else {
  userDiv.innerText = 'Пользователь не определён';
}

// Отправка данных боту
document.getElementById('sendBtn').addEventListener('click', () => {
  tg.sendData(JSON.stringify({
    type: 'button_click',
    time: Date.now()
  }));
});
