const tg = window.Telegram.WebApp;
tg.ready();
tg.expand();
const service = "https://tgbot-eiq1.onrender.com";

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
  }else{
    toast.style.border = '2px solid #c80000'
    toast.style.backgroundColor = 'rgba(200, 0, 0, 0.15)'
    toast.style.boxShadow = 'rgb(185, 0, 0)'
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

  fetch(service + '/entering', {
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
      <button data-page="rating" class="кнопка-меню">Рейтинг игроков</button>
      <button data-page="helper" class="кнопка-меню" id="helper">Помощник</button>
    </div>
    <button class="dop-button" id="dop-button">123123123</button>
  `);

  const menuButtons = document.querySelectorAll('.кнопка-меню');
  menuButtons.forEach((btn, index) => {
    setTimeout(()=>{
        btn.classList.add('activate-menuButtons-animation')
    }, index * 70)
  })

  document.getElementById('dop-button').addEventListener('click', () => {
    alert(`
        Данный бот, состоящий из кода для серверной/клиентской части, включая все медиафайлы, использованные в ходе разработки (Далее - Бот) 
        разработан с нуля разработчиком: @Its_dxfusse, id:774319557 (Далее - Разработчик).
        Дата окончания разработки Бота Разработчиком: 21.01.2026. Любые изменения, внесённые после этой даты не являются ответственностью Разработчика
        Бот разработан по заказу для Телеграмм канала: Красная Машина | Формула 1, URL: t.me/redcar_F1 (Далее - ТГК)
        Все данные, включая медиафайлы, были предоставлены администрацией ТГК специально для использования в разработке Бота
        Все личные данные пользователей, использующиеся в коде Бота на момент его релиза (Дата: 21.01.2026), были предоставленны офицальным API от Телеграмм

        Разработчик не несёт ответственности за:
          - Дальнейшее использование Бота третьими лицами
          - Любое изменение Бота совершённое после даты: 21.01.2026
          - Любые убытки или ущерб от использования приложения
          - Потерю данных или несанкционированный доступ
          - Точность предоставляемой информации
          - Нарушение действующего законодательства РФ
          - Иные неправомерные действия совершёные Ботом и/или с его помощью

        © 2026 @Its_dxfusse. Все права защищены.`)
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
    <p></p>
  `);

  const menuButtons = document.querySelectorAll('.текст-меню');
  menuButtons.forEach((btn, index) => {
    setTimeout(()=>{
      btn.classList.add('activate-menuButtons-animation')
    }, index * 70)
  })

  fetch(service + '/getUserInfo', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user : user })
  })
  .then(res => res.json())
  .then(data => {
    document.getElementById('name').innerText = "Имя: " + user.first_name + ' ' + user.last_name;
    document.getElementById('username').innerText = "Ник: @" + user.username;
    document.getElementById('score').innerText = "Ваши баллы: " + data.score;
    document.getElementById('money').innerText = "Ваш баланс: $" + data.money;
    document.getElementById('team_cost').innerText = "Стоимость команды: $" + data.team_cost;
    document.getElementById('pfp').src = data.photo;

    if(data.clan == null){
      document.getElementById('clan').innerText = "Клан: Отсутствует";
    } else {
      document.getElementById('clan').innerText = "Клан: " + data.clan;
      const btn_clan = document.createElement('button');
      btn_clan.className = 'кнопка-меню'
      btn_clan.id = 'clanEditing'
      btn_clan.textContent = 'Управлять кланом'

      app.appendChild(btn_clan);

      document.getElementById('clanEditing').addEventListener('click', () => {
        go('clanEditing')
      })
    }
  })
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

  const menuButtons = document.querySelectorAll('.team_place-container');
  menuButtons.forEach((btn, index) => {
    setTimeout(()=>{
        btn.classList.add('activate-menuButtons-animation')
    }, index * 70)
  })

  fetch(service + '/getTeamInfo', {
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
    fetch(service + '/checkPredictings', {
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
    fetch(service + '/checkPredictings', {
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
    fetch(service + '/checkPredictings', {
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
    fetch(service + '/checkPredictings', {
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
    fetch(service + '/checkPredictings', {
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
      fetch(service + '/saveTeam', {
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

  fetch(service + '/getList', {
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

    const menuButtons = document.querySelectorAll('.button-createTeam');
    menuButtons.forEach((btn, index) => {
    setTimeout(()=>{
        btn.classList.add('activate-menuButtons-animation')
    }, index * 70)
  })
    
  document.getElementById('saveChoise').addEventListener('click', () => {
      if(balance < parseInt(global_cost)){
        showToast('Недостаточно денег!')
      }else{
        const data = {
          user : user,
          option : select,
          name : choise
        }
        fetch(service + '/selectTeamOpt', {
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
    <div class="меню" id="container_clans">
      <div class="head-div">
        <span class="head-text">Фото</span>
        <span class="head-text">Название</span>
        <span class="head-text">Участники</span>
        <span class="head-text">Баллы</span>
        <span class="head-text">Место</span>
      </div>
      <div class="div-createTeam" id="container_for_clans"></div>
    </div>
    <p></p>
    <div class="footer-twoButtons">
      <button class="button-forFooter" id="createClanBtn">Создать</button>
      <button class="button-forFooter" id="joinClan">Вступить</button>
    </div>
    <p>
    <button data-page="main" class="кнопка-меню">Назад</button>
  `);

  fetch(service + '/getClansList', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({user : user})
  })
  .then(res => res.json())
  .then(data => {
    const main_cont = document.getElementById('container_clans');
    main_cont.style.maxWidth = '380px'
    const container = document.getElementById('container_for_clans');
    container.innerHTML = '';

    data.clans.forEach((clan, index) => {
      const btn = document.createElement('button');
      btn.className = 'button-clans';

      const img = document.createElement('img');
      img.src = clan.photo;
      img.style.width = '70px';
      img.style.height = '70px';
      img.style.borderRadius = '20px';

      const name = document.createElement('div');
      name.textContent = clan.name;
      name.className = 'баланс';

      const membs = document.createElement('div');
      membs.textContent = `${clan.members.length}/100`;
      membs.className = 'баланс';

      const score = document.createElement('div');
      score.textContent = clan.score;
      score.className = 'баланс';

      const place = document.createElement('div');
      place.textContent = `#${index + 1}`;
      place.className = 'баланс';

      btn.append(img, name, membs, score, place);

      btn.onclick = () => {
        go('clanView', { select: clan.name });
      };

      container.appendChild(btn);
    });
  });


  document.getElementById('createClanBtn').addEventListener('click', () => {
    if(!document.getElementById('div_createClan')){
      const div = document.createElement('div');
      div.className = 'div-createClan'
      div.style.overflow = 'none';
      div.id = 'div_createClan'

      const text = document.createElement('div');
      text.className = 'меню-текст';
      text.textContent = 'Создание клана'

      const clanName = document.createElement('input');
      clanName.className = 'inputs'
      clanName.id = 'clanNameInput'
      clanName.placeholder = 'Имя клана (макс. 24 симв. с пробелами)'
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
          if((name.length <= 7 && !name.includes(" ")) || (name.length <= 24 && name.includes(" "))){
            const data = {
              name : name,
              photo : photo,
              user : user
            }
            fetch(service + '/createClan', {
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
              }else if(res.status == 202){
                showToast('Вы не можете создавать кланы!');
                div.remove();
              }
            })
          } else {
            showToast('Слишком длинное имя клана!')
          }
        } else { 
          showToast('Заполните все поля!')
        }
      });
      document.getElementById('btn1-back').addEventListener('click', () => {
        div.remove()
      });
    }
  });
  document.getElementById('joinClan').addEventListener('click', () => {
    if(!document.getElementById('div_joinClan')){
      const div_JC = document.createElement('div');
      div_JC.className = 'div-createClan'
      div_JC.style.overflow = 'none';
      div_JC.id = 'div_joinClan'

      const text_JC = document.createElement('div');
      text_JC.className = 'меню-текст';
      text_JC.textContent = 'Вступление в клан'

      const clanCode = document.createElement('input');
      clanCode.className = 'inputs'
      clanCode.id = 'clanInviteCode'
      clanCode.placeholder = 'Код приглашения'
      clanCode.type = 'text'

      const div_buttons_JC = document.createElement('div');
      div_buttons_JC.className = 'footer-twoButtons'
              
      const btn1_JC = document.createElement('button');
      btn1_JC.className = 'button-forFooter'
      btn1_JC.textContent = 'Отмена'
      btn1_JC.id = 'btn1-back'

      const btn2_JC = document.createElement('button');
      btn2_JC.className = 'button-forFooter'
      btn2_JC.textContent = 'Вступить'
      btn2_JC.id = 'joinClan_final'

      div_buttons_JC.appendChild(btn1_JC)
      div_buttons_JC.appendChild(btn2_JC)

      div_JC.appendChild(text_JC)
      div_JC.appendChild(clanCode)
      div_JC.appendChild(div_buttons_JC)

      app.appendChild(div_JC);

      document.getElementById('joinClan_final').addEventListener('click', () => {
        const code = document.getElementById('clanInviteCode').value;
        
        if(code != ""){
          const data = {
            code : code,
            user : user
          }
          fetch(service + '/joinClan', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
          })
          .then(res => res.json())
          .then(data => {
            if (data == 201) {
              showToast('Вы уже состоите в клане!');
              div.remove();
            }else if(data == 202){
              showToast('Такого кода не существует!');
              div.remove();
            }else if(data == 203){
              showToast('Вы в чёрном списке клана!');
              div.remove();
            }else {
              showToast('Вы вступили в клан ' + data, true);
              div.remove();
            }
          })
        }
      });

      document.getElementById('btn1-back').addEventListener('click', () => {
        div_JC.remove()
      });
    }
  });
}

//Страница обзора клана
function ClanViewPage(select) {
  const user = tg.initDataUnsafe.user;
  app.style.backgroundImage = "url('../images/other/background4.png')"

  render( `
    <p class="меню-текст" id="pageView-clanName">Загрузка...</p>
    <p></p>
    <img class="pfp" id="clan_photo">
    <p></p>
    <div class="меню" id="viewClan_menu">
      <p class="баланс" id="clan_score"></p>
      <p class="баланс">Участники</p>
      <div class="div-viewClan-main" id="container_clan_members">
        <div class="head-div-viewClan">
          <span class="head-text">Фото</span>
          <span class="head-text">Имя</span>
          <span class="head-text">Баллы</span>
        </div>
      </div>
    </div>
    <p></p>
    <button data-page="clans" class="кнопка-меню">Назад</button>
  `);

  fetch(service + '/viewClan', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ clan_name : select })
  })
  .then(res => res.json())
  .then(data => {
    document.getElementById('viewClan_menu').style.gap = '0px'
    document.getElementById('pageView-clanName').textContent = 'Клан "' + data.name + '"';
    document.getElementById('clan_photo').src = data.photo;
    document.getElementById('clan_score').textContent = "Баллы клана: " + data.score

    const container = document.getElementById('container_clan_members');
    for (let i = 0; i < data.members.length; i++) {
      const btn = document.createElement('button');
      btn.className = 'div-viewClan';

      const img = document.createElement('img');
      img.src = data.members[i].photo;
      img.style.width = '60px';
      img.style.height = '60px';
      img.style.borderRadius = '20px';

      const username = document.createElement('div');
      username.textContent = '@' + data.members[i].name;
      username.className = 'баланс';

      const score = document.createElement('div');
      score.textContent = data.members[i].score;
      score.className = 'баланс'

      btn.appendChild(img)
      btn.appendChild(username)
      btn.appendChild(score)

      container.appendChild(btn);
    };
  })
}

//Страница управления кланом
function ClanEditingPage() {
  const user = tg.initDataUnsafe.user;
  app.style.backgroundImage = "url('../images/other/background4.png')"

  render( `
    <p class="меню-текст">Управление кланом</p>
    <div class="меню" id="container_clan_editing">
      <div>
        <input class="inputs" placeholder="Новое имя Клана" id="new_clan_name">
        <p style="color: white; font-size: 14px;">*оставьте пустым, если не хотите менять</p>
      </div>
      <div>
        <input class="inputs" placeholder="Ссылка на новое фото клана" id="new_clan_photo">
        <p style="color: white; font-size: 14px;">*оставьте пустым, если не хотите менять</p>
      </div>
      <button id="change_clanInfo" class="кнопка-меню">Сменитть имя/фото клана</button>
    </div>
    <p></p>
    <div class="меню" id="container_clan_editing">
      <select class="inputs" id="choise_of_users"></select>
      <div class="footer-twoButtons">
        <button class="button-forFooter" id="kick_user">Выгнать</button>
        <button class="button-forFooter" id="ban_user">Забанить</button>
      </div>
      <p class="баланс" id="invite_code_form"></p>
      <button id="generate_code" class="кнопка-меню">Получить код приглашения</button>
      <button id="delete_clan" class="кнопка-меню">Удалить клан</button>
    </div>
    <p></p>
    <button data-page="main" class="кнопка-меню">Назад</button>
  `);

  document.getElementById('container_clan_editing').style.textAlign = 'center'
  document.getElementById('container_clan_editing').style.maxWidth = '400px'
  fetch(service + '/editClanPage', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user: user })
  })
  .then(res => res.json())
  .then(data => {
    if(data.invite_code != null){
      document.getElementById('invite_code_form').textContent = "Код приглашения: " + data.invite_code
    } else {
      document.getElementById('invite_code_form').textContent = "Код приглашения: Отсутсвтует"
    }
    const selectEl = document.getElementById('choise_of_users');
    const kickBtn = document.getElementById('kick_user');
    const banBtn  = document.getElementById('ban_user');
    const genCode = document.getElementById('generate_code');
    const delClan = document.getElementById('delete_clan');
    const changeCI = document.getElementById('change_clanInfo')

    selectEl.innerHTML = '';
    data.members.forEach(member => {
      const option = document.createElement('option');
      option.value = member.id;
      option.textContent = `${member.first_name} ${member.last_name} | @${member.username}`;
      selectEl.appendChild(option);
    });

    kickBtn.addEventListener('click', () => {
      const selectedUserId = selectEl.value;
      const selectedUserName = selectEl.options[selectEl.selectedIndex].text;

      if (!selectedUserId) {
        showToast('Выберите пользователя');
        return;
      }
      if (!confirm(`Вы уверены, что хотите выгнать пользователя:\n${selectedUserName}?`)) return;
      const data = {
        user : selectedUserId,
        kick : true
      }
      fetch(service + '/banKickUserFromClan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      .then(res => {
        if(res.status == 200){
          showToast('Игрок успешно кикнут!', true)
        }
      })
    });

    banBtn.addEventListener('click', () => {
      const selectedUserId = selectEl.value;
      const selectedUserName = selectEl.options[selectEl.selectedIndex].text;

      if (!selectedUserId) {
        showToast('Выберите пользователя');
        return;
      }

      if (!confirm(`Вы уверены, что хотите забанить пользователя:\n${selectedUserName}?`)) return;
      const data = {
        user : selectedUserId,
        kick : false
      }
       fetch(service + '/banKickUserFromClan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      .then(res => {
        if(res.status == 200){
          showToast('Игрок успешно забанен!', true)
        }
      })
    });

    genCode.addEventListener('click', () => {
      fetch(service + '/getInvCode', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({user : user})
      })
      .then(res => res.json())
      .then(data => {
        document.getElementById('invite_code_form').textContent = "Код приглашения: " + data
        showToast('Код успешно сгенерирован!', true)
        go('clanEditing')
      })
    })

    changeCI.addEventListener('click', () => {
      const name = document.getElementById('new_clan_name').value
      const photo = document.getElementById('new_clan_photo').value
      const data = {
        name : name,
        photo : photo,
        user : user
      }
      fetch(service + '/changeClanNameOrPhoto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      .then(res => {
        if(res.status == 200){
          showToast('Данные клана изменены', true)
        }
      })
    })

    delClan.addEventListener('click', () => {
      if(!confirm('Вы действительно хотите удалить свой клан?')) return;
      fetch(service + '/delClan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({user : user})
      })
      .then(res => {
        if(res.status == 200){
          showToast('Клан успешно удалён!', true);
          go('main');
        }
      })
    })
  })
}

//Страница рейтинга игроков
function UserRatingPage() {
  const user = tg.initDataUnsafe.user;
  app.style.backgroundImage = "url('../images/other/background5.png')"

  render( `
    <p class="меню-текст">Рейтинг игроков</p>
    <p></p>
    <div class="div-createTeam" id="container_users">
      <div class="head-div-rating">
        <span class="head-text">Фото</span>
        <span class="head-text">Имя</span>
        <span class="head-text">Баллы</span>
        <span class="head-text">Место</span>
      </div>
    </div>
    <p></p>
    <div class="div-userInfoRating" id="place_user">
      <p class="баланс" id="user_place"></p>
      <p class="баланс" id="user_name"></p>
      <p class="баланс" id="user_score"></p>
    </div>
    <p>
    <button data-page="main" class="кнопка-меню">Назад</button>
  `);

  fetch(service + '/getUsersList', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({user : user})
  })
  .then(res => res.json())
  .then(data => {
    const usernames = data.users.map(item => item.usernames).reverse();
    const first_names = data.users.map(item => item.first_names).reverse();
    const last_names = data.users.map(item => item.last_names).reverse();
    const photos = data.users.map(item => item.photos).reverse();
    const scores = data.users.map(item => item.scores).reverse();

    const container = document.getElementById('container_users');
    for (let i = 0; i < usernames.length; i++) {
      const btn = document.createElement('button');
      btn.className = 'button-rating';

      const img = document.createElement('img');
      img.src = photos[i];
      img.style.width = '60px';
      img.style.height = '60px';
      img.style.borderRadius = '20px';

      const div = document.createElement('div');
      div.className = 'div_texts-clans'

      const fullName = document.createElement('div');
      fullName.textContent = first_names[i] + ' ' + last_names[i];
      fullName.className = 'баланс';

      const username = document.createElement('div');
      username.textContent = '@' + usernames[i];
      username.className = 'баланс';

      const score = document.createElement('div');
      score.textContent = scores[i];
      score.className = 'баланс'

      const place = document.createElement('div');
      place.className = 'place-clans'
      place.textContent = '#' + (i+1)

      div.appendChild(fullName)
      div.appendChild(username)

      btn.appendChild(img)
      btn.appendChild(div)
      btn.appendChild(score)
      btn.appendChild(place)

      container.appendChild(btn);
    };

    const user_place = usernames.indexOf(user.username) + 1;
    document.getElementById('user_place').innerHTML = "#" + user_place;
    document.getElementById('user_name').innerHTML = user.username + ' (Ты)'
    document.getElementById('user_score').innerHTML = scores[user_place - 1];
  })
}

//Маршрутизация
let currentRoute = {
  page: 'main',
  params: {}
};

//Маршрут для форм
function go(page, params = {}) {
  currentRoute.page = page;
  currentRoute.params = params;

  if (page === 'main') MainPage();
  if (page === 'profile') ProfilePage();
  if (page === 'team') TeamPage();
  if (page === 'clans') ClansPage();
  if (page === 'clanEditing') ClanEditingPage();
  if (page === 'clanView') ClanViewPage(params.select);
  if (page === 'rating') UserRatingPage();
  if (page === 'createTeam') CreateTeamPage(params.select);
}

//Привязка событий к кнопкам
function bindEvents() {
  document.querySelectorAll('[data-page]').forEach(btn => {
    btn.onclick = () => go(btn.dataset.page);
  });

  const helper = document.getElementById('helper');
  if (helper) {
    helper.onclick = () => {
      const user = tg.initDataUnsafe.user;
      fetch(service + '/getDB', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userid: user.id })
      })
      .then(res => res.json())
      .then(data => alert(JSON.stringify(data, null, 2)));
    };
  }
}

//Показ главной формы
go('main');
