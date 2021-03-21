/*
 * @Author: jianguopapa
 * @Date: 2021-03-21 15:57:06
 * @LastEditors: jianguopapa
 * @LastEditTime: 2021-03-21 16:21:48
 * @Description: 坚果爸爸
 * @FilePath: /A-Small-Function-Everday/functions/$emit&&on.js
 */

// 立即执行函数
// 定义函数(function(win){})
// 传参并执行 (function (win) {})(window)
/**
 * @description: 一个简单的绑定在window上的时间发出监听功能
 * @param {*} win
 * @return {*}
 */
;(function (win) {
    // 存放事件的对象
    win.$eventSaver = {}
    // 定义$on
    win.$on = function (eventName, callback) {
        this.$eventSaver[eventName] = callback
    }
    // 定义$once
    win.$once = function (eventName, callback) {
        this.$eventSaver[eventName] = callback
        this.$eventSaver[eventName + '$once'] = true
    }
    // 定义$once
    win.$off = function (eventName) {
        delete this.$eventSaver[eventName]
        delete this.$eventSaver[eventName + '$once']
    }
    // 定义$emit
    win.$emit = function (eventName, params) {
        if (this.$eventSaver.hasOwnProperty(eventName)) {
            this.$eventSaver[eventName](params)
            if (this.$eventSaver.hasOwnProperty(eventName + '$once')) {
                this.$off(eventName)
            }
        } else {
            throw new Error(`不存在${eventName}事件的监听`)
        }
    }
})(window)
