const tg = window.Telegram.WebApp;
tg.ready();
tg.expand();

const app = document.getElementById('app');

// Общий рендер страниц
function render(html) {
  app.innerHTML = html;
  bindEvents(); // после вставки HTML привязываем события
}

//Всплывающее уведомление
function showToast(text, err = false, duration = 4000) {
  const toast = document.getElementById('toast');

  if(err){
    toast.style.border = '2px solid #00c811'
    toast.style.backgroundColor = 'rgba(23, 200, 0, 0.15)'
    toast.style.boxShadow = 'rgb(0, 185, 31)'
  }

  toast.innerText = text;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, duration);
}


//Главная страница
function MainPage() {
  const user = tg.initDataUnsafe.user;
  app.style.backgroundImage = "url('../images/other/background1.jpg')"

  fetch('https://tgbot-eiq1.onrender.com/entering', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user : user })
  });

  render( `
    <img src="../images/other/f1_logo.png" class="f1_logo">
    <p></p>
    <p></p>
    <div class="меню">
      <button data-page="profile" class="кнопка-меню">Профиль</button>
      <button data-page="team" class="кнопка-меню">Моя команда</button>
      <button data-page="clans" class="кнопка-меню">Рейтинг кланов</button>
      <button data-page="players_top" class="кнопка-меню">Рейтинг игроков</button>
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

//Страница профиля
function ProfilePage() {
  const user = tg.initDataUnsafe.user;
  app.style.backgroundImage = "url('../images/other/background2.JPG')"

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
      <p class="текст-меню" id="clan">Загрузка...</p>
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
    if(data.clan == null){
      document.getElementById('clan').innerText = "Отсутствует";
    } else {
      document.getElementById('clan').innerText = data.clan;
    }
    document.getElementById('name').innerText = "Имя: " + user.first_name + ' ' + user.last_name;
    document.getElementById('username').innerText = "Ник: @" + user.username;
    document.getElementById('score').innerText = "Ваши баллы: " + data.score;
    document.getElementById('money').innerText = "Ваш баланс: " + data.money;
    document.getElementById('team_cost').innerText = "Стоимость команды: " + data.score;
    document.getElementById('pfp').src = data.photo;
  })
  .catch(err => console.error('Ошибка fetch:', err));
}

//Страница команды
function TeamPage() {
  const user = tg.initDataUnsafe.user;
  app.style.backgroundImage = "url('../images/other/background3.JPG')"
  
  render(`
    <p class="меню-текст">Твоя команда</p>
    <p class="баланс" id="balance"></p>
    <div class="team_menu-container">
      <button class="team_place-container" id="racer1_button">
        <img class="photo-team_container" id="racer1_photo">
        <p class="баланс" id="racer1_name">Гонщик 1:</p>
        <p class="баланс" id="racer1_cost">Стоимость:</p>
      </button>
      <button class="team_place-container" id="racer2_button">
        <img class="photo-team_container" id="racer2_photo">
        <p class="баланс" id="racer2_name">Гонщик 2:</p>
        <p class="баланс" id="racer2_cost">Стоимость:</p>
      </button>
      <button class="team_place-container" id="engine_button">
        <img class="photo-team_container" id="engine_photo">
        <p class="баланс" id="engine_name">Двигатель:</p>
        <p class="баланс" id="engine_cost">Стоимость:</p>
      </button>
      <button class="team_place-container" id="pit_stop_button">
        <img class="photo-team_container" id="pit_stop_photo">
        <p class="баланс" id="pit_stop_name">Пит-стоп:</p>
        <p class="баланс" id="pit_stop_cost">Стоимость:</p>
      </button>
      <button class="team_place-container" id="bridge_button">
        <img class="photo-team_container" id="bridge_photo">
        <p class="баланс" id="bridge_name">Мостик:</p>
        <p class="баланс" id="bridge_cost">Стоимость:</p>
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
    document.getElementById('racer1_name').innerText = "Гонщик 1:\n" + data.racer1.name
    document.getElementById('racer1_cost').innerText = "$" + data.racer1.cost

    document.getElementById('racer2_photo').src = data.racer2.photo
    document.getElementById('racer2_name').innerText = "Гонщик 2:\n" + data.racer2.name
    document.getElementById('racer2_cost').innerText = "$" +data.racer2.cost

    document.getElementById('engine_photo').src = data.engine.photo
    document.getElementById('engine_name').innerText = "Двигатель:\n" + data.engine.name
    document.getElementById('engine_cost').innerText = "$" + data.engine.cost

    document.getElementById('pit_stop_photo').src = data.pit_stop.photo
    document.getElementById('pit_stop_name').innerText = "Пит-стоп:\n" + data.pit_stop.name
    document.getElementById('pit_stop_cost').innerText = "$" +data.pit_stop.cost

    document.getElementById('bridge_photo').src = data.bridge.photo
    document.getElementById('bridge_name').innerText = "Мостик:\n" + data.bridge.name
    document.getElementById('bridge_cost').innerText = "$" +data.bridge.cost
  });

  document.getElementById('racer1_button').addEventListener('click', () => {
    fetch('https://tgbot-eiq1.onrender.com/checkPredictings', {
       method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({user : user})
    })
    .then(res => {
      if (res.status == 200){
        go('createTeam', { select: 'racer1' });
      }else if(res.status == 201){
        showToast('Вы уже подтвердили свой состав!')
      }else if(res.status == 202){
        showToast('На данный момент менять состав команды нельзя')
      }
    })
  })
  document.getElementById('racer2_button').addEventListener('click', () => {
    fetch('https://tgbot-eiq1.onrender.com/checkPredictings', {
       method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({user : user})
    })
    .then(res => {
      if (res.status == 200){
        go('createTeam', { select: 'racer2' });
      }else if(res.status == 201){
        showToast('Вы уже подтвердили свой состав!')
      }else if(res.status == 202){
        showToast('На данный момент менять состав команды нельзя')
      }
    })
  })
  document.getElementById('engine_button').addEventListener('click', () => {
    fetch('https://tgbot-eiq1.onrender.com/checkPredictings', {
       method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({user : user})
    })
    .then(res => {
      if (res.status == 200){
        go('createTeam', { select: 'engine' });
      }else if(res.status == 201){
        showToast('Вы уже подтвердили свой состав!')
      }else if(res.status == 202){
        showToast('На данный момент менять состав команды нельзя')
      }
    })
  })
  document.getElementById('pit_stop_button').addEventListener('click', () => {
    fetch('https://tgbot-eiq1.onrender.com/checkPredictings', {
       method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({user : user})
    })
    .then(res => {
      if (res.status == 200){
        go('createTeam', { select: 'pit_stop' });
      }else if(res.status == 201){
        showToast('Вы уже подтвердили свой состав!')
      }else if(res.status == 202){
        showToast('На данный момент менять состав команды нельзя')
      }
    })
  })
  document.getElementById('bridge_button').addEventListener('click', () => {
    fetch('https://tgbot-eiq1.onrender.com/checkPredictings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({user : user})
    })
    .then(res => {
      if (res.status == 200){
        go('createTeam', { select: 'bridge' });
      }else if(res.status == 201){
        showToast('Вы уже подтвердили свой состав!')
      }else if(res.status == 202){
        showToast('На данный момент менять состав команды нельзя')
      }
    })
  })
  document.getElementById('saveTeam').addEventListener('click', () => {
    if(confirm("Вы уверены, что хотите сохранить состав команды? Изменить его будет нельзя до следующей гонки")){
      fetch('https://tgbot-eiq1.onrender.com/saveTeam', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({user : user})
      })
      .then(res => {
        if (res.status == 200){
          showToast('Вы подтвердили свой состав!', true)
        }else if (res.status == 201){
          showToast('Отказано: вы уже подтвердили свой состав!')
        }
      })
    }
  })
}

//Страница создания команды
function CreateTeamPage(select){
  const user = tg.initDataUnsafe.user;
  app.style.backgroundImage = "url('../images/other/background3.JPG')"

  render(`
    <p class="меню-текст" id="mainText"></p>
    <p class="баланс" id="balance_createTeam">Баланс: $0</p>
    <p></p>
    <div class="div-createTeam" id="container_createTeam"></div>
    <p></p>
    <p class="баланс" id="userChoise">Ваш выбор: Не выбрано</p>
    <p></p>
    <div class="footer-twoButtons">
      <button class="button-forFooter" data-page="team">Назад</button>
      <button class="button-forFooter" id="saveChoise">Сохранить</button>
    </div>
  `);

  const container = document.getElementById('container_createTeam');
  if (container) container.scrollTop = 0;

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
    choise : select
  }

  fetch('https://tgbot-eiq1.onrender.com/getList', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then(data => {
    let balance = data.balance;
    if(balance == undefined){
      balance = 0;
    }
    const names = data.base.map(item => item.name);
    const costs = data.base.map(item => item.cost);
    const photos = data.base.map(item => item.photo);

    let choise;
    let global_cost;

    document.getElementById('balance_createTeam').innerText = 'Баланс: $' + balance;
    const container = document.getElementById('container_createTeam');
    const userChoise = document.getElementById('userChoise');
    for (let i = 0; i < names.length; i++) {
      const btn = document.createElement('button');
      btn.className = 'button-createTeam';

      const img = document.createElement('img');
      img.src = photos[i];
      img.className = 'photo-createTeam';

      const div = document.createElement('div');
      div.className = 'div_texts-createTeam'

      const name = document.createElement('div');
      name.textContent = names[i]
      name.className = 'баланс'

      const cost = document.createElement('div');
      cost.textContent = "Стоимость: $" + costs[i];
      cost.className = 'баланс'

      div.appendChild(name);
      div.appendChild(cost);

      btn.appendChild(img);
      btn.appendChild(div);

      btn.onclick = () => {
        document
          .querySelectorAll('.button-createTeam')
          .forEach(b => b.classList.remove('selected'));

        btn.classList.add('selected');
        choise = names[i];
        global_cost = cost[i];
        userChoise.innerText = "Ваш выбор: " + choise;
      };

      container.appendChild(btn);
    };
    document.getElementById('saveChoise').addEventListener('click', () => {
      if(balance < parseInt(global_cost)){
        showToast('Недостаточно денег!')
      }else{
        const data = {
          user : user,
          option : select,
          name : choise
        }
        fetch('https://tgbot-eiq1.onrender.com/selectTeamOpt', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        })
        .then(res => {
          if (res.status == 200){
            showToast('Выбор сохранён', true);
            go('team');
          }
        })
      }
    });
  })
}

//Страница Кланов
function ClansPage() {
  const user = tg.initDataUnsafe.user;
  app.style.backgroundImage = "url('../images/other/background4.png')"

  render( `
    <p class="меню-текст">Кланы</p>
    <p></p>
    <div class="div-createTeam" id="container_clans"></div>
    <p></p>
    <div class="footer-twoButtons">
      <button class="button-forFooter" id="createClanBtn">Создать</button>
      <button class="button-forFooter" id="joinClan">Вступить</button>
    </div>
    <p>
    <button data-page="main" class="кнопка-меню">Назад</button>
  `);

  fetch('https://tgbot-eiq1.onrender.com/getClansList', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({user : user})
  })
  .then(res => res.json())
  .then(data => {
    const names = data.clans.map(item => item.names).reverse();
    const members = data.clans.map(item => item.members).reverse();
    const scores = data.clans.map(item => item.scores).reverse();
    const photos = data.clans.map(item => item.photos).reverse();

    const container = document.getElementById('container_clans');
    for (let i = 0; i < names.length; i++) {
      const btn = document.createElement('button');
      btn.className = 'button-createTeam';

      const img = document.createElement('img');
      img.src = photos[i];
      img.style.width = '100px';
      img.style.height = '100px';
      img.style.borderRadius = '20px';

      const div = document.createElement('div');
      div.className = 'div_texts-clans'

      const name = document.createElement('div');
      name.textContent = names[i]
      name.className = 'меню-текст'

      const membs = document.createElement('div');
      membs.textContent = "Участников: " + members[i].length + "/100";
      membs.className = 'баланс'

      const score = document.createElement('div');
      score.textContent = "Баллы: " + scores[i];
      score.className = 'баланс'

      const place = document.createElement('div');
      place.className = 'place-clans'
      place.textContent = '#' + (i+1)

      div.appendChild(name);
      div.appendChild(membs);
      div.appendChild(score);

      btn.appendChild(img);
      btn.appendChild(div);
      btn.appendChild(place);

      btn.onclick = () => {
        showToast('В разработке...')
      };

      container.appendChild(btn);
    };
  })
  
  document.getElementById('createClanBtn').addEventListener('click', () => {
    if(!document.getElementById('div_createClan')){
      const div = document.createElement('div');
      div.className = 'div-createTeam'
      div.id = 'div_createClan'

      const text = document.createElement('div');
      text.className = 'меню-текст';
      text.textContent = 'Создание клана'

      const clanName = document.createElement('input');
      clanName.className = 'inputs'
      clanName.id = 'clanNameInput'
      clanName.placeholder = 'Имя клана (макс. 13 символов)'
      clanName.type = 'text'

      const clanPhoto = document.createElement('input');
      clanPhoto.className = 'inputs'
      clanPhoto.id = 'clanPhotoInput'
      clanPhoto.placeholder =  'Ссылка на фото клана'
      clanPhoto.type = 'text'

      const div_buttons = document.createElement('div');
      div_buttons.className = 'footer-twoButtons'
      
      const btn1 = document.createElement('button');
      btn1.className = 'button-forFooter'
      btn1.textContent = 'Отмена'
      btn1.id = 'btn1-back'

      const btn2 = document.createElement('button');
      btn2.className = 'button-forFooter'
      btn2.textContent = 'Создать'
      btn2.id = 'createClan'

      div_buttons.appendChild(btn1)
      div_buttons.appendChild(btn2)

      div.appendChild(text)
      div.appendChild(clanName)
      div.appendChild(clanPhoto)
      div.appendChild(div_buttons)

      app.appendChild(div);

      document.getElementById('createClan').addEventListener('click', () => {
        const name = document.getElementById('clanNameInput').value;
        const photo = document.getElementById('clanPhotoInput').value;
        if(name != "" && photo != ""){
          if(name.length <= 13){
            const data = {
              name : name,
              photo : photo,
              user : user
            }
            fetch('https://tgbot-eiq1.onrender.com/createClan', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(data)
            })
            .then(res => {
              if (res.status == 200) {
                showToast('Клан создан!', true);
                div.remove();
              }else if(res.status == 201){
                showToast('У вас уже есть клан!');
                div.remove();
              }
            })
          } else {
            showToast('Слишком длинное имя клана')
          }
        } else { 
          showToast('Заполните все поля!')
        }
      });
      document.getElementById('btn1-back').addEventListener('click', () => {
        div.remove();
      });
    }
  });
  document.getElementById('joinClan').addEventListener('click', () => {
    showToast('В разработке...')
  });
}

//Маршрутизация
let currentRoute = {
  page: 'main',
  params: {}
};

//Формы
function go(page, params = {}) {
  currentRoute.page = page;
  currentRoute.params = params;

  if (page === 'main') MainPage();
  if (page === 'profile') ProfilePage();
  if (page === 'team') TeamPage();
  if (page === 'clans') ClansPage();
  if (page === 'createTeam') CreateTeamPage(params.select);
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


