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
    race_results: []
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
      score: 0
    };
    console.log('В базу данных добавлен новый пользователь: ' + user.username);
    database.users.push(new_user);
    fs.writeFileSync('database.json', JSON.stringify(database, null, 2));
  }else{
    console.log('Пользователь  ' + user.username + ' уже есть в базе данных');
    const bd_user = database.users[database.users.find(item => item.id == user.id)];
    let edited = false;
    if (bd_user.first_name != user.first_name){
      database.users[database.users.find(item => item.id == user.id)].first_name = user.first_name;
      edited = true;
    }
    if (bd_user.last_name != user.last_name ){
      database.users[database.users.find(item => item.id == user.id)].last_name = user.last_name;
      edited = true;
    }
    if (bd_user.username != user.username){
      database.users[database.users.find(item => item.id == user.id)].username = user.username;
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
    console.log('Загрузка данных пользователя: ', user.name)
    const data = {
      first_name: database.users[database.users.find(item => item.id == user)].first_name,
      last_name: database.users[database.users.find(item => item.id == user)].last_name,
      username : database.users[database.users.find(item => item.id == user)].username,
      score : database.users[database.users.find(item => item.id == user)].score
    }
    console.log('Данные отправлены')
    res.json(data);

})

app.post('/getDB', (req, res) =>{
    const userid = req.body.userid;
    res.json(database);

})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту: ${PORT}`);
  console.log(`Mini App доступен на /`);
});
