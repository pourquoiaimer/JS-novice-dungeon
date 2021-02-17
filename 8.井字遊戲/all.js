
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

function getScore() { //從localstorage取得之前的成績
    allScore = JSON.parse(localStorage.getItem('score'))
    if (allScore == null || allScore == '') { //若原本無成績則預存入[0,0]
        allScore = [0, 0]
    }
    localStorage.setItem('score', JSON.stringify(allScore))
    $('.user1Score').text(allScore[0]) //將成績寫入畫面
    $('.user2Score').text(allScore[1]) //將成績寫入畫面
}

let round = 1; //設置回合
let nowUser = ((round % 2 == 1) ? user1 : user2); //通過回合用餘數判定現在換誰

function jugement() { //判斷輸贏的函式
    let count3 = winCode.count3.some(function (code) { //如果目前有一方獲得的格子代碼中有三個重複則判定為已完成直或橫連線
        return (nowUser.gotCode.split(code)).length === 4
    });
    let allGet1 = winCode.allGet1.every(function (code) { //如果符合斜線的條件1
        return (nowUser.gotCode.split(code)).length === 2
    });
    let allGet2 = winCode.allGet2.every(function (code) { //如果符合斜線的條件2
        return (nowUser.gotCode.split(code)).length === 2
    });
    if (count3 == true || allGet1 == true || allGet2 == true) { //如果其中有任何一個是true則為勝利
        return true
    } else {
        return false
    }
}

function overRound() { //在jugement之後，根據結果執行相應行為
    if (jugement()) { //如果是回傳的是true，代表已分出勝負，並根據nowUser知道現在勝利的是誰
        let bgc = ((nowUser.name == 'user1') ? 'bgc-hei' : 'bgc-pai') //根據勝利者準備後面結算畫面要顯示的圖片
        $('.result').text('WINNER!') //改變結算畫面的文字
        $('.endPage').addClass(bgc) //顯示勝利者圖片
        let i = ((nowUser.name == 'user1') ? 0 : 1) //確認贏家
        allScore[i] += 1 //讓贏家的成績加1
        localStorage.setItem('score', JSON.stringify(allScore)); //將成績存入localStorage
        getScore() //重新抓一次成績
        restart() //準備重開
    } else { //如果沒有分出勝負時
        if (round == 9) { //第9回合選完，表示已補完所有格子
            $('.result').text('@DRAW@') //在結算畫面填入平手文字
            $('.endPage').addClass('bgc-draw')  //在結算畫面填入平手圖案
            restart() //準備重開
        } else { //如果勝負未定且還未佔完格子
            round += 1; //回合數加1
            nowUser = ((round % 2 == 1) ? user1 : user2); //根據回合數切換使用者
            $(`.${user1.name}`).toggleClass('nowUser') //切換使用者圖案邊框顯示
            $(`.${user2.name}`).toggleClass('nowUser') //切換使用者圖案邊框顯示
        }
    }
}

//註冊點擊格子的行為
$('.grid-item').on('click', function () {
    if ($(this).data('occupied') == "true") { //如果這一格已經有人佔，則沒有反應
        console.log("有人佔囉");
        return
    } else { //如果這格還沒有人佔
        $(this).data('occupied', 'true'); //切換佔領狀態
        $(this).addClass(nowUser.pic); //將這格顯示為占領者圖片
        let str = $(this).data('name');
        nowUser.gotCode = nowUser.gotCode + str; //將佔領格子的代碼寫進占領者的資料中
        overRound(); //進行勝負判定或回合切換
    }
});

function restart() { //準備重開新局
    $('.endPage').show() //顯示結算畫面
    $('.grid-container').hide() //隱藏遊戲頁面
    user1.gotCode = ''; //重置獲得的代碼
    user2.gotCode = ''; //重置獲得的代碼
    round = 1; //重置回合
    nowUser = ((round % 2 == 1) ? user1 : user2); //重置順序
    $(`.${user1.name}`).addClass('nowUser') //重置當前使用者
    $(`.${user2.name}`).removeClass('nowUser')
    $('.grid-item').data('occupied', 'false'); //重置所有格子的佔領狀態
    $('.grid-item').removeClass('bgc-pai');
    $('.grid-item').removeClass('bgc-hei');
}

function init() { //開局執行
    $(`.${user1.name}`).addClass('nowUser') //判定使用者
    getScore() //抓一次成績
    $('.startBtn').on('click', function () { //綁定開始按鈕的功能
        $('.startPage').hide() //隱藏開始頁面
    })
    $('.restartBtn').on('click', function () { //綁定重新開始按鈕的功能
        $('.endPage').removeClass('bgc-hei'); //清除結算頁面的相關顯示
        $('.endPage').removeClass('bgc-pai');
        $('.endPage').removeClass('bgc-draw');
        $('.endPage').hide() //隱藏結算頁面
        $('.grid-container').show() //顯示遊戲頁面
    })
    $('.endPage').hide() //開局隱藏結束頁面
}

init() //開局執行
