let db = firebase.database();
let dbTest = '';
var provider = new firebase.auth.GoogleAuthProvider();

var app = new Vue({
    el: '#app',
    data: {
        newTodo: '',
        todos: [//creat裡面去更新資料庫
        ],
        cacheTodo: {},
        cacheTitle: {},
        visibility: 'all',
        status: '未登入',
    },
    methods: {
        addTodo: function () {
            let value = this.newTodo.trim();
            let timesId = Math.floor(Date.now());
            if (!value) {
                return;
            }
            this.todos.push({
                num: this.todos.length,
                id: timesId,
                title: value,
                completed: false,
                important: 1,
                star: 'star_border',
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
        signInGoogle: function () {
            firebase.auth()
                .signInWithPopup(provider)
                .then((result) => {
                    getData(this);
                    alert('登入成功')
                    checkStatus();
                    var token = credential.accessToken;
                    var user = result.user;
                }).catch((error) => {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    // The email of the user's account used.
                    var email = error.email;
                    // The firebase.auth.AuthCredential type that was used.
                    var credential = error.credential;
                    // ...
                });


        },
        signOutGoogle: function () {
            firebase.auth().signOut()
            .then(() => {
                alert('已經退出登入');
                this.todos = [];
                checkStatus();
            }).catch((error) => {
                alert('發生錯誤了啦喔')
            });

        },
        changeStar: function (item) {
            console.log("aa");
            if (item.star == 'star_border') {
                console.log(item.star);
                item.star = 'star'
            } else {
                console.log(item.star);
                item.star = 'star_border'
            }
            setDataOn(this);
        },

    },
    computed: {
        filterTodos: function () {
            let newTodos = [];
            switch (true) {
                case (this.visibility == "all"):
                    newTodos = this.todos;
                    break;
                case (this.visibility == "active"):
                    this.todos.forEach(function (item) {
                        if (!item.completed) {
                            newTodos.push(item);
                        }
                    })
                    break;
                case (this.visibility == "completed"):
                    this.todos.forEach(function (item) {
                        if (item.completed) {
                            newTodos.push(item);
                        }
                    })
                    break;
                default:
            }
            return newTodos;
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
        getData(this)
        setTimeout(checkStatus, 2000);
    },
})



//firebase的

function getData(datas) {
    db.ref('/todoList/mytodo').on('value', function (snapshot) {
        if (snapshot) {
            let data = snapshot.val();
            if (!data) {
                return;
            } else {
                datas.todos = [];
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

function pushTest(data) {
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


function checkStatus() {
    if (firebase.auth().currentUser) {
        // app.$set(app.data,status,'yes');
        app._data.status = 'yes'
        console.log(app._data.status);

    } else {
        app._data.status = 'no'
        console.log(app._data.status);
    }
}
