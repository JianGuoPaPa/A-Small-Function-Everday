/*
 * @Author: jianguopapa
 * @Date: 2021-03-21 16:23:00
 * @LastEditors: jianguopapa
 * @LastEditTime: 2021-03-21 17:08:08
 * @Description: 坚果爸爸
 * @FilePath: /A-Small-Function-Everday/functions/promise.js
 */
/**
 * @description: Promise 对象
 * @param {*} win
 * @return {*}
 */
// new MyPromise((resolve, reject) => {
//     setTimeout(() => {
//       resolve(1)
//     }, 0)
//   }).then(value => {
//     console.log(value)
//   })
// promise有三个状态
;(function (win) {
    const PENDING = 'pending'
    const RESOLVED = 'resolved'
    const REJECTED = 'rejected'
    // 接收promise执行函数fn
    function MyPromise(fn) {
        const that = this
        that.state = PENDING
        that.value = null // value 变量用于保存 resolve 或者 reject 中传入的值
        that.resolvedCallbacks = []
        that.rejectedCallbacks = []
        // 如果不是pending状态就不执行
        function resolve(value) {
            if (that.state === PENDING) {
                that.state = RESOLVED
                that.value = value
                that.resolvedCallbacks.map((cb) => cb(value))
            }
        }
        function reject(value) {
            if (that.state === PENDING) {
                that.state = REJECTED
                that.value = value
                that.rejectedCallbacks.map((cb) => cb(value))
            }
        }
        // 执行promise中写的方法，如果出错要抛出
        try {
            fn(resolve, reject)
        } catch (e) {
            reject(e)
        }
    }
    // .then方法
    MyPromise.prototype.then = function (onFulfilled, onRejected) {
        const that = this
        // 首先判断两个参数是否为函数类型，因为这两个参数是可选参数
        // 不是函数类型时，需要创建一个函数赋值给对应的参数，同时也实现了透传，比如如下代码
        // Promise.resolve(4).then().then((value) => console.log(value))
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (v) => v
        onRejected =
            typeof onRejected === 'function'
                ? onRejected
                : (r) => {
                      throw r
                  }
        // 判断状态的逻辑，当状态不是等待态时，就去执行相对应的函数。
        // 如果状态是等待态的话，就往回调函数中 push 函数，比如如下代码就会进入等待态的逻辑
        // new MyPromise((resolve, reject) => {
        //     setTimeout(() => {
        //       resolve(1)
        //     }, 0)
        //   }).then(value => {
        //     console.log(value)
        //   })
        if (that.state === PENDING) {
            that.resolvedCallbacks.push(onFulfilled)
            that.rejectedCallbacks.push(onRejected)
        }
        if (that.state === RESOLVED) {
            onFulfilled(that.value)
        }
        if (that.state === REJECTED) {
            onRejected(that.value)
        }
    }
    win.MyPromise = MyPromise
})(window)
