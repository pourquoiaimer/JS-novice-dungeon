const content = document.querySelector('.content'); //確定指向要填入資料的標籤

function count(num){ //用來生成每個數字的乘法表內容的小迴圈
    let countStr = '';
    let innerStr = '';
    for (let i = 1; i < 10; i++) {  //這邊會把每一個帶入的num都跑一次乘1到乘9的過程，並生成相應字串
        countStr += `<div class="number-count">${num} x ${i} = ${num * i }</div>`
    }
    innerStr = `<div class="number-block block"><div class="number-title">${num}</div>${countStr}</div>`; //將上面的乘法字串加入大數字形成完整的區域
    return innerStr
}

function createdAll() {//用迴圈去跑上面count函式的方式，依序生成2到9的乘法表，並組成字串填入相應位置
    let str = '';
    for (let i = 2 ; i<10; i++){ 
        str += `${count(i)}`
    }
    content.innerHTML =`            <div class="title-block block">
    <div class="title-text">
        <p>九九乘法表</p>
        <span class="title-en">MULTIPLICATION CHART</span>
    </div>
    <span class="x x-left-top">x</span>
    <span class="x x-left-bottom">x</span>
    <span class="x x-right-top">x</span>
    <span class="x x-right-bottom">x</span>
</div>${str}` ;
};

createdAll(); //創造


