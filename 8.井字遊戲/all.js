/**value 1 或valu 2 有三個相等
 * 
或兩者的都不重複
用switch寫吧

選擇後就會取得value 1 跟 value 2 s
tl  tm  tr
cl  cm cr
bl   bm   br

value的分配方法？

每次選完就會抓值
有符合條件就會跳出勝利畫面的字串，可用alert
勝負結果存localstorage

一開始設user1跟user2還是先有兩個

用grid分九格
然後用一個值判定目前要放置的是圈或差
增加可自選圖案？
設計一些公共圖案（增加一個選單）
甚至可以用字串的方式
切換角色就是切換字串的組成，
切換裡面的class，來改變其背景圖片

讓字串切換顯示
誰先誰後影響切換的初始值而已
比如就一直是true或false的切換，但誰先誰後影響的是初始的true或者false值
或者是背景？
派大星跟海綿寶寶**/

//1.調整名字並抓取紀錄填入win資料、 2.稍微延長時間  3.

const winCode = {
    count3: ['t', 'c', 'b', 'l', 'm', 'r'],
    allGet1: ['tl', 'cm', 'br'],
    allGet2: ['bl', 'cm', 'tr']
}

let user1 = {
    name: 'SpongeBob', //用name來做localstorage的資料判定，存name和對應的成績
    pic: 'bgc-hei', //這個是選擇要使用的圖形的，先有預設比如user1就是圈然後user2就是叉
    gotCode: '',
}

let user2 = {
    name: 'PtrickStar', //用name來做localstorage的資料判定，存name和對應的成績
    pic: 'bgc-pai', //這個是選擇要使用的圖形的，先有預設比如user1就是圈然後user2就是叉
    gotCode: '',
}

let allScore = [] //用來抓對戰紀錄

function getScore() {
    allScore = JSON.parse(localStorage.getItem('score'))
    if (allScore == null || allScore == '') {
        allScore = [0, 0]
        console.log('還沒有成績');
    }
    localStorage.setItem('score', JSON.stringify(allScore))
    $('.SpongeBobScore').text(allScore[0])
    $('.PtrickStarScore').text(allScore[1])
    // localStorage.setItem('move', JSON.stringify(moveData));
}


let round = 1;
let nowUser = ((round % 2 == 1) ? user1 : user2);
let score = JSON.parse(localStorage.getItem('score')) || {};



function jugement() {
    let count3 = winCode.count3.some(function (code) {
        return (nowUser.gotCode.split(code)).length === 4
    });
    let allGet1 = winCode.allGet1.every(function (code) {
        return (nowUser.gotCode.split(code)).length === 2
    });
    let allGet2 = winCode.allGet2.every(function (code) {
        return (nowUser.gotCode.split(code)).length === 2
    });
    if (count3 == true || allGet1 == true || allGet2 == true) {
        return true
    } else {
        return false
    }
}

function overRound() { //在jugement之後，切換到下個回合
    if (jugement()) {
        alert(`${nowUser.name}贏了！！！！！`)
        let i = ((nowUser.name == 'SpongeBob') ? 0 : 1)
        console.log(i);
        allScore[i] += 1
        localStorage.setItem('score', JSON.stringify(allScore));
        user1.gotCode = '';
        user2.gotCode = '';
        let round = 1;
        nowUser = ((round % 2 == 1) ? user1 : user2);
        getScore()
        $(`.${user1.name}`).addClass('nowUser')
        $(`.${user2.name}`).removeClass('nowUser')
        $('.grid-item').data('occupied', 'false');
        $('.grid-item').removeClass('bgc-pai');
        $('.grid-item').removeClass('bgc-hei');
    } else {
        if (countGrid() == 0) {
            alert(`平局！重新再來～`)
            user1.gotCode = '';
            user2.gotCode = '';
            round = 1;
            nowUser = ((round % 2 == 1) ? user1 : user2);
            $(`.${user1.name}`).addClass('nowUser')
            $(`.${user2.name}`).removeClass('nowUser')
            $('.grid-item').data('occupied', 'false');
            $('.grid-item').removeClass('bgc-pai');
            $('.grid-item').removeClass('bgc-hei');
        } else {
            console.log(nowUser.name);
            round += 1;
            nowUser = ((round % 2 == 1) ? user1 : user2);
            $(`.${user1.name}`).toggleClass('nowUser')
            $(`.${user2.name}`).toggleClass('nowUser')
        }
    }
}


$('.grid-item').on('click', function () {
    if ($(this).data('occupied') == "true") {
        console.log("有人佔囉");
        return
    } else {
        $(this).data('occupied', 'true');
        $(this).addClass(nowUser.pic);
        let str = $(this).data('name');
        nowUser.gotCode = nowUser.gotCode + str;
        // setTimeout(overRound, 100);
        overRound();
    }
});

function countGrid() {
    let grid = 9;
    $('.grid-item').each(function (i, n) {
        if ($(n).data('occupied') == 'true') {
            grid -= 1
        }
    });
    return grid
}

function init() {
    $(`.${user1.name}`).addClass('nowUser')
    getScore()
}

init()
