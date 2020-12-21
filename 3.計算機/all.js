//指向標籤 
const btn = document.querySelector('.btnArea');
const passCount = document.querySelector('.passCount');
const nowCount = document.querySelector('.nowCount');


//部份值預先定義
const data = {
    passCountStr: '', //顯示在上方的字串
    nowAnswer: '', //目前的計算結果
    enterNum: ''
}

//監聽
btn.addEventListener('click', cheakOrder, false)


//各種行為

function cheakOrder(e) { //判斷點擊內容，選擇行為
    let nowClass = e.target.className;
    let nowClick = e.target.textContent;
    if ((nowClass.indexOf('grid-item')) == -1) {
        return
    } else {
        switch (true) { //確認點到的是什麼，然後將之進行相應計算
            case nowClass.indexOf("num") >= 1:
                addNum(nowClick);
                break;
            case nowClass.indexOf('operator') >= 1 || nowClass.indexOf('answer') >= 1:
                operatorClick(nowClick);
                break;
            case nowClass.indexOf('point') >= 1:
                addPoint(nowClick);
                break;
            case nowClass.indexOf('cancel') >= 1:
                cancel(nowClick);
                break;
            default:
                console.log("no");
        }
    }
}

function cancel(nowClick) { //清除的事件
    if (nowClick === 'AC') {
        data.passCountStr = '';
        data.nowAnswer = '';
        data.enterNum = '';
        data.nowAnswer = '';
        nowCount.style.fontSize = '56px';
        nowCount.textContent = 0;
        passCount.textContent = data.passCountStr;
    } else {
        if (data.enterNum.length <= 1) {
            data.enterNum = '';
            nowCount.textContent = 0;
        } else {
            data.enterNum = data.enterNum.substring(0, data.enterNum.length - 1);
            innerNum(data.enterNum);
        }
    }
}

function addNum(nowClick) { //輸入數字的事件，增加判斷最後符號是否為等號
    if (data.passCountStr.substr(-1) == '=') {
        data.nowAnswer = '';
        data.passCountStr = '';
        passCount.textContent = data.passCountStr;
    }
    if (data.enterNum === '' && (nowClick === "0" || nowClick === "00")) {
        return
    } else {
        data.enterNum = parseFloat(data.enterNum + nowClick).toString();
        innerNum(data.enterNum);
    }
}

function addPoint(nowClick) { //小數點計算
    switch (true) {
        case (data.enterNum !== '' && data.enterNum.indexOf('.') === -1):
            data.enterNum = data.enterNum + nowClick;
            break;
        case (data.enterNum === ''):
            data.enterNum = '0.';
            break;
        default:
    }
    innerNum(data.enterNum);
}

function innerNum(datas) { //將結果數字加上千分位判斷及字串長度判斷後填入nowCount欄位
    let str;
    datas = datas.toString();
    if (datas.indexOf('.') == -1) {
        str = datas.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1,');
    } else {
        str = datas.toString().replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
    }
    let len = str.length;
    switch (true) {
        case (len >= 10 && len < 15):
            nowCount.style.fontSize = '40px'
            break;
        case (len >= 15 && len < 20):
            nowCount.style.fontSize = '28px'
            break;
        default:
    }
    nowCount.textContent = str;
}

function operatorClick(nowClick) {
    // if (data.passCountStr.substr(-1) == '=') {
    //     passCount.textContent = data.nowAnswer;
    //     // data.passCountStr='';
    // }
    if (data.enterNum === "" || parseFloat(data.enterNum) === 0) {
        data.enterNum = 0;
    }
    switch (true) {
        case (['+', '-', 'x', '÷'].indexOf(data.passCountStr.substr(-1)) != -1 && data.enterNum == 0):
            console.log("最後是符號");
            data.passCountStr = data.passCountStr.substring(0, data.passCountStr.length - 1) + nowClick;
            passCount.textContent = data.passCountStr;
            console.log(data);
            data.enterNum = '';
            break;
        case ((data.passCountStr).indexOf('=') != -1):
            console.log("最後是等號");
            data.passCountStr = data.nowAnswer.toString() + nowClick;
            passCount.textContent = data.passCountStr;
            data.enterNum = '';
            nowCount.textContent = data.enterNum;

            break;
        case (['+', '-', 'x', '÷'].indexOf(data.passCountStr.substr(-1)) == -1 || data.enterNum !== 0):
            console.log("最後不是符號");
            data.nowAnswer = parseFloat(data.nowAnswer + data.passCountStr.substr(-1) + data.enterNum) || data.enterNum;
            data.nowAnswer = getAnswer(data.passCountStr.substr(-1));
            console.log(data);
            data.passCountStr = data.passCountStr + data.enterNum + nowClick;
            passCount.textContent = data.passCountStr;
            data.enterNum = "";
            innerNum(data.nowAnswer);
            break
        default:
    }
}

function getAnswer(operator) {
    let answer = '';
    switch (operator) {
        case '+':
            console.log("1");
            answer = parseFloat(data.nowAnswer) + parseFloat(data.enterNum);
            break;
        case '-':
            console.log("2");
            answer = parseFloat(data.nowAnswer) - parseFloat(data.enterNum);
            break;
        case 'x':
            console.log("3");
            answer = parseFloat(data.nowAnswer) * parseFloat(data.enterNum);
            break;
        case '÷':
            console.log("4");
            answer = parseFloat(data.nowAnswer) / parseFloat(data.enterNum);
            break;
        default:
            answer = data.enterNum;
    }
    return answer
}