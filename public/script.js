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
    <img src="../images/other/f1_logo.png" class="f1_logo">
    <div class="меню">
      <button data-page="profile" class="кнопка-меню">Профиль</button>
      <button data-page="team" class="кнопка-меню">Моя команда</button>
      <button data-page="prognoz" class="кнопка-меню">Сделать прогноз</button>
      <button data-page="global_top" class="кнопка-меню">Рейтинг</button>
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
    <div class="меню">
      <p class="текст-меню" id="username">Загрузка...</p>
      <p class="текст-меню" id="name">Загрузка...</p>
      <p class="текст-меню" id="score">Загрузка...</p>
      <p class="текст-меню" id="money">Загрузка...</p>
      <p class="текст-меню" id="team_cost">Загрузка...</p>
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
    document.getElementById('name').innerText = "Имя: " + user.first_name + ' ' + user.last_name;
    document.getElementById('username').innerText = "Ник: @" + user.username;
    document.getElementById('score').innerText = "Ваши баллы: " + data.score;
    document.getElementById('money').innerText = "Ваш баланс: " + data.money;
    document.getElementById('team_cost').innerText = "Стоимость команды: " + data.score;
    document.getElementById('pfp').src = data.photo;
  })
  .catch(err => console.error('Ошибка fetch:', err));
}

function TeamPage() {
  const user = tg.initDataUnsafe.user;
  
  render(`
    <p class="меню-текст">Твоя команда</p>
    <p class="баланс" id="balance"></p>
    <div class="team_menu-container">
      <button class="team_place-container" id="racer1_button">
        <img class="photo-team_container" id="racer1_photo">
        <p class="текст-мэйн" id="racer1_name">Гонщик 1:</p>
        <p class="текст-мэйн" id="racer1_cost">Стоимость:</p>
      </button>
      <button class="team_place-container" id="racer2_button">
        <img class="photo-team_container" id="racer2_photo">
        <p class="текст-мэйн" id="racer2_name">Гонщик 2:</p>
        <p class="текст-мэйн" id="racer2_cost">Стоимость:</p>
      </button>
      <button class="team_place-container" id="engine_button">
        <img class="photo-team_container" id="engine_photo">
        <p class="текст-мэйн" id="engine_name">Двигатель:</p>
        <p class="текст-мэйн" id="engine_cost">Стоимость:</p>
      </button>
      <button class="team_place-container" id="pit_stop_button">
        <img class="photo-team_container" id="pit_stop_photo">
        <p class="текст-мэйн" id="pit_stop_name">Пит-стоп:</p>
        <p class="текст-мэйн" id="pit_stop_cost">Стоимость:</p>
      </button>
      <button class="team_place-container" id="bridge_button">
        <img class="photo-team_container" id="bridge_photo">
        <p class="текст-мэйн" id="bridge_name">Мостик:</p>
        <p class="текст-мэйн" id="bridge_cost">Стоимость:</p>
      </button>
    </div>
    <p></p>
    <div class="footer-twoButtons">
      <button class="button-forFooter" data-page="main">Назад</button>
      <button class="button-forFooter" id="saveTeam">Сохранить</button>
    </div>
  `);

  fetch('https://tgbot-eiq1.onrender.com/getTeamInfo', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user: user })
  })
  .then(res => res.json())
  .then(data => {
    document.getElementById('balance').innerText = "Баланс: $" + data.money

    document.getElementById('racer1_photo').src = data.racer1.photo
    document.getElementById('racer1_name').innerText = "Гонщик 1: " + data.racer1.name
    document.getElementById('racer1_cost').innerText = "Стоимость: " + data.racer1.cost

    document.getElementById('racer2_photo').src = data.racer2.photo
    document.getElementById('racer2_name').innerText = "Гонщик 2: " + data.racer2.name
    document.getElementById('racer2_cost').innerText = "Стоимость: " +data.racer2.cost

    document.getElementById('engine_photo').src = data.engine.photo
    document.getElementById('engine_name').innerText = "Двигатель: " + data.engine.name
    document.getElementById('engine_cost').innerText = "Стоимость: " +data.engine.cost

    document.getElementById('pit_stop_photo').src = data.pit_stop.photo
    document.getElementById('pit_stop_name').innerText = "Пит-стоп: " + data.pit_stop.name
    document.getElementById('pit_stop_cost').innerText = "Стоимость: " +data.pit_stop.cost

    document.getElementById('bridge_photo').src = data.bridge.photo
    document.getElementById('bridge_name').innerText = "Мостик " + data.bridge.name
    document.getElementById('bridge_cost').innerText = "Стоимость: " +data.bridge.cost
  });

  document.getElementById('racer1_button').addEventListener('click', () => {
    CreateTeamPage('racer1')
  })
  document.getElementById('racer2_button').addEventListener('click', () => {
    CreateTeamPage('racer2')
  })
  document.getElementById('engine_button').addEventListener('click', () => {
    CreateTeamPage('engine')
  })
  document.getElementById('pit_stop_button').addEventListener('click', () => {
    CreateTeamPage('pit_stop')
  })
  document.getElementById('bridge_button').addEventListener('click', () => {
    CreateTeamPage('bridge')
  })
}

function CreateTeamPage(select){
  const user = tg.initDataUnsafe.user;
  app.className = 'page-createTeam';
  
  render(`
    <p class="меню-текст" id="mainText"></p>
    <img class="pfp" id="pfp">
    <p></p>
    <div class="div-createTeam" id="container_createTeam"></div>
    <p></p>
    <div class="footer-twoButtons">
      <button class="button-forFooter" data-page="team">Назад</button>
      <button class="button-forFooter" id="saveChoise">Сохранить</button>
    </div>
  `);

  if (select == 'racer1'){
    document.getElementById('mainText').innerText = "Выбор первого пилота";
  }
  if (select == 'racer2'){
    document.getElementById('mainText').innerText = "Выбор второго пилота";
  }
  if (select == 'engine'){
    document.getElementById('mainText').innerText = "Выбор двигателя";
  }
  if (select == 'pit_stop'){
    document.getElementById('mainText').innerText = "Выбор команды пит-стопа";
  }
  if (select == 'bridge'){
    document.getElementById('mainText').innerText = "Выбор моста";
  }

  const data = {
    user : user,
    select : select
  }

  fetch('https://tgbot-eiq1.onrender.com/selectTeamOpt', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then(data => {
    const names = data.map(item => item.name);
    const costs = data.map(item => item.cost);
    const photos = data.map(item => item.photo);

    let choise;

    const container = document.getElementById('container_createTeam');
    for (let i = 0; i < names.length; i++) {
      const btn = document.createElement('button');
      btn.className = 'button-createTeam';

      const img = document.createElement('img');
      img.src = photos[i];
      img.className = 'photo-createTeam';

      const text = document.createElement('div');
      text.textContent = names[i] + "Стоимость: " + costs[i];
      text.className = 'баланс'

      btn.appendChild(img);
      btn.appendChild(text);

      btn.onclick = () => {
        choise = names[i];
      };

      container.appendChild(btn);
    };
    document.getElementById('saveChoise').addEventListener('click', () => {
      alert(choise);
    });
  })
}

function setPageClass(page) {
  app.className = `page-${page}`;
}

// SPA Маршрутизация
function go(page) {
  setPageClass(page);
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


