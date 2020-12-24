const db = firebase.database();
var app = new Vue({
    el: '#app',
    data: {
        newTodo: '',
        todos: [//creat裡面去更新資料庫
        ],
        cacheTodo: {},
        cacheTitle: {},
        visibility: 'all',
    },
    methods: {
        addTodo: function () {
            let value = this.newTodo.trim();
            let timesId = Math.floor(Date.now());
            if (!value) {
                return;
            }
            this.todos.push({
                id: timesId,
                title: value,
                completed: false,
            });
            this.newTodo = "";
            setDataOn(this);
            //抓陣列進去資料庫
        },
        removeTodo: function (thisTodo) { //刪去todo事項        
            if (confirm('確定刪除這一項嗎？')) {
                let newIndex = this.todos.findIndex(function (item, key) { //在todos陣列中，找尋id與現在點擊的id一樣的，傳出其陣列序號
                    return thisTodo.id === item.id;
                })
                this.todos.splice(newIndex, 1);  //在todos陣列中刪去該序號的值
                setDataOn(this);
            }
        },
        editTodo: function (item) {
            this.cacheTodo = item;
            this.cacheTitle = item.title;
        },
        cancelEdit: function () {
            this.cacheTodo = "";

        },
        doneEdit: function (item) {
            item.title = this.cacheTitle;
            this.cacheTitle = "";
            this.cacheTodo = {};
            //更新資料庫
            setDataOn(this);
        },
        removeAll: function () {
            if (confirm('確定要刪除全部紀錄嗎？')) {
                this.todos = [];
                setDataOn(this);
            }
        },
        removeCompleted: function () {
            if (confirm('確定要刪除全部完成的todo嗎？')) {
                this.todos = this.todos.filter(function (item) {
                    return !item.completed;
                })
                setDataOn(this);
            }
        },
    },
    computed: {
        filterTodos: function () {
            let newTodos = [];
            switch (true) {
                case (this.visibility == "all"):
                    return this.todos;
                    break;
                case (this.visibility == "active"):
                    this.todos.forEach(function (item) {
                        if (!item.completed) {
                            newTodos.push(item);
                        }
                    })
                    return newTodos;
                    break;
                case (this.visibility == "completed"):
                    this.todos.forEach(function (item) {
                        if (item.completed) {
                            newTodos.push(item);
                        }
                    })
                    return newTodos;
                    break;
                default:
            }
        },
        countTodos: function () {
            let newTodos = []
            this.todos.forEach(function (item) {
                if (!item.completed) {
                    newTodos.push(item);
                }
            })
            return newTodos.length;
        },
    },
    created() {
        getDataFirst(this);
    },
})



//firebase的

function getDataFirst(datas) {
    db.ref('/todoList/mytodo').once('value', function (snapshot) {
        if (snapshot) {
            let data = snapshot.val();
            if (!data) {
                return;
            } else {
                for (let i = 0; i < data.length; i++) {
                    datas.todos.push(data[i]);
                }
            }
        } else {
            alert('沒連網路還是firbase有狀況，抓不到原本的記事喔？')

        }

    });
}




function setDataOn(data) {
    db.ref('/todoList/mytodo').set(data.todos).then(function () {
        console.log("建立成功");
    }).catch(function () {
        alert('可能是伺服器錯誤，請稍後再試');
    });
}


function getdataAll() {  //測試上傳，算是成功吧，暫不使用或至少不動到testAll這個資料夾
    for (let i = 0; i < dataName.length; i++) {
        console.log(dataName.length);
        $.ajax({
            type: "Get",
            url: `./test/${dataName[i].name}`,
            dataType: 'json',
            contentType: "application/xml; charset=UTF-8",
            success: function (data) {
                db.ref(`/testData/${dataName[i].name}`).set(data
                ).then(function () {
                    console.log("建立成功");
                }).catch(function () {
                    console.log('可能是伺服器錯誤，請稍後再試');
                });
            }
        });
    }
}

function pushTest(data) {
    console.log(data);
    db.ref('/').push({
        data
    }).then(function () {
        alert("建立成功");
    }).catch(function () {
        alert('可能是伺服器錯誤，請稍後再試');
    });
}

function setToFirebase() {
    console.log(dataAll);
    db.ref('/').set([dataAll[0], dataAll[1]]
    ).then(function () {
        alert("建立成功");
    }).catch(function () {
        alert('可能是伺服器錯誤，請稍後再試');
    });
}

function updateToFirebase() {
    db.ref('/friend').update({
        item
    }).then(function () {
        alert("建立成功");
    }).catch(function () {
        alert('可能是伺服器錯誤，請稍後再試');
    });
}

function cleanAll() {
    db.ref().remove();
}


//sortable.js的設定
var el = document.getElementById( "items" );
Sortable.create(el, {
    // 參數設定[註1]
    disabled: false, // 關閉Sortable
    animation: 150,  // 物件移動時間(單位:毫秒)
    handle: ".hand",  // 可拖曳的區域
    filter: "",  // 過濾器，不能拖曳的物件
    preventOnFilter: true, // 當過濾器啟動的時候，觸發event.preventDefault()
    draggable: ".item",  // 可拖曳的物件
    ghostClass: "sortable-ghost",  // 拖曳時，給予物件的類別
    chosenClass: "sortable-chosen",  // 選定時，給予物件的類別
    forceFallback: false  // 忽略HTML5 DnD
});