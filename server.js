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

function initDatabase() {
  const filePath = 'database.json';
  
  try {
    if (!fs.existsSync(filePath)) {
      console.log('База данных не существует, создаем...');
      return createNewDatabase(filePath);
    }
    const data = fs.readFileSync(filePath, 'utf8');
 
    if (!data.trim()) {
      console.log('База данных пустая, создаем скелет...');
      return createNewDatabase(filePath);
    }

    database = JSON.parse(data);
    console.log('База данных загружена');
    
  } catch (error) {
    if (error instanceof SyntaxError) {
      console.log('База данных повреждена, создаем новую...');
      return createNewDatabase(filePath);
    } else {
      console.error('Ошибка при загрузке базы данных:', error);
      throw error;
    }
  }
  
  return database;
}

function createNewDatabase(filePath) {
  database = {
    users: [],
    race_id: 1,
    predict_accepting: 1,
    race_results: [],
    drivers: [
      {
        id: 0,
        name: "Макс Ферстаппен",
        cost: 10000,
        photo: "/images/drivers/mv.jpg"
      },
      {
        id: 1,
        name: "Шарль Леклер",
        cost: 9000,
        photo: "/images/drivers/cl.jpg"
      },
      {
        id: 2,
        name: "Льюис Хэмилтон",
        cost: 9500,
        photo: "/images/drivers/lh.jpg"
      },
      {
        id: 3,
        name: "Карлос Сайнс",
        cost: 8500,
        photo: "/images/drivers/cs.jpg"
      },
      {
        id: 4,
        name: "Лиам Лоусон",
        cost: 3000,
        photo: "/images/drivers/ll.jpg"
      },
      {
        id: 5,
        name: "Ландо Норрис",
        cost: 8800,
        photo: "/images/drivers/ln.jpg"
      },
      {
        id: 6,
        name: "Фернандо Алонсо",
        cost: 8200,
        photo: "/images/drivers/fa.jpg"
      },
      {
        id: 7,
        name: "Оскар Пиастри",
        cost: 7500,
        photo: "/images/drivers/op.jpg"
      },
      {
        id: 8,
        name: "Джордж Расселл",
        cost: 8000,
        photo: "/images/drivers/gr.jpg"
      },
      {
        id: 9,
        name: "Юки Цунода",
        cost: 4500,
        photo: "/images/drivers/yt.jpg"
      },
      {
        id: 10,
        name: "Габриэль Бортолето",
        cost: 2000,
        photo: "/images/drivers/gb.jpg"
      },
      {
        id: 11,
        name: "Алекс Албон",
        cost: 5500,
        photo: "/images/drivers/aa.jpg"
      },
      {
        id: 12,
        name: "Франко Колапинто",
        cost: 1800,
        photo: "/images/drivers/fc.jpg"
      },
      {
        id: 13,
        name: "Оливер Берман",
        cost: 2500,
        photo: "/images/drivers/ob.jpg"
      },
      {
        id: 14,
        name: "Нико Хюлькенберг",
        cost: 4000,
        photo: "/images/drivers/nh.jpg"
      },
      {
        id: 15,
        name: "Кими Антонелли",
        cost: 2200,
        photo: "/images/drivers/ka.jpg"
      },
      {
        id: 16,
        name: "Изак Хаджар",
        cost: 1500,
        photo: "/images/drivers/ih.jpg"
      },
      {
        id: 17,
        name: "Эстебан Окон",
        cost: 5000,
        photo: "/images/drivers/eo.jpg"
      },
      {
        id: 18,
        name: "Пьер Гасли",
        cost: 4800,
        photo: "/images/drivers/pg.jpg"
      },
      {
        id: 19,
        name: "Лэнс Стролл",
        cost: 4200,
        photo: "/images/drivers/ls.jpg"
      }
    ],
    engines: [
      {
        id: 0,
        name: "Ferrari",
        cost: 10000,
        photo: "/images/engines/Ferrari.jpg"
      },
      {
        id: 1,
        name: "Mercedes",
        cost: 9000,
        photo: "/images/engines/Mercedes.jpg"
      },
      {
        id: 2,
        name: "Honda",
        cost: 9500,
        photo: "/images/engines/Honda.jpg"
      },
      {
        id: 3,
        name: "Audi",
        cost: 8500,
        photo: "/images/engines/Audi.jpg"
      },
      {
        id: 4,
        name: "Red Bull",
        cost: 3000,
        photo: "/images/engines/Red_Bull.jpg"
      }
    ],
    pit_stops: [
      {
        id: 0,
        name: "Феррари",
        cost: 15000,
        photo: "/images/pit_stops/Феррари.jpg"
      },
      {
        id: 1,
        name: "Мерседес",
        cost: 14500,
        photo: "/images/pit_stops/Мерседес.jpg"
      },
      {
        id: 2,
        name: "Макларен",
        cost: 14000,
        photo: "/images/pit_stops/Макларен.jpg"
      },
      {
        id: 3,
        name: "Ред Булл",
        cost: 15500,
        photo: "/images/pit_stops/Ред Булл.jpg"
      },
      {
        id: 4,
        name: "Рейсинг Булз",
        cost: 12000,
        photo: "/images/pit_stops/Рейсинг Булз.jpg"
      },
      {
        id: 5,
        name: "Астон Мартин",
        cost: 13500,
        photo: "/images/pit_stops/Астон Мартин.jpg"
      },
      {
        id: 6,
        name: "Уильямс",
        cost: 11000,
        photo: "/images/pit_stops/Уильямс.jpg"
      },
      {
        id: 7,
        name: "Хаас",
        cost: 10000,
        photo: "/images/pit_stops/Хаас.jpg"
      },
      {
        id: 8,
        name: "Ауди",
        cost: 13000,
        photo: "/images/pit_stops/Ауди.jpg"
      },
      {
        id: 9,
        name: "Альпин",
        cost: 11500,
        photo: "/images/pit_stops/Альпин.jpg"
      },
      {
        id: 10,
        name: "Кадиллак",
        cost: 12500,
        photo: "/images/pit_stops/Кадиллак.jpg"
      }
    ],
    bridges: [
      {
        id: 0,
        name: "Феррари",
        cost: 8000,
        photo: "/images/bridges/Феррари.jpg"
      },
      {
        id: 1,
        name: "Мерседес",
        cost: 7800,
        photo: "/images/bridges/Мерседес.jpg"
      },
      {
        id: 2,
        name: "Макларен",
        cost: 7500,
        photo: "/images/bridges/Макларен.jpg"
      },
      {
        id: 3,
        name: "Ред Булл",
        cost: 8200,
        photo: "/images/bridges/Ред Булл.jpg"
      },
      {
        id: 4,
        name: "Рейсинг Булз",
        cost: 7000,
        photo: "/images/bridges/Рейсинг Булз.jpg"
      },
      {
        id: 5,
        name: "Астон Мартин",
        cost: 7700,
        photo: "/images/bridges/Астон Мартин.jpg"
      },
      {
        id: 6,
        name: "Уильямс",
        cost: 6800,
        photo: "/images/bridges/Уильямс.jpg"
      },
      {
        id: 7,
        name: "Хаас",
        cost: 6500,
        photo: "/images/bridges/Хаас.jpg"
      },
      {
        id: 8,
        name: "Ауди",
        cost: 7600,
        photo: "/images/bridges/Ауди.jpg"
      },
      {
        id: 9,
        name: "Альпин",
        cost: 7200,
        photo: "/images/bridges/Альпин.jpg"
      },
      {
        id: 10,
        name: "Кадиллак",
        cost: 7400,
        photo: "/images/bridges/Кадиллак.jpg"
      }
    ]
  };

  fs.writeFileSync('database.json', JSON.stringify(database, null, 2));
  console.log('Новая база данных создана');
  
  return database;
}

initDatabase();

//Вход пользователя + проверка на регистрацию
app.post('/entering', (req, res) => {
  console.log('Заход пользователя');
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
      score: 0
    };
    console.log('В базу данных добавлен новый пользователь: ' + user.username);
    database.users.push(new_user);
    fs.writeFileSync('database.json', JSON.stringify(database, null, 2));
  }else{
    console.log('Пользователь  ' + user.username + ' уже есть в базе данных');
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
  console.log('Загрузка данных пользователя: ', user.username)
  const data = {
    score : database.users[database.users.findIndex(item => item.id == user.id)].score,
    photo: database.users[database.users.findIndex(item => item.id == user.id)].photo
  }
  console.log('Данные отправлены пользователю');
  res.json(data);
});

//Получение инфы о команде пользователе
app.post('/getTeamInfo', (req, res) =>{
  const user = req.body.user;
  console.log('Пользователь ' + user.username + ' хочет посмотреть свою команду')
  const userTeam = database.users[database.users.findIndex(item => item.id ==user.id)].team;
  console.log(userTeam)
  let data = {
    racer1 : null,
    racer2 : null,
    engine : null,
    pit_stop : null,
    bridge : null
  }
  if (userTeam.racer1 != null){
    data[racer1] = database.drivers.find(item => item.id == userTeam.racer1)
  }else{
    data[racer1] = {
      name: "Не выбран",
      cost : 0,
      photo: "/images/drivers/null_choise.jpg"
    }
  }
  console.log(data)
  if (userTeam.racer2 != null){
    data[racer2] = database.drivers.find(item => item.id == userTeam.racer2)
  }else{
    data[racer2] = {
      name: "Не выбран",
      cost : 0,
      photo: "/images/drivers/null_choise.jpg"
    }
  }
  console.log(data)
  if (userTeam.engine != null){
    data[engine] = database.engines.find(item => item.id == userTeam.engine)
  }else{
    data[engine] = {
      name: "Не выбран",
      cost : 0,
      photo: "/images/engines/null_choise.jpg"
    }
  }
  console.log(data)
  if (userTeam.pit_stop != null){
    data[pit_stop] = database.pit_stops.find(item => item.id == userTeam.pit_stop)
  }else{
    data[pit_stop] = {
      name: "Не выбран",
      cost : 0,
      photo: "/images/pit_stops/null_choise.jpg"
    }
  }
  console.log(data)
  if (userTeam.bridge != null){
    data[bridge] = database.bridges.find(item => item.id == userTeam.bridge)
  }else{
    data[bridge] = {
      name: "Не выбран",
      cost : 0,
      photo: "/images/bridges/null_choise.jpg"
    }
  }
  console.log(data)
  res.json(data);
})

app.post('/getDB', (req, res) =>{
  res.json(database);
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту: ${PORT}`);
  console.log(`Mini App доступен на /`);
});
