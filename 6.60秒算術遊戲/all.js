const startPage = '<div class="startPage"><div class="title"><div class="title-num">60</div><div class="title-text"><p>SECONDS</p><span>+−×÷</span><p>CHALLENGE</p></div></div><button class="startBtn">START!</button><p class="info">try to answer more as you can</p></div>';

const gamePage = '<div class="gamePage"><div class="score-time"><div class="scoreArea"><div class="score-title">60 SECONDS CHALLENGE</div><div class="score-count"><span class="text">SCORE</span><span class="score">0</span></div></div><div class="time">00 : 60</div></div><div class="gameArea"><div class="question"><span class="num1">1</span><span class="operator operatorRandom">+</span><span class="num2">1</span><span class="operator">=</span></div><div><input type="number" class="answer"></div></div>';

{/* <p>press enter to answer</p> */}

const endPage = '<div class="endPage"><div class="end-title">60 SECONDS CHALLENGE</div ><div class="final-score-title">— <span>YOUR FINAL SCORE</span> —</div><span class="final-score">74</span><button class="tryagainBtn">TRY AGAIN!</button></div>';

const operatorAll = ['+', '-', 'x', '÷'];

let nowScore = 0;
let scoreStage = 1;
let nowTime = 60;
let digits = 1;
let num1 = 1;
let num2 = 1;
let operator = '+';
let nowAnswer = eval(`${num1}${operator}${num2}`);

$(document).ready(function () {
    $('.container').html(startPage);
    $('.startBtn').on('click', function () {
        $('.container').html(gamePage);
        gameStart();
    });
});

function gameStart() {
    $('.answer').on('keydown', function (e) {
        if (e.which == 13) {
            checkAnswer()
        }
    })
    let interval = setInterval(() => {
        nowTime = nowTime - 1;
        switch (true) {
            case nowTime == 40:
                digits = 2;
                $('.time').text(`00 : ${nowTime}`);
                break;
            case nowTime == 20:
                digits = 3;
                scoreStage = 5;
                $('.time').text(`00 : ${nowTime}`);
                break;
            case nowTime >= 10:
                $('.time').text(`00 : ${nowTime}`);
                break;
            case nowTime > 0:
                $('.time').text(`00 : 0${nowTime}`);
                break;
            default:
                clearInterval(interval);
                scoreStage = 1;
                nowTime = 60;
                $('.container').html(endPage);
                $('.tryagainBtn').on('click', function () {
                    $('.container').html(gamePage);
                    gameStart();
                });
                $('.final-score').text(nowScore);
                nowScore = 0;
        }
    }, 1000);
}


function makeQuestion() {
    let operatorRandom = parseInt(Math.random() * 4);
    operator = operatorAll[operatorRandom]; //到此已經隨機出本次的運算符
    $('.operatorRandom').text(operator); //將其寫入畫面
    let operatorReal = "";
    switch (operator) {
        case 'x':
            operatorReal = "*";
            break
        case '÷':
            operatorReal = "/";
            break;
        default:
            operatorReal = operator;
            break;
    }

    //以上確定運算符，已寫進畫面並存有operatorReal
    num1 = randomNum(digits);  //先確定一個數字，主要是為了除法更為合理
    $('.num1').text(num1);
    if (operatorReal !== "/") {
        num2 = randomNum(digits);
        $('.num2').text(num2);
    } else { //主要是為了除法時，讓後數會等於前數的因數，減少難度並增加合理性
        let factor = [];
        for (let i = 1; i < num1; i++) {
            if (num1 % i == 0) {
                factor.push(i);
            }
        }
        num2 = factor[parseInt(Math.random() * factor.length)];
        $('.num2').text(num2);
    }
    nowAnswer = eval(`${num1}${operatorReal}${num2}`);
}

function checkAnswer() {
    let yourAnswer = parseInt($('.answer').val());
    if (yourAnswer == nowAnswer) {
        console.log("yes");
        nowScore = nowScore + scoreStage;
        $('.score').text(nowScore);
    } else if (nowScore == 0) {
    } else {
        nowScore = nowScore - 1;
        $('.score').text(nowScore);
    }
    makeQuestion();
    $('.answer').val('')
}

function randomNum(digitsNow) { //依據位數取出本次隨機數
    let digits = Math.pow(10, digitsNow); //本次要用幾位數
    let fixNum = Math.pow(10, digitsNow - 1) //通過減去小一位數取得數字再加回，可以得到我們要的結果
    let num = Math.floor(Math.random() * (digits - fixNum)) + fixNum
    return num;
}
//Math.floor(Math.random()*1) = 0 ，Math.floor(Math.random()*2) = 0 or1，這個算式裡面，能得出的數字區間，會等於0～Math.random乘上的數字-1，那本次因為需要十位數時不要個位，百位時不要個位和十位，所以用*相應位數但減去十分之一，這樣會得到像是0~899的數字，再通過加上被減去的十分之一，得到100~999這個我們所需求的數值。