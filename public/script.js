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
    body: JSON.stringify({ user : user })
  });

  render( `
    <img src="f1_logo.png" class="f1_logo">
    <p class="текст-мэйн">Привет! Я твой помощник в составлении <br>прогнозов на каждую гонку в Формуле 1. Если ты угадаешь топ-10, то получишь баллы!</p>
    <p class="меню-текст">Доступные действия</p>
    <div class="меню">
      <button data-page="profile" class="кнопка-меню">Профиль</button>
      <button data-page="prognoz" class="кнопка-меню">Сделать прогноз</button>
      <button data-page="global_top" class="кнопка-меню">Глобальный топ</button>
      <button data-page="helper" class="кнопка-меню" id="helper">Помощник</button>
    </div>
  `);

  const menuButtons = document.querySelectorAll('.кнопка-меню');
  menuButtons.forEach((btn, index) => {
    setTimeout(()=>{
        btn.classList.add('activate-menuButtons-animation')
    }, index * 70)
  })
}


// Profile Page
function ProfilePage() {
  const user = tg.initDataUnsafe.user;

  render(`
    <p class="меню-текст">Твой профиль</p>
    <img class="pfp" id="pfp">
    <p></p>
    <div class="profile-menu">
      <p class="текст-меню" id="id">Загрузка...</p>
      <p class="текст-меню" id="username">Загрузка...</p>
      <p class="текст-меню" id="name">Загрузка...</p>
      <p class="текст-меню" id="score">Загрузка...</p>
      <div class="меню">
        <button data-page="team" class="кнопка-меню">Моя команда</button>
        <button data-page="statistic" class="кнопка-меню">Статистика</button>
      </div>
    </div>
    <p></p>
    <button class="кнопка-меню" data-page="main">Назад</button>
  `);

  const menuButtons = document.querySelectorAll('.текст-меню');
  menuButtons.forEach((btn, index) => {
    setTimeout(()=>{
        btn.classList.add('activate-menuButtons-animation')
    }, index * 70)
  })

  fetch('https://tgbot-eiq1.onrender.com/getUserInfo', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user : user })
  })
  .then(res => res.json())
  .then(data => {
    document.getElementById('id').innerText = "ID: " + user.id;
    document.getElementById('name').innerText = "Имя: " + user.first_name + ' ' + user.last_name;
    document.getElementById('username').innerText = "Ник: @" + user.username;
    document.getElementById('score').innerText = "Ваш баланс: " + data.score;
    document.getElementById('pfp').src = data.photo;
  })
  .catch(err => console.error('Ошибка fetch:', err));
}

function TeamPage() {
  const user = tg.initDataUnsafe.user;
  
  render(`
    <p class="меню-текст">Твоя команда</p>
    <div class="team_menu-container">
      <div class="team_place-container">
        <img class="photo-team_container" src="null_choise.jpg">
        <p class="текст-мэйн">Гонщик 1:</p>
        <p class="текст-мэйн">Стоимость:</p>
      </div>
      <div class="team_place-container">
        <img class="photo-team_container" src="null_choise.jpg">
        <p class="текст-мэйн">Гонщик 2:</p>
        <p class="текст-мэйн">Стоимость:</p>
      </div>
      <div class="team_place-container">
        <img class="photo-team_container" src="null_choise.jpg">
        <p class="текст-мэйн">Двигатель:</p>
        <p class="текст-мэйн">Стоимость:</p>
      </div>
      <div class="team_place-container">
        <img class="photo-team_container" src="null_choise.jpg">
        <p class="текст-мэйн">Пит-стоп:</p>
        <p class="текст-мэйн">Стоимость:</p>
      </div>
      <div class="team_place-container">
        <img class="photo-team_container" src="null_choise.jpg">
        <p class="текст-мэйн">Мостик:</p>
        <p class="текст-мэйн">Стоимость:</p>
      </div>
    </div>
    <button class="кнопка-меню" data-page="profile">Назад</button>
  `);
}

// SPA Маршрутизация
function go(page) {
  if (page === 'main') MainPage();
  if (page === 'profile') ProfilePage();
  if (page === 'team') TeamPage();
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


