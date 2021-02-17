
// tl  tm  tr
// cl  cm  cr
// bl  bm  br


const winCode = { //條列所有判定勝利所需的元素
    count3: ['t', 'c', 'b', 'l', 'm', 'r'], //用來判定是否橫直連線的元素 
    allGet1: ['tl', 'cm', 'br'], //斜線的勝利條件
    allGet2: ['bl', 'cm', 'tr'] //斜線的勝利條件
}

let user1 = {
    name: 'user1', //用name來做localstorage的資料判定，存name和對應的成績
    pic: 'bgc-hei', //這個是選擇要使用的圖形的，先有預設比如user1就是圈然後user2就是叉
    gotCode: '',
}

let user2 = {
    name: 'user2', //用name來做localstorage的資料判定，存name和對應的成績
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
    $('.user1Score').text(allScore[0])
    $('.user2Score').text(allScore[1])
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
        let bgc = ((nowUser.name == 'user1') ? 'bgc-hei' : 'bgc-pai')
        $('.result').text('WINNER!')
        $('.endPage').addClass(bgc)
        let i = ((nowUser.name == 'user1') ? 0 : 1)
        console.log(i);
        allScore[i] += 1
        localStorage.setItem('score', JSON.stringify(allScore));
        getScore()
        restart()
    } else {
        if (countGrid() == 0) { //當格子沒了又沒分出勝負時，進行平手判定
            $('.result').text('@DRAW@')
            $('.endPage').addClass('bgc-draw')
            restart()
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

function restart() {
    $('.endPage').show()
    $('.grid-container').hide()
    user1.gotCode = '';
    user2.gotCode = '';
    round = 1;
    nowUser = ((round % 2 == 1) ? user1 : user2);
    $(`.${user1.name}`).addClass('nowUser')
    $(`.${user2.name}`).removeClass('nowUser')
    $('.grid-item').data('occupied', 'false');
    $('.grid-item').removeClass('bgc-pai');
    $('.grid-item').removeClass('bgc-hei');
}

function init() {
    $(`.${user1.name}`).addClass('nowUser')
    getScore()
    $('.startBtn').on('click', function () {
        $('.startPage').hide()
    })
    $('.restartBtn').on('click', function () {
        $('.endPage').removeClass('bgc-hei');
        $('.endPage').removeClass('bgc-pai');
        $('.endPage').removeClass('bgc-draw');
        $('.endPage').hide()
        $('.grid-container').show()
    })
    $('.endPage').hide()
}

init()
