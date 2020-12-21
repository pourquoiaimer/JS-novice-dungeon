// minuteHand.style.transform = `rotate(${minute / 60 * 360}deg)`;

const hourHand = document.querySelector('.hour-hand');
const minuteHand = document.querySelector('.minute-hand');
const secondHand = document.querySelector('.second-hand');

function changeDay(){
    let date = new Date();
    let nowSecond = date.getSeconds();
    let nowMinute = date.getMinutes() ;
    let nowHour = date.getHours();
    // console.log(nowHour,nowMinute,nowSecond);
    hourHand.style.transform = `rotate(${(nowHour*30)+(nowMinute/2 )}deg)`;
    minuteHand.style.transform =`rotate(${(nowMinute *6)+(nowSecond /10 )}deg)`;
    secondHand.style.transform =`rotate(${nowSecond*6}deg)`;
}
changeDay();
setInterval(changeDay,1000);