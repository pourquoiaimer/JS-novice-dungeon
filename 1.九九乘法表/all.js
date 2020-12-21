const content = document.querySelector('.content');

function count(num){
    let countStr = '';
    let innerStr = '';
    for (let i = 1; i < 10; i++) {
        countStr += `<div class="number-count">${num} x ${i} = ${num * i }</div>`
    }
    innerStr = `<div class="number-block block"><div class="number-title">${num}</div>${countStr}</div>`;
    return innerStr
}

function createdAll() {
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

createdAll();




