const { Telegraf, Markup } = require('telegraf');
const fs = require('fs');
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors({
  origin: [
    'https://github.com/dxfusse/tgBot',
    'https://t.me',
    'https://tgbot-3d0d.onrender.com'
  ],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());

const BOT_TOKEN = '8179159056:AAFp_2akr_bkTcq1t6bXnxoUT6xV0EhBvf4';
const WEB_APP_URL = 'https://dxfusse.github.io/tgBot/';

const bot = new Telegraf(BOT_TOKEN);

bot.start((ctx) => {
  ctx.reply(
    '👋 Привет! Я твой помощник в составлении прогнозов на каждую гонку в Формуле 1.\nЧтобы начать, нажми кнопку "Начать" ниже!',
    {
      reply_markup: {
        keyboard: [
          [{ text: '🚀 Начать', web_app: { url: WEB_APP_URL } }]
        ],
        resize_keyboard: true
      }
    }
  );
});
bot.launch();
app.listen(3000, () => console.log('Сервер запущен на порту 3000'));
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
    race_results: []
  };

  fs.writeFileSync('database.json', JSON.stringify(database, null, 2));
  console.log('Новая база данных создана');
  
  return database;
}

initDatabase();

//Вход пользователя + проверка на регистрацию
app.post('/entering', (req, res) => {
  console.log('Заход нового пользователя');
  const info = req.body;
  console.log('Получены данные: ' + info)

//  const exists = database.users.some(u => u.id === uid);
//  if (!exists) {
//    const new_user = {
//      id: uid,
//      username: user.username,
//      score: 0
//    };
//    console.log('В базу данных добавлен новый пользователь: ' + user.username);
//    database.users.push(new_user);
//    fs.writeFileSync('database.json', JSON.stringify(database, null, 2));
//  }else{
//    console.log('Пользователь  ' + user.username + ' зашёл и уже есть в БД');
//  }
});

//Получение инфы о пользователе
app.post('/getUserInfo', (req, res) =>{
    const userid = req.body.userid;
    const data = {
      username : database.users[database.users.find(item => item.id == userid)].username,
      score : database.users[database.users.find(item => item.id == userid)].score
    }
    res.json(data);
})