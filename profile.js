const userid = tg.initDataUnsafe.user.id;

 fetch('/getUserInfo', {
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