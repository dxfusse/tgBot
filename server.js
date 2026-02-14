const { Telegraf, Markup } = require('telegraf');
const fs = require('fs');
const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');

//бот
const BOT_TOKEN = '8179159056:AAFp_2akr_bkTcq1t6bXnxoUT6xV0EhBvf4';
const WEB_APP_URL = 'https://dxfusse.github.io/tgBot/public/';
const bot = new Telegraf(BOT_TOKEN);

//cors и express
app.use(cors({ origin: '*' }));
app.use(express.json());

//вебхуки
const secretPath = '/dxfusse-secret-path';
app.use(bot.webhookCallback(secretPath));
bot.telegram.setWebhook(`https://tgbot-eiq1.onrender.com${secretPath}`);

//статика
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

//Отправка сообщения в тг
bot.start((ctx) => {
  ctx.reply(
    '👋 Привет! Я твой помощник в Формуле 1.\nЧтобы начать, нажми кнопку "Начать" ниже!',
    {
      reply_markup: {
        inline_keyboard: [
          [{ text: '🚀 Начать', web_app: { url: WEB_APP_URL } }]
        ]
      }
    }
  );
});

console.log('Бот запущен');

let database = null;
const score_to_money = 1000000;

//Инициализация базы данных
function initDatabase() {
  const filePath = 'database.json';
  
  try {
    if (!fs.existsSync(filePath)) {
      console.log('База данных не существует, создаем...');
      return createNewDatabase();
    }
    const data = fs.readFileSync(filePath, 'utf8');
 
    if (!data.trim()) {
      console.log('База данных пустая, создаем скелет...');
      return createNewDatabase();
    }

    database = JSON.parse(data);
    console.log('База данных загружена');
    
  } catch (error) {
    if (error instanceof SyntaxError) {
      console.log('База данных повреждена, создаем новую...');
      return createNewDatabase();
    } else {
      console.error('Ошибка при загрузке базы данных:', error);
      throw error;
    }
  }
  
  return database;
}

//Создание базы данных
function createNewDatabase() {
  database = {
    users: [
      {
        id: 774319557,
        first_name:  "Dxfusse",
        last_name:  "",
        language: "ru",
        username: "Its_dxfusse",
        photo : "123",
        team : {
          racer1 : null,
          racer2 : null,
          engine : null,
          pit_stop : null,
          bridge : null
        },
        team_changing: true,
        score: 0,
        money: 100000000,
        team_cost : 0,
        clan : null,
        creatingClan : true,
        admin : true
      },
      {
        id: 774312457,
        first_name:  "test",
        last_name:  "user",
        language: "ru",
        username: "test_user",
        photo : "https://i.ytimg.com/vi/QjcAF34nQXw/maxresdefault.jpg",
        team : {
          racer1 : null,
          racer2 : null,
          engine : null,
          pit_stop : null,
          bridge : null
        },
        team_changing: true,
        score: 5,
        money: 100000000,
        team_cost : 0,
        clan : null,
        creatingClan : false,
        admin : false
      }
    ],
    race_id: 1,
    predict_accepting: true,
    race_results: {},
    clans : [
      {
        id : 0,
        name : "F1 test clan",
        members : [774365557],
        photo : "https://i.pinimg.com/originals/74/29/43/7429430a85e8d3b2ddd19994149bcad4.jpg",
        score : 100,
        invite_code : 12345678,
        black_list : [774319557]
      },
      {
        id : 1,
        name : "F1 Fantazy chanel",
        members : [564589557, 6372939, 372354],
        photo : "https://i.pinimg.com/736x/7c/29/96/7c2996770695ac8e001cef5b76ae0371.jpg",
        score : 400,
        invite_code : 87654321,
        black_list : []
      }
    ],
    drivers: [
      {
        id: 0,
        name: "Макс Ферстаппен",
        cost: 10000,
        photo: "../images/drivers/mv.jpg"
      },
      {
        id: 1,
        name: "Шарль Леклер",
        cost: 9000,
        photo: "../images/drivers/cl.jpg"
      },
      {
        id: 2,
        name: "Льюис Хэмилтон",
        cost: 9500,
        photo: "../images/drivers/lh.jpg"
      },
      {
        id: 3,
        name: "Карлос Сайнс",
        cost: 8500,
        photo: "../images/drivers/cs.jpg"
      },
      {
        id: 4,
        name: "Лиам Лоусон",
        cost: 3000,
        photo: "../images/drivers/ll.jpg"
      },
      {
        id: 5,
        name: "Ландо Норрис",
        cost: 8800,
        photo: "../images/drivers/ln.jpg"
      },
      {
        id: 6,
        name: "Фернандо Алонсо",
        cost: 8200,
        photo: "../images/drivers/fa.jpg"
      },
      {
        id: 7,
        name: "Оскар Пиастри",
        cost: 7500,
        photo: "../images/drivers/op.jpg"
      },
      {
        id: 8,
        name: "Джордж Расселл",
        cost: 8000,
        photo: "../images/drivers/gr.jpg"
      },
      {
        id: 9,
        name: "Юки Цунода",
        cost: 4500,
        photo: "../images/drivers/yt.jpg"
      },
      {
        id: 10,
        name: "Габриэль Бортолето",
        cost: 2000,
        photo: "../images/drivers/gb.jpg"
      },
      {
        id: 11,
        name: "Алекс Албон",
        cost: 5500,
        photo: "../images/drivers/aa.jpg"
      },
      {
        id: 12,
        name: "Франко Колапинто",
        cost: 1800,
        photo: "../images/drivers/fc.jpg"
      },
      {
        id: 13,
        name: "Оливер Берман",
        cost: 2500,
        photo: "../images/drivers/ob.jpg"
      },
      {
        id: 14,
        name: "Нико Хюлькенберг",
        cost: 4000,
        photo: "../images/drivers/nh.jpg"
      },
      {
        id: 15,
        name: "Кими Антонелли",
        cost: 2200,
        photo: "../images/drivers/ka.jpg"
      },
      {
        id: 16,
        name: "Изак Хаджар",
        cost: 1500,
        photo: "../images/drivers/ih.jpg"
      },
      {
        id: 17,
        name: "Эстебан Окон",
        cost: 5000,
        photo: "../images/drivers/eo.jpg"
      },
      {
        id: 18,
        name: "Пьер Гасли",
        cost: 4800,
        photo: "../images/drivers/pg.jpg"
      },
      {
        id: 19,
        name: "Лэнс Стролл",
        cost: 4200,
        photo: "../images/drivers/ls.jpg"
      }
    ],
    engines: [
      {
        id: 0,
        name: "Феррари",
        cost: 15000,
        photo: "../images/engines/Феррари.jpg"
      },
      {
        id: 1,
        name: "Мерседес",
        cost: 14500,
        photo: "../images/engines/Мерседес.jpg"
      },
      {
        id: 2,
        name: "Хонда",
        cost: 14000,
        photo: "../images/engines/Хонда.jpg"
      },
      {
        id: 3,
        name: "Ред Булл",
        cost: 15500,
        photo: "../images/engines/Ред Булл.jpg"
      },
      {
        id: 4,
        name: "Ауди",
        cost: 12000,
        photo: "../images/engines/Ауди.jpg"
      }
    ],
    pit_stops: [
      {
        id: 0,
        name: "Феррари",
        cost: 15000,
        photo: "../images/pit_stops/Феррари.jpg"
      },
      {
        id: 1,
        name: "Мерседес",
        cost: 14500,
        photo: "../images/pit_stops/Мерседес.jpg"
      },
      {
        id: 2,
        name: "Макларен",
        cost: 14000,
        photo: "../images/pit_stops/Макларен.jpg"
      },
      {
        id: 3,
        name: "Ред Булл",
        cost: 15500,
        photo: "../images/pit_stops/Ред Булл.jpg"
      },
      {
        id: 4,
        name: "Рейсинг Булз",
        cost: 12000,
        photo: "../images/pit_stops/Рейсинг Булз.jpg"
      },
      {
        id: 5,
        name: "Астон Мартин",
        cost: 13500,
        photo: "../images/pit_stops/Астон Мартин.jpg"
      },
      {
        id: 6,
        name: "Уильямс",
        cost: 11000,
        photo: "../images/pit_stops/Уильямс.jpg"
      },
      {
        id: 7,
        name: "Хаас",
        cost: 10000,
        photo: "../images/pit_stops/Хаас.jpg"
      },
      {
        id: 8,
        name: "Ауди",
        cost: 13000,
        photo: "../images/pit_stops/Ауди.jpg"
      },
      {
        id: 9,
        name: "Альпин",
        cost: 11500,
        photo: "../images/pit_stops/Альпин.jpg"
      },
      {
        id: 10,
        name: "Кадиллак",
        cost: 12500,
        photo: "../images/pit_stops/Кадиллак.jpg"
      }
    ],
    bridges: [
      {
        id: 0,
        name: "Феррари",
        cost: 8000,
        photo: "../images/bridges/Феррари.jpg"
      },
      {
        id: 1,
        name: "Мерседес",
        cost: 7800,
        photo: "../images/bridges/Мерседес.jpg"
      },
      {
        id: 2,
        name: "Макларен",
        cost: 7500,
        photo: "../images/bridges/Макларен.jpg"
      },
      {
        id: 3,
        name: "Ред Булл",
        cost: 8200,
        photo: "../images/bridges/Ред Булл.jpg"
      },
      {
        id: 4,
        name: "Рейсинг Булз",
        cost: 7000,
        photo: "../images/bridges/Рейсинг Булз.jpg"
      },
      {
        id: 5,
        name: "Астон Мартин",
        cost: 7700,
        photo: "../images/bridges/Астон Мартин.jpg"
      },
      {
        id: 6,
        name: "Уильямс",
        cost: 6800,
        photo: "../images/bridges/Уильямс.jpg"
      },
      {
        id: 7,
        name: "Хаас",
        cost: 6500,
        photo: "../images/bridges/Хаас.jpg"
      },
      {
        id: 8,
        name: "Ауди",
        cost: 7600,
        photo: "../images/bridges/Ауди.jpg"
      },
      {
        id: 9,
        name: "Альпин",
        cost: 7200,
        photo: "../images/bridges/Альпин.jpg"
      },
      {
        id: 10,
        name: "Кадиллак",
        cost: 7400,
        photo: "../images/bridges/Кадиллак.jpg"
      }
    ],
    coefficients : {
      drivers: [
        { event: 'Вылетел в Q3', points: -2 },
        { event: 'Прошел в Q2', points: 1 },
        { event: 'Прошел в Q3', points: 2 },
        { event: 'Выиграл квалификацию', points: 3 },
        { event: 'Совершил обгон', points: 2 },
        { event: 'Допустил ошибку', points: -2 },
        { event: 'Потерял позицию', points: -3 },
        { event: 'Отобрал позицию', points: 2 },
        { event: 'Сход с дистанции', points: -10 },
        { event: 'Выиграл гонку', points: 10 },
        { event: 'Приехал на подиум', points: 8 },
        { event: 'Заработал штраф', points: -3 },
        { event: 'Приехал в очки', points: 3 },
        { event: 'Оказался вне очков', points: -3 },
        { event: 'Гонщик дня', points: 2 }
      ],
      engines: [
        { event: 'Вылетел в Q3', points: -2 },
        { event: 'Прошел в Q2', points: 1 },
        { event: 'Прошел в Q3', points: 2 },
        { event: 'Выиграл квалификацию', points: 3 },
        { event: 'Сход с дистанции', points: -20 },
        { event: 'Выиграл гонку', points: 10 },
        { event: 'Приехал на подиум', points: 8 },
        { event: 'Приехал в очки', points: 3 },
        { event: 'Оказался вне очков', points: -3 }
      ],
      bridges: [
        { event: 'Вылетел в Q3', points: -2 },
        { event: 'Прошел в Q2', points: 1 },
        { event: 'Прошел в Q3', points: 2 },
        { event: 'Выиграл квалификацию', points: 3 },
        { event: 'Выиграл гонку', points: 10 },
        { event: 'Приехал на подиум', points: 8 },
        { event: 'Приехал в очки', points: 3 },
        { event: 'Оказался вне очков', points: -3 },
        { event: 'Удачная стратегия', points: 5 },
        { event: 'Провальная стратегия', points: -5 }
      ],
      pit_stops: [
        { event: 'Лучший пит-стоп уикенда', points: 10 },
        { event: 'Ошибка на пит-стопе', points: -10 },
        { event: 'Удачная остановка', points: 7 },
        { event: 'Удачный двойной пит-стоп', points: 10 }
      ]
    }
  };

  fs.writeFileSync('database.json', JSON.stringify(database, null, 2));
  console.log('Новая база данных создана');
  
  return database;
}

initDatabase();

//Проверка что зашёл с тг
app.post('/isFromTG', (req, res) =>{
  const user = req.body.user;
  console.log('user : ', user);
  if(user){
    res.sendStatus(200);
  } else {
    res.sendStatus(201);
  }
})

//Вход пользователя + проверка на регистрацию
app.post('/entering', (req, res) => {
  const user = req.body.user;

  const exists = database.users.some(u => u.id === user.id);
  if (!exists) {
    const new_user = {
      id: user.id,
      first_name:  user.first_name,
      last_name:  user.last_name,
      language: user.language_code,
      username: user.username,
      photo : user.photo_url,
      team : {
        racer1 : null,
        racer2 : null,
        engine : null,
        pit_stop : null,
        bridge : null
      },
      team_changing: true,
      score: 0,
      money: 100000000,
      team_cost : 0,
      clan : null,
      creatingClan : true,
      admin : false
    };
    console.log('В базу данных добавлен новый пользователь: ' + user.username);
    database.users.push(new_user);
    fs.writeFileSync('database.json', JSON.stringify(database, null, 2));
  }else{
    console.log('\nПользователь  ' + user.username + ' зашёл в бота и он есть в базе данных');
    const bd_user = database.users[database.users.findIndex(item => item.id == user.id)];
    let edited = false;
    if (bd_user.first_name != user.first_name){
      database.users[database.users.findIndex(item => item.id == user.id)].first_name = user.first_name;
      edited = true;
    }
    if (bd_user.last_name != user.last_name ){
      database.users[database.users.findIndex(item => item.id == user.id)].last_name = user.last_name;
      edited = true;
    }
    if (bd_user.username != user.username){
      database.users[database.users.findIndex(item => item.id == user.id)].username = user.username;
      edited = true;
    }
    if (bd_user.photo != user.photo_url){
      database.users[database.users.findIndex(item => item.id == user.id)].photo = user.photo_url;
      edited = true;
    }
    if(edited){
      fs.writeFileSync('database.json', JSON.stringify(database, null, 2));
      console.log('Данные пользователя были перезаписаны в базу данных')
    }
  }
  res.json({ ok: true });
});

//Получение инфы о пользователе
app.post('/getUserInfo', (req, res) =>{
  const user = req.body.user;
  console.log('\nЗагрузка данных пользователя: ', user.username)
  let user_clan = null
  if(database.users.find(item => item.id == user.id).clan != null){
    const cid = database.users.find(item => item.id == user.id).clan
    user_clan = database.clans.find(item => item.id == cid).name
  }
  const data = {
    score : database.users.find(item => item.id == user.id).score,
    photo: database.users.find(item => item.id == user.id).photo,
    money : database.users.find(item => item.id == user.id).money,
    team_cost : database.users.find(item => item.id == user.id).team_cost,
    clan : user_clan
  }
  console.log('Данные отправлены пользователю');
  res.json(data);
});

//Получение инфы о команде пользователе
app.post('/getTeamInfo', (req, res) =>{
  const user = req.body.user;
  console.log('\nПользователь ' + user.username + ' хочет посмотреть свою команду')
  const userTeam = database.users[database.users.findIndex(item => item.id ==user.id)].team;
  let data = {
    racer1 : null,
    racer2 : null,
    engine : null,
    pit_stop : null,
    bridge : null,
    money: database.users[database.users.findIndex(item => item.id ==user.id)].money
  }
  if (userTeam.racer1 != null){
    data.racer1 = database.drivers.find(item => item.id == userTeam.racer1)
  }else{
    data.racer1 = {
      name: "Не выбран",
      cost : 0,
      photo: "../images/drivers/null_choise.jpg"
    }
  }
  if (userTeam.racer2 != null){
    data.racer2 = database.drivers.find(item => item.id == userTeam.racer2)
  }else{
    data.racer2 = {
      name: "Не выбран",
      cost : 0,
      photo: "../images/drivers/null_choise.jpg"
    }
  }
  if (userTeam.engine != null){
    data.engine = database.engines.find(item => item.id == userTeam.engine)
  }else{
    data.engine = {
      name: "Не выбран",
      cost : 0,
      photo: "../images/engines/null_choise.jpg"
    }
  }
  if (userTeam.pit_stop != null){
    data.pit_stop = database.pit_stops.find(item => item.id == userTeam.pit_stop)
  }else{
    data.pit_stop = {
      name: "Не выбран",
      cost : 0,
      photo: "../images/pit_stops/null_choise.jpg"
    }
  }
  if (userTeam.bridge != null){
    data.bridge = database.bridges.find(item => item.id == userTeam.bridge)
  }else{
    data.bridge = {
      name: "Не выбран",
      cost : 0,
      photo: "../images/bridges/null_choise.jpg"
    }
  }
  console.log('Отправка пользователю ' + user.username + ' данных о его команде')
  res.json(data);
})

//Проверка на разрешение изменения команды
app.post('/checkPredictings', (req, res) =>{
  const user = req.body.user;
  if(database.predict_accepting){
    if(database.users.find(item => item.id == user.id).team_changing){
      res.sendStatus(200);
    }else{
      res.sendStatus(201);
    }
  }else{
    res.sendStatus(202);
  }
})

//Получить список
app.post('/getList', (req, res) =>{
  const choise = req.body.choise;
  const user = req.body.user;
  console.log('\nЗапрос базы: ', choise, ', пользователем: ', user.username);
  if (choise == 'racer1' || choise == 'racer2'){
    console.log('Отправка базы пилотов')
    const data = {
      balance : database.users.find(item => item.id == user.id).money,
      base : database.drivers
    }
    res.json(data);
  }
  if (choise == 'engine'){
    console.log('Отправка базы моторов')
    const data = {
      balance : database.users.find(item => item.id == user.id).money,
      base : database.engines
    }
    res.json(data);
  }
  if (choise == 'pit_stop'){
    console.log('Отправка базы пит стопов')
    const data = {
      balance : database.users.find(item => item.id == user.id).money,
      base : database.pit_stops
    }
    res.json(data);
  }
  if (choise == 'bridge'){
    console.log('Отправка базы мостиков')
    const data = {
      balance : database.users.find(item => item.id == user.id).money,
      base : database.bridges
    }
    res.json(data);
  }
})

//Выбор элеметов команды
app.post('/selectTeamOpt', (req, res) =>{
  const user = req.body.user;
  const choise = req.body.option;
  const name = req.body.name;
  console.log('\nПользователь ' + user.usename + ' выбрал себе: ' + choise + ', а именно: ' + name);
  if (choise == 'racer1'){
    console.log('Пользователь: ' + user.usename + ' выбрал себе первого пилота: ' + name);
    const driver = database.drivers.find(item => item.name == name);
    database.users[database.users.findIndex(item => item.id == user.id)].team.racer1 = driver.id;
    fs.writeFileSync('database.json', JSON.stringify(database, null, 2));
    console.log('Выбор сохранён')
    res.sendStatus(200);
  }
  if (choise == 'racer2'){
    console.log('Пользователь: ' + user.usename + ' выбрал себе второго пилота: ' + name);
    const driver = database.drivers.find(item => item.name == name);
    if(driver.id != database.users.find(item => item.id === user.id).team.racer1){
      database.users[database.users.findIndex(item => item.id == user.id)].team.racer2 = driver.id;
      fs.writeFileSync('database.json', JSON.stringify(database, null, 2));
      console.log('Выбор сохранён')
      res.sendStatus(200);
    } else {
      console.log('Ошибка: выбранный пилот уже используется игроком')
      res.sendStatus(201);
    }
  }
  if (choise == 'engine'){
    console.log('Пользователь: ' + user.usename + ' выбрал себе двигатель: ' + name);
    const engine = database.engines.find(item => item.name == name);
    database.users[database.users.findIndex(item => item.id == user.id)].team.engine = engine.id;
    fs.writeFileSync('database.json', JSON.stringify(database, null, 2));
    console.log('Выбор сохранён')
    res.sendStatus(200);
  }
  if (choise == 'pit_stop'){
    console.log('Пользователь: ' + user.usename + ' выбрал себе пит стоп: ' + name);
    const pit_stop = database.pit_stops.find(item => item.name == name);
    database.users[database.users.findIndex(item => item.id == user.id)].team.pit_stop = pit_stop.id;
    fs.writeFileSync('database.json', JSON.stringify(database, null, 2));
    console.log('Выбор сохранён')
    res.sendStatus(200);
  }
  if (choise == 'bridge'){
    console.log('Пользователь: ' + user.usename + ' выбрал себе мостик: ' + name);
    const bridge = database.bridges.find(item => item.name == name);
    database.users[database.users.findIndex(item => item.id == user.id)].team.bridge = bridge.id;
    fs.writeFileSync('database.json', JSON.stringify(database, null, 2));
    console.log('Выбор сохранён')
    res.sendStatus(200);
  }

})

//Сохранить команду
app.post('/saveTeam', (req, res) =>{
  const user = req.body.user;
  console.log('\nПользователь ' + user.username + ' хочет сохранить свою команду')
  if(database.users[database.users.findIndex(item => item.id == user.id)].team_changing == false){
    console.log('Пользователь ' + user.username + ' уже подтвердил состав своей команды')
    res.sendStatus(201);
  }else{
    const user_racer1 = database.users.find(item => item.id == user.id).team.racer1
    const user_racer2 = database.users.find(item => item.id == user.id).team.racer1
    const user_engine = database.users.find(item => item.id == user.id).team.engine
    const user_pit_stop = database.users.find(item => item.id == user.id).team.pit_stop
    const user_bridge = database.users.find(item => item.id == user.id).team.bridge

    let teamCost = database.drivers.find(item => item.id == user_racer1).cost
    teamCost += database.drivers.find(item => item.id == user_racer2).cost
    teamCost += database.engines.find(item => item.id == user_engine).cost
    teamCost += database.pit_stops.find(item => item.id == user_pit_stop).cost
    teamCost += database.bridges.find(item => item.id == user_bridge).cost

    console.log('Итоговая стоимость команды: $', teamCost)
    database.users[database.users.findIndex(item => item.id == user.id)].money -= teamCost;
    database.users[database.users.findIndex(item => item.id == user.id)].team_changing = false;
    database.users[database.users.findIndex(item => item.id == user.id)].team_cost = teamCost;

    fs.writeFileSync('database.json', JSON.stringify(database, null, 2));
    console.log('Команда пользователя сохранена')
    res.sendStatus(200);
  }
})

//Получить список кланов
app.post('/getClansList', (req, res) => {
  const user = req.body.user;
  console.log('\nОтправка данных о кланах');

  const clans = database.clans
    .map(clan => ({
      name: clan.name,
      members: clan.members,
      photo: clan.photo,
      score: clan.score ?? 0
    }))
    .sort((a, b) => b.score - a.score);

  res.json({
    clans,
    isLeader: clans.some(clan => clan.members[0] === user.id)
  });
});

//Создать клан
app.post('/createClan', (req, res) =>{
  const user = req.body.user;
  const name = req.body.name;
  const photo = req.body.photo;
  console.log('\nПользователь ' + user.username + ' хочет создать клан')
  if(database.users.find(item => item.id == user.id).creatingClan){
    const leaders = database.clans.map(item => item.members[0]);
    if(leaders.includes(user.id)){
      console.log('Пользователь уже имеет свой клан')
      res.sendStatus(201);
    } else {
      let id = 0;
      let ids = database.clans.map(item => item.id);
      if (ids.lenght != 0){
        ids.sort((a, b) => b - a);
        id = ids[0];
      }
      const data = {
        id : id + 1,
        name : name,
        photo : photo,
        members : [user.id],
        score : 0,
        invite_code : null,
        black_list : []
      }
      database.clans.push(data)
      database.users[database.users.findIndex(item => item.id == user.id)].clan = id + 1;
      fs.writeFileSync('database.json', JSON.stringify(database, null, 2));
      console.log('Клан пользователя сохранён')
      res.sendStatus(200);
    }
  } else {
    console.log('Пользователь не может создавать кланы')
    res.sendStatus(202);
  }
})

//Рейтинг игроков
app.post('/getUsersList', (req, res) =>{
  console.log('\nОтправка базы пользователей')
  const data = {
    users : database.users.map( user => ({
      first_names : user.first_name,
      last_names :  user.last_name,
      photos : user.photo,
      usernames : user.username,
      scores : user.score
    }))
    .sort((a, b) => b.scores - a.scores)
  };
  res.json(data)
})

//Вступление в клан
app.post('/joinClan', (req, res) => {
  const user = req.body.user;
  const code = parseInt(req.body.code);

  console.log('\nПользователь', user.username, 'хочет вступить в клан');
  const clan = database.clans.find(clan => parseInt(clan.invite_code) === code);

  if (!clan) {
    console.log('Пользователь отправил несуществующий код');
    return res.json(202);
  }

  const dbUser = database.users.find(item => item.id === user.id);
  if (!dbUser) {
    return res.status(404).json('Пользователь не найден');
  }

  if (dbUser.clan !== null) {
    console.log('Пользователь уже состоит в клане');
    return res.json(201);
  }

  if (clan.black_list?.includes(user.id)) {
    console.log('Пользователь в чёрном списке клана');
    return res.json(203);
  }

  if(clan.members.length == 100){
    console.log('Максимальное число участников клана');
    return res.json(204);
  }

  clan.members.push(user.id);
  dbUser.clan = clan.id;

  fs.writeFileSync('database.json', JSON.stringify(database, null, 2));

  console.log('Пользователь вступил в клан', clan.name);
  res.json(clan.name);
});

// Выход из клана
app.post('/leaveClan', (req, res) => {
  const user = req.body.user;
  console.log('\nПользователь ' + user.username + ' хочет покинуть свой клан');

  if (database.clans.some(clan => clan.members[0] === user.id)) {
    console.log('Отказано, пользователь является лидером');
    res.sendStatus(201);
  } else {
    const dbUser = database.users.find(u => u.id === user.id);
    const clan = database.clans.find(c => c.id === dbUser.clan);
    const index = clan.members.indexOf(user.id);

    clan.members.splice(index, 1);
    dbUser.clan = null;

    fs.writeFileSync('database.json', JSON.stringify(database, null, 2));
    console.log('Пользователь вышел из клана');
    res.sendStatus(200);
  }
});

//Геттер для формы клана
app.post('/viewClan', (req, res) =>{
  const clan_name = req.body.clan_name;
  const clan = database.clans.find(item => item.name == clan_name);
  let data = {
    ...clan,
    members : []
  }
  for(let i = 0; i < clan.members.length; i++){
    const user = {
      name : database.users.find(item => item.id == clan.members[i]).username,
      photo : database.users.find(item => item.id == clan.members[i]).photo,
      score : database.users.find(item => item.id == clan.members[i]).score
    }
    data.members.push(user)
  }
  res.json(data);
})

//Геттер для форма изменения клана
app.post('/editClanPage', (req, res) =>{
  const user = req.body.user;
  const clan = database.clans.find(item => item.members[0] == user.id);
  let data = {
    ...clan,
    members : []
  }
  for(let i = 0; i < clan.members.length; i++){
    const user = {
      id : database.users.find(item => item.id == clan.members[i]).id,
      first_name : database.users.find(item => item.id == clan.members[i]).first_name,
      last_name : database.users.find(item => item.id == clan.members[i]).last_name,
      username : database.users.find(item => item.id == clan.members[i]).username
    }
    data.members.push(user)
  }
  res.json(data);
})

//Поменять имя/фото клана
app.post('/changeClanNameOrPhoto', (req, res) =>{
  const name = req.body.name;
  const photo = req.body.photo;
  const user = req.body.user;

  if(photo != ""){
    database.clans.find(item => item.members[0] == user.id).photo = photo
    fs.writeFileSync('database.json', JSON.stringify(database, null, 2));
    console.log('Данные клана ' + database.clans.find(item => item.members[0] == user.id).name + ' обновлены')
  }
  if(name != ""){
    database.clans.find(item => item.members[0] == user.id).name = name
    fs.writeFileSync('database.json', JSON.stringify(database, null, 2));
    console.log('Данные клана ' + database.clans.find(item => item.members[0] == user.id).name + ' обновлены')
  }
  res.sendStatus(200)
})

//Функция генерации кода приглашения
function genCode() {
  return Math.floor(Math.random() * 100000000)
    .toString()
    .padStart(8, '0');
}

//Сгенерировать код приглашения в клан
app.post('/getInvCode', (req, res) =>{
  const user = req.body.user
  let code =  genCode();
  const codes = database.clans.map(item => item.invite_code)
  while (codes.includes(code)){
    code = genCode();
  }
  database.clans.find(item => item.members[0] == user.id).invite_code = code
  fs.writeFileSync('database.json', JSON.stringify(database, null, 2));
  console.log('Сгенерирован код приглашения для клана: ' + database.clans.find(item => item.members[0] == user.id).name)
  res.json(code);
})

//Бан/кик игрока в клане
app.post('/banKickUserFromClan', (req, res) => {
  const user = req.body.user;
  const kick = req.body.kick;

  console.log('Выгоняем/Баним игрока ' + user + ' из клана');
  const userObj = database.users.find(u => u.id == user);
  if (!userObj || !userObj.clan) {
    return res.sendStatus(400);
  }

  const clan = database.clans.find(c => c.id == userObj.clan);
  if (!clan) {
    return res.sendStatus(400);
  }

  clan.members = clan.members.filter(id => id !== user);
  if (!kick) {
    clan.black_list.push(user);
    console.log('Пользователя забанили в клане');
  } else {
    console.log('Пользователя кикнули из клана');
  }
  userObj.clan = null;

  fs.writeFileSync('database.json', JSON.stringify(database, null, 2));
  res.sendStatus(200);
});

//Удалить клан
app.post('/delClan', (req, res) =>{
  const user = req.body.user;
  const cid = database.clans.findIndex(item => item.members[0] == user.id)
  console.log('\nПользователь ' + user.username + ' хочет удалить свой клан ' + database.clans[cid].name)
  database.clans.splice(cid, 1);
  database.users.find(item => item.id == user.id).clan = null;

  fs.writeFileSync('database.json', JSON.stringify(database, null, 2));
  console.log('Клан успешно удалён!')
  res.sendStatus(200);
})

//Получить БД кэфов для админ панели
app.post('/getDBCoefsForAP', (req, res) =>{
  const choise = req.body.choice;
  console.log('Отправка БД для админов: ', choise)
  let data = {}
  if(choise == 'drivers'){
    data = {
      database : database.drivers.map(item => item.name),
      adminTools : database.coefficients.drivers.map(item => item.event)
    }
    res.json(data);
  }
  if (choise == 'engines'){
    data = {
      database : database.engines.map(item => item.name),
      adminTools : database.coefficients.engines.map(item => item.event)
    }
    res.json(data);
  }
  if (choise == 'pit_stops'){
    data = {
      database : database.pit_stops.map(item => item.name),
      adminTools : database.coefficients.pit_stops.map(item => item.event)
    }
    res.json(data);
  }
  if (choise == 'bridges'){
    data = {
      database : database.bridges.map(item => item.name),
      adminTools : database.coefficients.bridges.map(item => item.event)
    }
    res.json(data);
  }
})

//Сохранить результаты гонок
app.post('/saveRaceResult', (req, res) => {
  const editions = req.body.editions;
  const coefficients = database.coefficients;

  console.log('\nПопытка сохранить результаты гонок');

  if (database.race_results && Object.keys(database.race_results).length !== 0) {
    console.log('Ошибка: результаты уже сохранены');
    return res.sendStatus(201);
  }

  // Маппинг категорий к таблицам БД
  const entityTables = {
    drivers: database.drivers,
    engines: database.engines,
    pit_stops: database.pit_stops,
    bridges: database.bridges
  };

  const result = {
    drivers: [],
    engines: [],
    pit_stops: [],
    bridges: []
  };

  console.log('Начинаем подсчёт очков по всем категориям')
  // Подсчёт очков по всем категориям
  Object.keys(editions).forEach(category => {
    editions[category].forEach(entry => {
      const { name, event, number } = entry;

      const entity = entityTables[category].find(e => e.name === name);

      if (!entity) {
        console.log(`Не найден объект "${name}" в категории ${category}`);
        return;
      }

      const coef = coefficients[category].find(c => c.event === event);
      if (!coef) return;

      const points = coef.points * number;
      const existing = result[category].find(e => e.id === entity.id);
      if (existing) {
        existing.score += points;
      } else {
        result[category].push({
          id: entity.id,
          score: points
        });
      }
    });
  });

  console.log('Начинаем начисление очков');

  function getScore(category, id) {
    if (!id) return 0;
    const found = result[category].find(e => e.id === id);
    return found ? found.score : 0;
  }

  database.users.forEach(user => {
    if (!user.team) return;

    const total =
      getScore('drivers', user.team.racer1) +
      getScore('drivers', user.team.racer2) +
      getScore('engines', user.team.engine) +
      getScore('pit_stops', user.team.pit_stop) +
      getScore('bridges', user.team.bridge);

    console.log(`Игрок ${user.id} получает ${total} очков`);

    user.score += total;
    user.money += total * score_to_money;

    if (user.clan != null) {
      const clan = database.clans.find(c => c.id === user.clan);
      if (clan) {
        clan.score = (clan.score || 0) + total;
        console.log(`Клан "${clan.name}" получает ${total} очков`);
      }
    }
  });

  database.race_results = result;
  fs.writeFileSync('database.json', JSON.stringify(database, null, 2));

  console.log('Результаты гонок сохранены');
  res.sendStatus(200);
});

//Получить БД игроков для выдачи прав на создание клана
app.post('/getUsersCCDB', (req, res) =>{
  let data = {
    username: [],
    clanCreating: []
  };
  database.users.forEach(user => {
    data.username.push(user.username);
    data.clanCreating.push(!!user.creatingClan);
  });
  res.json(data)
})

//Выдать/Забрать права на создание клана
app.post('/giveCCRights', (req, res) =>{
  const username = req.body.username;
  const choise = req.body.choise;
  if(choise){
    database.users.find(item => item.username === username).creatingClan = true;
    console.log('Пользователю ' + username + ' выданы права на создание клана')
  } else {
    const user = database.users.find(item => item.username === username)
    user.creatingClan = false;
    const clanIndex = database.clans.findIndex(item => item.members[0] === user.id)

    if(clanIndex != -1){
      database.clans[clanIndex].members.forEach(member => {
        database.users.find(item => item.id === member).clan = null;
      })
      database.clans.splice(clanIndex, 1);
    }
    console.log('У пользователя ' + username + ' отняты права на создание клана. Если у пользователя был клан, то он был удалён')
  }

  fs.writeFileSync('database.json', JSON.stringify(database, null, 2));
  res.sendStatus(200);
})

//Начать новую гонку
app.post('/nextRace', (req, res) =>{
  const rid = database.race_id
  console.log('\nНачало новвой гонки')

  if(rid % 3 == 0){
    console.log('Очистка команд пользователей, т.к. прошло 3 гонки')
    //Обнуление команд пользователей
    database.users.forEach(user => {
      user.team = {
        racer1 : null,
        racer2 : null,
        engine : null,
        pit_stop : null,
        bridge : null
      }
      user.team_changing = true
      user.teamCost = 0
    })
  }

  //Обнуление результатов
  database.race_results = {}
  database.race_id += 1;

  console.log('Новая гонка начата')
  fs.writeFileSync('database.json', JSON.stringify(database, null, 2));
  res.sendStatus(200);
})

//Получить БД игроков для выдачи прав админа
app.post('/getUsersARDB', (req, res) =>{
  let data = {
    username: []
  };
  database.users.forEach(user => {
    if(user.admin){
      data.username.push(user.username);
    }
  });
  res.json(data)
})

//Выдать/Забрать права админа
app.post('/giveAdminRights', (req, res) =>{
  const username = req.body.username;
  const choise = req.body.choise;
  if(choise){
    database.users.find(item => item.username === username).admin = true;
    console.log('Пользователю ' + username + ' выданы права админа')
  } else {
    database.users.find(item => item.username === username).admin = false;
    console.log('У пользователя ' + username + ' отняты права админа')
  }

  fs.writeFileSync('database.json', JSON.stringify(database, null, 2));
  res.sendStatus(200);
})

//Запрос БД для смены цен
app.post('/getDBPrices', (req, res) =>{
  const choise = req.body.choice;
  console.log('Отправка БД для админов: ', choise)
  let data = {}
  if(choise == 'drivers'){
    data = {
      database : database.drivers.map(item => item.name),
      price : database.drivers.map(item => item.cost)
    }
    res.json(data);
  }
  if (choise == 'engines'){
    data = {
      database : database.engines.map(item => item.name),
      price : database.engines.map(item => item.cost)
    }
    res.json(data);
  }
  if (choise == 'pit_stops'){
    data = {
      database : database.pit_stops.map(item => item.name),
      price : database.pit_stops.map(item => item.cost)
    }
    res.json(data);
  }
  if (choise == 'bridges'){
    data = {
      database : database.bridges.map(item => item.name),
      price : database.bridges.map(item => item.cost)
    }
    res.json(data);
  }
})

//Смена цен
app.post('/saveNewPrices', (req, res) =>{
  const editions = req.body.editions;

  console.log('\nПопытка сохранить новые цены');

  if (!editions || typeof editions !== 'object') {
    res.sendStatus(400);
    return;
  }

  const map = {
    drivers: 'drivers',
    engines: 'engines',
    pit_stops: 'pit_stops',
    bridges: 'bridges'
  };

  let updated = 0;

  Object.keys(editions).forEach(category => {
    const dbKey = map[category];
    if (!dbKey || !database[dbKey]) return;

    editions[category].forEach(edit => {
      const { name, cost } = edit;
      if (!name || typeof cost !== 'number') return;

      const item = database[dbKey].find(i => i.name === name);
      if (!item) {
        console.log(`Не найден пункт "${name}" в ${category}`);
        return;
      }

      console.log(`Изменение цены: ${category} | ${name}: ${item.cost} → ${cost}`);

      item.cost = cost;
      updated++;
    });
  });

  if (updated === 0) {
    console.log('Нет изменений для сохранения');
    res.sendStatus(204);
    return;
  }

  fs.writeFileSync('database.json', JSON.stringify(database, null, 2));
  console.log(`Цены сохранены. Обновлено пунктов: ${updated}`);
  res.sendStatus(200);
});

//Проверка на админа
app.post('/checkAdmin', (req, res) =>{
  const user = req.body.user
  let users = []

  database.users.forEach(user => {
    if(user.admin){
      users.push(user.id)
    }
  })

  if(users.includes(user)){
    res.sendStatus(200)
  } else {
    res.sendStatus(201)
  }
})

//Запрос всей БД
app.post('/getDB', (req, res) =>{
  res.json(database);
})

//Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту: ${PORT}`);
});
