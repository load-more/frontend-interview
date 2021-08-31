// import StateMachine from 'javscript-state-machine'
const StateMachine = require('javascript-state-machine')

// 有限状态机模型
const fsm = new StateMachine({
    init: 'pending',
    transitions: [
        {
            name: 'resolve',
            from: 'pending',
            to: 'fullfilled'
        },
        {
            name: 'reject',
            from: 'pending',
            to: 'rejected'
        }
    ],
    methods: {
        onResolve(state, data) {
            // state: 当前状态实例，data - fsm.resolve(xxx) 执行时传递的参数
            data.successList.forEach(fn => fn())
        },
        onReject() {
            // state: 当前状态实例，data - fsm.resolve(xxx) 执行时传递的参数
            data.failList.forEach(fn => fn())
        }
    }
})

class _Promise {
    constructor(fn) {
        this.successList = []
        this.failList = []

        fn(() => {
            fsm.resolve(this)
        }, () => {
            fsm.reject(this)
        })
    }
    then(successFn, failFn) {
        this.successList.push(successFn)
        this.failList.push(failFn)
    }
}

function loadImg(url) {
    return new _Promise((resolve, reject) => {
        // const img = document.createElement('img')
        // img.onload = function() {
        //     resolve(img)
        // }
        // img.onerror = function() {
        //     reject()
        // }
        // img.src = url
        setTimeout(() => {
            resolve('yyy')
        }, 1000)
    })
}

const url  = 'https://gitee.com/gainmore/imglib/raw/master/img/20210804230109.png'
const rst = loadImg(url)

rst.then((res) => {
    console.log('ok1');
    console.log(res);
}, () => {
    console.log('fail1');
})

rst.then(() => {
    console.log('ok2');
}, () => {
    console.log('fail2');
})
