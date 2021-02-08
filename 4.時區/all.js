const timeData = [ //寫各個時區的設置
    {
        city: 'NEW YORK',
        timeZone: 'America/New_York',
        bgc: 'bgc-black'
    },
    {
        city: 'LONDON',
        timeZone: 'Europe/London',
        bgc: 'bgc-white'
    },
    {
        city: 'BANGKOK',
        timeZone: 'Asia/Bangkok',
        bgc: 'bgc-white'
    },
    {
        city: 'TAIWAN',
        timeZone: 'Asia/Taipei',
        bgc: 'bgc-white'
    },
    {
        city: 'SYDNEY',
        timeZone: 'Australia/Sydney',
        bgc: 'bgc-black'
    }
]

const options = { //關於取時間的一些設置選項，讓呈現出來的時間符合我們需要的格式
    day: 'numeric',    //(e.g., 1)
    month: 'short',    //(e.g., Oct)
    year: 'numeric',   //(e.g., 2019)
    hour: '2-digit',   //(e.g., 02)
    minute: '2-digit', //(e.g., 02)          
    hour12: false,     // 24 小時制
};

const container = document.querySelector('.container'); //指向位置

function getDate(dataTimeZone) { //取時間，再把時間轉成我們要的格式
    options.timeZone = dataTimeZone;
    let date = new Date().toLocaleString('en-us', options)
    return date
}

function test() { //基本上就是從取好的時間裡把需要的部份取出來，再組字串丟到頁面上去
    let str = '';
    timeData.forEach((data) => {
        let nowDate = getDate(data.timeZone);
        let nowTime = nowDate.substr(-5);
        let nowDay = nowDate.substr(4, 2) + " " + nowDate.substr(0, 3) + ". " + nowDate.substr(8, 4);
        str += `<div class="time-zone ${data.bgc}">
        <div class="nameDay">
            <span class="city">${data.city}</span>
            <span class="day">${nowDay}</span>
        </div>
        <div class="time">
            <span class="now-time">${nowTime}</span>
        </div>
    </div>`;
    });
    container.innerHTML = `<div class="h1">WORLD CLOCK</div>${str}`;
}
setInterval(test, 10000);
test();
