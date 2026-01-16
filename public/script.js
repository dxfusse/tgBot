const tg = window.Telegram.WebApp;

tg.ready();
tg.expand();

const app = document.getElementById('app');

//Рендер страниц
function render(html) {
  app.innerHTML = html;
  bindEvents();
}

//Страницы
function MainPage() {
  return `
    <img src="f1_logo.png" class="f1_logo">
    <p class="текст-мэйн"> Привет! Я твой помощник в составлении <br>прогнозов на каждую гонку в Формуле 1. Если ты угадаешь топ-10, то получишь баллы!</p>
    <p class="меню-текст">Доступные действия</p>
    <div class="меню">
      <button data-page="profile" class="кнопка-меню">Профиль</button>
      <button data-page="prognoz" class="кнопка-меню">Сделать прогноз</button>
      <button data-page="global_top" class="кнопка-меню">Глобальный топ</button>
      <button data-page="helper" class="кнопка-меню">Помощник</button>
    </div>
  `;
}

function ProfilePage() {
  const user = tg.initDataUnsafe.user;

  fetch('http://localhost:3000/entering', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({user : tg.initDataUnsafe.user})
  })

  return `
    <img src="f1_logo.png" class="f1_logo">
    <p class="меню-текст">Твой профиль</p>
    <div class="меню">
        <p class="текст-меню" id="id"></p>
        <p class="текст-меню" id="name"></p>
        <p class="текст-меню" id="score"></p>
    </div>
    <button class="кнопка-меню" data-page="main">Назад</button>
  `;
}

//Маршрутизаци
function go(page) {
  if (page === 'main') render(MainPage());
  if (page === 'profile') render(ProfilePage());
}

//Обработчик кнопок
function bindEvents() {
  document.querySelectorAll('[data-page]').forEach(btn => {
    btn.onclick = () => go(btn.dataset.page);
  });
}

go('main');

