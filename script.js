const tg = window.Telegram.WebApp;

tg.ready();
tg.expand();

fetch('http://localhost:3000/entering', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({user : tg.initDataUnsafe.user})
})

document.getElementById('app_profile').style.opacity = 0;
document.getElementById('app_prognoz').style.opacity = 0;
document.getElementById('global_top').style.opacity = 0;
document.getElementById('helper').style.opacity = 0;

document.getElementById('profile').onclick = () => {
  document.getElementById('app_profile').style.opacity = 1;
  document.getElementById('app_prognoz').style.opacity = 0;
  document.getElementById('app_global_top').style.opacity = 0;
  document.getElementById('app_helper').style.opacity = 0;
  document.getElementById('app_main').style.opacity = 0;
};
document.getElementById('prognoz').onclick = () => {
  document.getElementById('app_profile').style.opacity = 0;
  document.getElementById('app_prognoz').style.opacity = 1;
  document.getElementById('app_global_top').style.opacity = 0;
  document.getElementById('app_helper').style.opacity = 0;
  document.getElementById('app_main').style.opacity = 0;
};
document.getElementById('global_top').onclick = () => {
  document.getElementById('app_profile').style.opacity = 0;
  document.getElementById('app_prognoz').style.opacity = 0;
  document.getElementById('app_global_top').style.opacity = 1;
  document.getElementById('app_helper').style.opacity = 0;
  document.getElementById('app_main').style.opacity = 0;
};
document.getElementById('helper').onclick = () => {
  document.getElementById('app_profile').style.opacity = 0;
  document.getElementById('app_prognoz').style.opacity = 0;
  document.getElementById('app_global_top').style.opacity = 0;
  document.getElementById('app_helper').style.opacity = 1;
  document.getElementById('app_main').style.opacity = 0;
};

//Раздел для profile
const userid = tg.initDataUnsafe.user.id;

fetch('http://localhost:3000/getUserInfo', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
        body: JSON.stringify({userid : userid})
})
.then(response => response.json())
.then(data =>{
    document.getElementById('name').innerText = data.username;
    document.getElementById('id').innerText = tg.initDataUnsafe.user.id;
    document.getElementById('score').innerText = data.score       
})

document.getElementById('back_profile').onclick = () => {
  document.getElementById('app_profile').style.opacity = 0;
  document.getElementById('app_prognoz').style.opacity = 0;
  document.getElementById('app_global_top').style.opacity = 0;
  document.getElementById('app_helper').style.opacity = 0;
  document.getElementById('app_main').style.opacity = 1;
};


