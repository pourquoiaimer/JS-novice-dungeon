const data2017 = [
    {
        kind: 'Wish',
        exist: 1,
        quantity: 5,
        icon: "cake"
    },
    {
        kind: 'Anything',
        exist: 1,
        quantity: 5,
        icon: "stars"
    },
    {
        kind: 'Child',
        exist: 1,
        quantity: 4,
        icon: "child_care"
    },
    {
        kind: 'Wifi',
        exist: 1,
        quantity: 5,
        icon: "wifi"
    },
    {
        kind: 'Flight',
        exist: 1,
        quantity: 1,
        icon: "airplanemode_active"
    }
]; //作業要求的data2017
const data2018 = [
    {
        kind: '1',
        exist: 1,
        quantity: 1,
        icon: ""
    },
    {
        kind: '2',
        exist: 1,
        quantity: 1,
        icon: ""
    },
    {
        kind: '3',
        exist: 1,
        quantity: 1,
        icon: ""
    },
    {
        kind: '4',
        exist: 1,
        quantity: 1,
        icon: ""
    },
    {
        kind: '5',
        exist: 1,
        quantity: 1,
        icon: ""
    },
    {
        kind: '6',
        exist: 1,
        quantity: 1,
        icon: ""
    },
    {
        kind: '7',
        exist: 1,
        quantity: 1,
        icon: ""
    },
    {
        kind: '8',
        exist: 1,
        quantity: 1,
        icon: ""
    },
    {
        kind: '9',
        exist: 1,
        quantity: 1,
        icon: ""
    },
    {
        kind: '10',
        exist: 1,
        quantity: 1,
        icon: ""
    },
    {
        kind: '11',
        exist: 1,
        quantity: 1,
        icon: ""
    },
    {
        kind: '12',
        exist: 1,
        quantity: 1,
        icon: ""
    },
    {
        kind: '13',
        exist: 1,
        quantity: 1,
        icon: ""
    },
    {
        kind: '14',
        exist: 1,
        quantity: 1,
        icon: ""
    },
    {
        kind: '15',
        exist: 1,
        quantity: 1,
        icon: ""
    },
    {
        kind: '16',
        exist: 1,
        quantity: 1,
        icon: ""
    },
    {
        kind: '17',
        exist: 1,
        quantity: 5,
        icon: ""
    },
    {
        kind: '18',
        exist: 1,
        quantity: 10,
        icon: ""
    },
    {
        kind: '19',
        exist: 1,
        quantity: 20,
        icon: ""
    },
    {
        kind: '20',
        exist: 1,
        quantity: 69,
        icon: ""
    },
]  //作業要求的data2018
let customize = [
    {
    }
];
let result = []
let data = data2017 //預設是這個
let timeOutId;
const width = document.querySelector(`#turntable`).clientWidth;  //先將畫圖要用的寬度決定
const height = width; //讓畫圖要用的高度等於寬度
console.log(width, height);

const svg = d3 //在對應位置畫出轉盤的範圍，
    .select(document.querySelector(`#turntable`)) //選定範圍
    .append('svg') //增加svg
    .attr('width', width)   //確定寬度
    .attr('height', height)  //確定高度
    .append('g') //增加一個g標籤
    .attr('transform', `translate(${width / 2}, ${height / 2})`) //這邊是確定圓的位置

const arc = d3.arc().innerRadius(0).outerRadius(width / 2) //抓出畫圓的範圍內框與外框(半徑)




function buildAll() { //建構整個圖案
    let pie = d3.pie().value(d => d.exist) //確認餅圖的資料範圍和切割的值，因為照預設每個區域圖像上都是平均的，所以用了一個屬性來當作被取的值
    svg //新增各個區塊
        .selectAll('path')
        .data(pie(data))
        .enter()   //添加物件
        .append('path')  //增加這個區塊
        .attr('d', arc)  //這裡等於是通過剛剛的值決定它佔多少比例，畫圓弧
        .attr('stroke', '#1F1172') //決定框線顏色
        .attr('stroke-width', '3px') //框縣寬度

    d3.selectAll("path").style("fill", function (d, i, vm) { //這裡是運用D3建議的跳色方法，讓顏色兩不相同，並通過if函式解決當數量為除1之外的奇數時，最後一塊會與第一塊同顏色並相連的問題
        if (vm.length % 2 == 1 && i == vm.length - 1 && vm.length >= 3) { //如果總數超過兩塊且現在要填的這一塊就是最後一塊
            return "#de8af8"
        } else {
            return i % 2 ? "#F0BEFF" : "#343BAA";
        }
    });

    svg //增加獎品文字
        .selectAll('g')
        .data(pie(data))
        .enter()
        .append('text')  //增加文字
        .text(function (d) {  //通過抓資料去填入相應文字，這邊的d等於是包括原本的資料以及可用方法在內的物件，所以會用d.data這樣多一層的指定
            return d.data.kind;
        })
        .attr('text-anchor', 'middle')  //增加文字置中
        .attr('transform', function (d, i, vm) {  //這裡主要是讓文字能夠依照塊狀的角度進行位移和旋轉
            let c = arc.centroid(d) //這裡是抓到該塊狀對應的位置，centroid()是取任何形狀的中心點
            let rotateNum;
            if (vm.length == 1) { //只剩一塊時就讓它顯示在正上方
                c[0] = 0
                c[1] = c[1] * -1
                rotateNum = 0
            } else { //否則就用360度除以塊數得出每一塊的寬度，因要讓指針指在正中間所以取該寬度的一半進行調整
                rotateNum = (360 / vm.length) * (i + 1) - (360 / vm.length / 2)
            }
            return `translate(${c[0] * 1.2},${c[1] * 1.2}) rotate(${rotateNum})` //translate返回的是x軸跟y軸的位移點，因為從圓心開始算所以就乘上1.2，rotate則是讓文字旋轉相應度數
        })
        .attr('class', 'giftName'); //加上class方便後續控制
    d3.selectAll(".giftName").style("fill", function (d, i, vm) { //這邊改用class來做調整，避免和後面的text重疊操作
        if (vm.length % 2 == 1 && i == vm.length - 1 && vm.length >= 3) { //這裡是為文字上色，與塊狀底色規則相反，除1以外的奇數最後一塊一樣有特別設定
            return "#3c0bb9";
        } else {
            return i % 2 ? "#343BAA" : "#F0BEFF";
        }
    });

    svg //增加獎品圖案
        .selectAll('g')
        .data(pie(data))
        .enter()
        .append('text') //用material的方式增加圖案
        .text(function (d) {
            return d.data.icon; //先將icon值在data中預設好並取用
        })
        .attr('text-anchor', 'middle') //圖案置中
        .attr('transform', function (d, i, vm) { //基本與文字的部份相同
            let c = arc.centroid(d)
            let rotateNum;
            if (vm.length == 1) {
                c[0] = 0
                c[1] = c[1] * -1
                rotateNum = 0
            } else {
                rotateNum = (360 / vm.length) * (i + 1) - (360 / vm.length / 2)
            }
            return `translate(${c[0] * 1.4},${c[1] * 1.4}) rotate(${rotateNum})` //只是這邊位移乘上1.4，更遠一些
        })
        .attr('class', 'material-icons giftIcon'); //增加material的class以及自己後續要操控用的class
    d3.selectAll(".giftIcon").style("fill", function (d, i, vm) { //與上面基本相同的顏色操作
        if (vm.length % 2 == 1 && i == vm.length - 1 && vm.length >= 3) {
            return "#3c0bb9";
        } else {
            return i % 2 ? "#343BAA" : "#F0BEFF";
        }
    });
}

function update() { //當有獎項歸零時的畫面調整，基本除了用join-update的方式取代enter()之外沒什麼差別
    let pie = d3.pie().value(d => d.exist) //重新抓一次資料
    svg
        .selectAll('path')
        .data(pie(data))
        .join(
            update => update, //這邊運用d3中的update()方式操作，後續就基本是再重複前面build的操作
        )
        .attr('d', arc)
    d3.selectAll("path").style("fill", function (d, i, vm) {
        if (vm.length % 2 == 1 && i == vm.length - 1 && vm.length >= 3) {
            return "#de8af8"
        } else {
            return i % 2 ? "#F0BEFF" : "#343BAA";
        }
    });
    svg
        .selectAll('.giftName')
        .data(pie(data))
        .join(
            update => update,
        )
        .text(function (d) {
            return d.data.kind
        })
        .attr('transform', function (d, i, vm) {
            let c = arc.centroid(d)
            let rotateNum;
            if (vm.length == 1) {
                c[0] = 0
                c[1] = c[1] * -1
                rotateNum = 0
            } else {
                rotateNum = (360 / vm.length) * (i + 1) - (360 / vm.length / 2)
            }
            return `translate(${c[0] * 1.2},${c[1] * 1.2}) rotate(${rotateNum})`
        })
    d3.selectAll(".giftName").style("fill", function (d, i, vm) {
        if (vm.length % 2 == 1 && i == vm.length - 1 && vm.length >= 3) {
            return "rgb(54, 6, 68)";
        } else {
            return i % 2 ? "#343BAA" : "#F0BEFF";
        }
    });
    svg
        .selectAll('.giftIcon')
        .data(pie(data))
        .join(
            update => update,
        )
        .text(function (d) {
            return d.data.icon
        })
        .attr('text-anchor', 'middle')
        .attr('transform', function (d, i, vm) {
            let c = arc.centroid(d)
            let rotateNum;
            if (vm.length == 1) {
                c[0] = 0
                c[1] = c[1] * -1
                rotateNum = 0
            } else {
                rotateNum = (360 / vm.length) * (i + 1) - (360 / vm.length / 2)
            }
            return `translate(${c[0] * 1.4},${c[1] * 1.4}) rotate(${rotateNum})`
        })
        .attr('class', 'material-icons giftIcon');
    d3.selectAll(".giftIcon").style("fill", function (d, i, vm) {
        if (vm.length % 2 == 1 && i == vm.length - 1 && vm.length >= 3) {
            return "#3c0bb9";
        } else {
            return i % 2 ? "#343BAA" : "#F0BEFF";
        }
    });
}

function lotteryResult(awards) { //根據隨機的結果來改變data
    data[awards].quantity -= 1 //根據隨機結果讓該獎項的數量減一
    console.log(data[awards].kind, data[awards].quantity)  //顯示一下抽到什麼以及剩餘數量
    if (data[awards].quantity === 0) { //如果數量歸零，則將其從data中刪去
        data.splice(awards, 1)
    }
}

function spin() { //點擊press後觸發，先用變數算出本次得獎的獎品，然後讓指針轉圈，轉完後畫面上呈現得獎結果，並用lotteryResult函數在data中減去相應的值 
    $('.congratulation').hide()  //讓慶祝文字隱藏
    $('.result').hide() //隱藏看結果按鈕
    $('#selectData').hide()//隱藏選擇不同data按鈕
    update() //按照上一輪的結果更新圖案
    let prizeNum = getPrize() //透過函數隨機取得本次選到的值(data中的索引值)
    let prizeName = data[prizeNum].kind; //抓出獎品名稱
    let nowDeg = (360 / data.length) * prizeNum + (360 / data.length) / 2; //確定要旋轉的角度
    $('.pointer').css({ "transform": `rotate(${nowDeg + 3600}deg)`, 'transition': 'all 3s ease' }) //這邊讓指針多旋轉10圈再轉到確定的角度，並加上旋轉時間和方式
    $('.indicator').off('click', spin)//讓press暫時不可按
    timeOutId = setTimeout(function () { //讓指針轉完之後執行
        lotteryResult(prizeNum); //根據結果調整data值
        $('.pointer').css({ "transform": `rotate(${nowDeg}deg)`, 'transition': 'all 0s' })  //通過這個動作讓角度值不致於太大
        $('.prizeName').text(prizeName); //改變慶祝文字中的獎品名稱
        $('.congratulation').toggle(); //讓慶祝文字顯示
        $('.indicator').on('click', spin)//讓press變回可按
        $('#selectData').show()
        $('.result').show()
        result.push(prizeName)
        if (data == []) {
            alert('抽完囉')
        }
    }, 3200)
    console.log(timeOutId);

}

function getPrize() { //通過這個函數隨機選出獎品，並回傳是data中的第幾個
    let allPrize = []; //設定獎池變數
    for (let i = 0; i < data.length; i++) { //雙層for函數讓各獎項的索引值依數量添加到獎池中
        for (let l = 0; l < data[i].quantity; l++) {
            allPrize.push(i)
        }
    }
    let randomNum = parseInt(Math.random() * allPrize.length)  //通過隨機取得不超過獎池項數的值
    return allPrize[randomNum] //將隨機值帶入獎池回傳data中的索引值
}

function changeData() {  //用來切換data
    $('.congratulation').hide(); //先讓慶祝文字隱藏
    if ($('#selectData').val() == 'customize') {
        console.log('a');
        $('.customize').show();
        return
    } else {
        $('.customize').hide();
    }
    let chooseData = eval($('#selectData').val()) //取出要用的data
    data = chooseData; //改變data
    svg //清除所有path
        .selectAll('path')
        .remove()
    svg //清除所有text
        .selectAll('text')
        .remove()
    $('.pointer').css({ "transform": `rotate(0)`, 'transition': 'all 0s' }) ///讓指針先歸零
    clearTimeout(timeOutId)
    buildAll() //重新依照修改過得資料繪圖
    $('.indicator').off().on('click', spin) //綁定press的點擊事件
    result = []
}

function customizeBuild() {
    let kinds = [];
    let quantitys = [];
    let check = true
    $('.kind').each(function () {
        if ($(this).val() == "") {
            alert('有名稱/類別未填')
            $(this).addClass('wrong')
            check = false
            return
        } else {
            $(this).removeClass('wrong')
            kinds.push($(this).val())
        }
    })
    $('.quantity').each(function () {
        if ($(this).val() == "" || $(this).val() <= 0) {
            alert('有數量未填寫或填寫錯誤')
            $(this).addClass('wrong')
            check = false
            return
        } else {
            $(this).removeClass('wrong')
            quantitys.push($(this).val())
        }
    })
    if (check == false) { return }
    let len = kinds.length;
    customize = []
    for (let i = 0; i < len; i++) {
        let item = { 'kind': kinds[i], 'exist': 1, 'quantity': quantitys[i], 'icon': "" }
        customize.push(item)
    }
    console.log(customize);
    $('.customize').hide();
    data = customize; //改變data
    svg //清除所有path
        .selectAll('path')
        .remove()
    svg //清除所有text
        .selectAll('text')
        .remove()
    $('.pointer').css({ "transform": `rotate(0)`, 'transition': 'all 0s' }) ///讓指針先歸零
    clearTimeout(timeOutId)
    buildAll() //重新依照修改過得資料繪圖
    $('.indicator').off().on('click', spin) //綁定press的點擊事件
}

function customizeAdd() {
    let str = `<div class="customizeItem">
                    <button class="cancelItem">刪除</button>
                    <input type="text" class="kind">
                    <input type="number" class="quantity">
                </div>`
    $(str).appendTo($('.customizeArea'))
    $('.cancelItem').on('click', cancelItem)
}

function cancelItem() {
    this.parentNode.remove()
}

function showresult() {
    let len = result.length
    let str = '';
    if (result == 0) {
        str = '目前還沒有抽出任何獎品'
    } else {
        for (let i = 0; i < len; i++) {
            str += `第 ${i+1} 位抽中的是：${result[i]}<br>`
        }
    }
    console.log(str);
    Swal.fire({
        title:'目前的抽獎結果是...',
        html:str,
        heightAuto: false,
    })
}

(function () { //直接執行的匿名函數
    buildAll() //畫面構造
    $('.indicator').on('click', spin) //綁定press的點擊事件
    $('#selectData').on('change', changeData) //綁定改變資料的事件
    $('.congratulation').hide(); //先讓慶祝文字隱藏
    $('.customize').hide(); //先讓自訂欄位隱藏
    $('.customizeAdd').on('click', customizeAdd)
    $('.cancelItem').on('click', cancelItem)
    $('.customizeSure').on('click', customizeBuild)
    $('.result').on('click', showresult)

})()


