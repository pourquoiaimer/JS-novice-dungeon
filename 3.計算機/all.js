//指向標籤 
const btn = document.querySelector('.btnArea');
const passCount = document.querySelector('.passCount');
const nowCount = document.querySelector('.nowCount');


//部份值預先定義
const data = {
    passCountStr: '', //顯示在上方的字串
    nowAnswer: '', //目前的計算結果
    enterNum: '',//剛按下的數字
}

//監聽
btn.addEventListener('click', cheakOrder, false)


//各種行為

function cheakOrder(e) { //判斷點擊內容，選擇行為
    let nowClass = e.target.className; //點擊的按鈕上的class
    let nowClick = e.target.textContent; //點擊的按鈕上的內容
    if ((nowClass.indexOf('grid-item')) == -1) { //如果點的不是按鈕就不管了
        return
    } else {
        switch (true) { //確認點到的是什麼，然後將之進行相應計算
            case nowClass.indexOf("num") >= 1:
                addNum(nowClick); //點擊數字
                break;
            case nowClass.indexOf('operator') >= 1 || nowClass.indexOf('answer') >= 1:
                operatorClick(nowClick); //點擊運算符
                break;
            case nowClass.indexOf('point') >= 1:
                addPoint(nowClick); //點擊小數點
                break;
            case nowClass.indexOf('cancel') >= 1:
                cancel(nowClick); //點擊刪除或退位
                break;
            default:
                console.log("no");
        }
    }
}

function cancel(nowClick) { //清除的事件
    if (nowClick === 'AC') { //全部清除
        data.passCountStr = ''; //上方小紀錄清除
        data.nowAnswer = ''; //現在運算的答案清除
        data.enterNum = ''; //輸入清除
        data.nowAnswer = ''; //答案清除
        nowCount.style.fontSize = '56px'; //把輸入欄位的文字大小重置
        nowCount.textContent = 0; //讓輸入欄位的顯示歸零
        passCount.textContent = data.passCountStr; //上方小紀錄欄位填入清除後結果
    } else { //點擊的是退位符的情況
        if (data.enterNum.length <= 1) { //如果只有一個數字或沒有，則清空輸入紀錄，然後歸零
            data.enterNum = '';
            nowCount.textContent = 0;
        } else { //原本就大於一個數字，則把數字加上去顯示，主要是有用substring變更型別
            data.enterNum = data.enterNum.substring(0, data.enterNum.length - 1);
            innerNum(data.enterNum);
        }
    }
}

function addNum(nowClick) { //輸入數字的事件，增加判斷最後符號是否為等號
    if (data.passCountStr.substr(-1) == '=') { //如果原本輸入的最後一個已經是等號，原本的結果清除
        data.nowAnswer = ''; 
        data.passCountStr = '';
        passCount.textContent = data.passCountStr;
    }
    if (data.enterNum === '' && (nowClick === "0" || nowClick === "00")) { //如果原本還沒輸入數字，又按了零或者零零
        return
    } else { //原本有數字的正常狀況
        data.enterNum = parseFloat(data.enterNum + nowClick).toString();
        innerNum(data.enterNum);
    }
}

function addPoint(nowClick) { //小數點計算
    switch (true) { //主要市判斷在何時要增加小數點
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
    //上方小紀錄顯示出來要是字串，所以變數部份會有字串和數字的型別轉換問題
    let str; 
    datas = datas.toString(); 
    if (datas.indexOf('.') == -1) { //這是千分位的判斷
        str = datas.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1,');
    } else {
        str = datas.toString().replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
    }
    let len = str.length;
    switch (true) { //這是為了因應輸入數字的多少而調整文字大小
        case (len >= 10 && len < 15):
            nowCount.style.fontSize = '40px'
            break;
        case (len >= 15 && len < 20):
            nowCount.style.fontSize = '28px'
            break;
        default:
    }
    nowCount.textContent = str; //最後再整理好要輸出到畫面上的字串
}

function operatorClick(nowClick) { //點擊運算符
    if (data.enterNum === "" || parseFloat(data.enterNum) === 0) { //這是在沒有輸入數字或者數字為零的情況時
        data.enterNum = 0;
    }
    switch (true) { //已經有數字的情況
        case (['+', '-', 'x', '÷'].indexOf(data.passCountStr.substr(-1)) != -1 && data.enterNum == 0): //如果已經有按了加減乘除，就進行運算符的替換
            console.log("最後是符號");
            data.passCountStr = data.passCountStr.substring(0, data.passCountStr.length - 1) + nowClick;
            passCount.textContent = data.passCountStr;
            console.log(data);
            data.enterNum = '';
            break;
        case ((data.passCountStr).indexOf('=') != -1): //如果剛剛已經按了等號，會把原本的結果變成上一個數字，然後加上運算符
            console.log("最後是等號");
            data.passCountStr = data.nowAnswer.toString() + nowClick;
            passCount.textContent = data.passCountStr;
            data.enterNum = '';
            nowCount.textContent = data.enterNum;
            break;
        case (['+', '-', 'x', '÷'].indexOf(data.passCountStr.substr(-1)) == -1 || data.enterNum !== 0): //如果前面一個是數字的話（正常情況）w
            data.nowAnswer = parseFloat(data.nowAnswer + data.passCountStr.substr(-1) + data.enterNum) || data.enterNum;
            data.nowAnswer = getAnswer(data.passCountStr.substr(-1));
            data.passCountStr = data.passCountStr + data.enterNum + nowClick;
            passCount.textContent = data.passCountStr;
            data.enterNum = "";
            innerNum(data.nowAnswer);
            break
        default:
    }
}

function getAnswer(operator) { //按下各種運算符後的計算狀態
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