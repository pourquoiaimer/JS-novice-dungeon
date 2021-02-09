// AQI: "25"
// CO: "0.2"
// CO_8hr: "0.3"
// County: "基隆市"
// ImportDate: "2020-12-18 15:30:00.983000"
// Latitude: "25.129167"
// Longitude: "121.760056"
// NO: "1.8"
// NO2: "3.8"
// NOx: "5.6"
// O3: "38.4"
// O3_8hr: "27"
// PM2.5: "3"
// PM2.5_AVG: "4"
// PM10: "10"
// PM10_AVG: "10"
// Pollutant: ""
// PublishTime: "2020/12/18 15:00:00"
// SO2: "2"
// SO2_AVG: "2"
// SiteId: "1"
// SiteName: "基隆"
// Status: "良好"
// WindDirec: "76"
// WindSpeed: "1.5"


const dataUrl = 'https://data.epa.gov.tw/api/v1/aqx_p_432?limit=1000&api_key=9be7b239-557b-4c10-9775-78cadfc555e9&format=json';
let data = [];
let nowCountyData = [];
let nowSiteData = [];

$(document).ready(function () {
    $('.loading').show(500);
    getData();
});

function init() {
    innerCounty();
    getTime();
    setInterval(function () {
        alert('我要重新抓一下資料喔');
        getData();
    }, 60 * 60000);
    $('.loading').hide(500);
}

function getData() { //抓取資料的ajax函數，抓完就把需要的資料存到data裡面
    $.ajax({
        type: 'get',
        url: dataUrl,
        success: function (response) {
            data = response.records;
            data.map(function (datas) { //先加了顏色判斷
                let bgColor = "";
                let AQI = parseInt(datas.AQI);
                switch (true) {
                    case AQI <= 50:
                        bgColor = 'bg-level1';
                        break;
                    case (AQI > 50 && AQI <= 100):
                        bgColor = 'bg-level2';
                        break;
                    case (AQI > 100 && AQI <= 150):
                        bgColor = 'bg-level3';
                        break;
                    case (AQI > 150 && AQI <= 200):
                        bgColor = 'bg-level4';
                        break;
                    case (AQI > 200 && AQI <= 300):
                        bgColor = 'bg-level5';
                        break;
                    default:
                        bgColor = 'bg-level6';
                }
                datas.Color = bgColor;
            })
            init();
        },
        error: function () {
            alert('什麼!!載入資料竟然失敗了!!能麻煩再重新整理看看嗎？拜託了~'); 1
        }
    });
}

$('#selectCounty').on('change', function () {
    let nowCounty = $('#selectCounty').val();
    innerCountyData(nowCounty);
    innerNowData(nowCountyData[0].SiteName);
    $('.site').on('click', function () {
        let nowSiteName = $(this).find('.siteName').text();
        innerNowData(nowSiteName);
    })
})




function innerCounty() {
    let allCountyData = [];
    for (var i = 0; i < data.length; i++) {
        allCountyData.push(data[i].County);
    }
    let filterCounty = allCountyData.filter(function (county, index, self) {
        return self.indexOf(county) === index
    });
    let str = '';
    for (let i = 0; i < filterCounty.length; i++) {
        str += `<option value="${filterCounty[i]}">${filterCounty[i]}</option>`
    }
    str = `<option disabled selected value="請選擇地區">請選擇地區</option>${str}`;
    console.log(str);
    $('#selectCounty').html(str);
}

function innerCountyData(nowCounty) {
    $('.countyName').text(nowCounty);
    nowCountyData = data.filter(function (datas) {
        if (datas.County === nowCounty) {
            return datas
        };
    })
    console.log(nowCountyData);
    let strAll = '';
    for (let i = 0; i < nowCountyData.length; i++) {
        strAll += `<div class="site">
        <div class="siteName">${nowCountyData[i].SiteName}</div>
        <div class="siteAQI ${nowCountyData[i].Color}">${nowCountyData[i].AQI}</div>
        </div>`;
    }

    $('.allCounty').html(strAll);

}

function innerNowData(nowSite) {
    nowSiteData = nowCountyData.filter(function (datas) {
        if (datas.SiteName === nowSite) {
            return datas
        };
    })
    strNow = `<div class="site">
    <div class="siteName">${nowSiteData[0].SiteName}</div>
    <div class="siteAQI ${nowSiteData[0].Color}">${nowSiteData[0].AQI}</div>
</div>
<div class="otherValueList">
    <div class="siteOtherValue bm-1">
        <div class="otherValueName">
            臭氧
            <span>
                O3 (ppb)
            </span>
        </div>
        <div class="otherValueNum">
        ${nowSiteData[0].O3}
        </div>
    </div>
    <div class="siteOtherValue bm-1">
        <div class="otherValueName">
            懸浮微粒
            <span>
                PM10 (μg/m³)
            </span>
        </div>
        <div class="otherValueNum">
        ${nowSiteData[0].PM10}
        </div>
    </div>
    <div class="siteOtherValue bm-1">
        <div class="otherValueName">
            細懸浮微粒
            <span>
                PM2.5 (μg/m³)
            </span>
        </div>
        <div class="otherValueNum">
        ${nowSiteData[0]["PM2.5"]}
        </div>
    </div>
    <div class="siteOtherValue bm-1">
        <div class="otherValueName">
            一氧化碳
            <span>
                CO (ppm)
            </span>
        </div>
        <div class="otherValueNum">
        ${nowSiteData[0].CO}
        </div>
    </div>
    <div class="siteOtherValue bm-1">
        <div class="otherValueName">
            二氧化硫
            <span>
                SO2 (ppb)
            </span>
        </div>
        <div class="otherValueNum">
        ${nowSiteData[0].SO2}
        </div>
    </div>
    <div class="siteOtherValue">
        <div class="otherValueName">
            二氧化氮
            <span>
                NO2 (ppb)
            </span>
        </div>
        <div class="otherValueNum">
        ${nowSiteData[0].NO2}
        </div>
    </div>
</div>
</div>`;
    $('.nowSite').html(strNow);
}

function getTime() {
    let nowDate = new Date();
    let time = `${nowDate.getHours()}:${nowDate.getMinutes()}`;
    let str = `${nowDate.getFullYear()}-${nowDate.getMonth()}-${nowDate.getDate()} ${time} `;
    $('.time').text(str);
}
