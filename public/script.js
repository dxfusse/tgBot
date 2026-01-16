const tg = window.Telegram.WebApp;
tg.ready();
tg.expand();

const app = document.getElementById('app');

// Общий рендер страниц
function render(html) {
  app.innerHTML = html;
  bindEvents(); // после вставки HTML привязываем события
}


// Main Page
function MainPage() {
  const user = tg.initDataUnsafe.user;

  fetch('https://tgbot-eiq1.onrender.com/entering', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user })
  });

  return `
    <img src="f1_logo.png" class="f1_logo">
    <p class="текст-мэйн">Привет! Я твой помощник в составлении <br>прогнозов на каждую гонку в Формуле 1. Если ты угадаешь топ-10, то получишь баллы!</p>
    <p class="меню-текст">Доступные действия</p>
    <div class="меню">
      <button data-page="profile" class="кнопка-меню">Профиль</button>
      <button data-page="prognoz" class="кнопка-меню">Сделать прогноз</button>
      <button data-page="global_top" class="кнопка-меню">Глобальный топ</button>
      <button data-page="helper" class="кнопка-меню" id="helper">Помощник</button>
    </div>
  `;
}


// Profile Page
function ProfilePage() {
  const user = tg.initDataUnsafe.user;

  render(`
    <img src="f1_logo.png" class="f1_logo">
    <p class="меню-текст">Твой профиль</p>
    <div class="меню">
        <p class="текст-меню" id="id">Загрузка...</p>
        <p class="текст-меню" id="username">Загрузка...</p>
        <p class="текст-меню" id="name">Загрузка...</p>
        <p class="текст-меню" id="score">Загрузка...</p>
    </div>
    <button class="кнопка-меню" data-page="main">Назад</button>
  `);

  fetch('https://tgbot-eiq1.onrender.com/getUserInfo', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user : user })
  })
  .then(res => res.json())
  .then(data => {
    document.getElementById('id').innerText = "ID: " + user.id;
    document.getElementById('name').innerText = "Имя: " + user.first_name + ' ' + user.last_name;
    document.getElementById('username').innerText = "Ник: " + user.username;
    document.getElementById('score').innerText = "Ваш баланс: " + data.score;
  })
  .catch(err => console.error('Ошибка fetch:', err));
}

// SPA Маршрутизация
function go(page) {
  if (page === 'main') render(MainPage());
  if (page === 'profile') ProfilePage();
}

// Привязка событий к кнопкам
function bindEvents() {
  document.querySelectorAll('[data-page]').forEach(btn => {
    btn.onclick = () => go(btn.dataset.page);
  });

  const helper = document.getElementById('helper');
  if (helper) {
    helper.onclick = () => {
      const user = tg.initDataUnsafe.user;
      fetch('https://tgbot-eiq1.onrender.com/getDB', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userid: user.id })
      })
      .then(res => res.json())
      .then(data => alert(JSON.stringify(data, null, 2)));
    };
  }
}


// Старт приложения
go('main');
