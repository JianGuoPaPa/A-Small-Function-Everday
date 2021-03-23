/*
 * @Author: jianguopapa
 * @Date: 2021-03-22 00:43:40
 * @LastEditors: jianguopapa
 * @LastEditTime: 2021-03-23 23:52:13
 * @Description: 坚果爸爸
 * @FilePath: /A-Small-Function-Everday/functions/2048.js
 */
// 4*4的格子
;(function (win) {
    // 游戏背景图样式
    const mapStyle =
        'width:500px;height:500px;margin:0 auto;background:skyblue;position:relative;transition:all ease-out .3s;'
    // 背景图上的栅格样式
    const gridStyle =
        'width:100px;height:100px;margin:20px 0 0 20px;display:inline-block;vertical-align:top;overflow:hidden;background:#ccc;'
    // 数字方块样式
    const childStyle =
        'width:100px;height:100px;margin:20px 0 0 20px;display:inline-block;overflow:hidden;background:#ff0;position:absolute;transition:all ease-out .3s;transform:scale(0);text-align:center;line-height:100px;font-size:28px;'
    // 分数栏样式
    const scoreStyle =
        'width:500px;height:50px;background:skyblue;position:fixed;top:10px;left:50%;transform:translateX(-50%);line-height:50px;text-align:center;color:#fff;font-size:28px;opacity:0;transition:all ease-out .3s;'
    // 获取元素
    function $(el) {
        return document.querySelector(el)
    }
    let Game = {
        score: 0,
        initBlockNum: 4,
        positionData: [],
        currentBlocks: [],
        gameMap: undefined,
        // 开始游戏
        start() {
            if (this.gameMap) return
            console.log(this)
            this.gameMap = this.drawMap()
        },
        // 两个数中随机取一个
        getRandomTwo(num1, num2) {
            return [num1, num2][Number(Math.random() > 0.5)]
        },
        // 创建元素设置类名
        getDiv(className) {
            const div = document.createElement('div')
            div.className = className
            return div
        },
        // 16个格子中的随机没有被占用的位置坐标
        getRandomPosition() {
            const x = Math.round(Math.random() * 3)
            const y = Math.round(Math.random() * 3)
            for (let i = 0; i < this.positionData.length; i++) {
                if (
                    this.positionData[i][0] === x &&
                    this.positionData[i][1] === y
                ) {
                    return this.getRandomPosition()
                }
            }
            return [x, y]
        },
        // 生成栅格地图
        drawMap() {
            const GameMap = this.getDiv('map-container')
            GameMap.style.cssText = mapStyle
            $('body').append(GameMap)
            for (let i = 0; i < 16; i++) {
                const grid = document.createElement('div')
                grid.style.cssText = gridStyle
                GameMap.append(grid)
            }
            // 防止地图还没画完
            setTimeout(() => {
                this.gameMap = GameMap
                this.initChild()
            }, 0)
        },
        // 生成分数栏
        drawScore() {
            const scoreBar = this.getDiv('score-bar')
            scoreBar.innerHTML = '分数: 0'
            scoreBar.style = scoreStyle
            $('body').append(scoreBar)
            setTimeout(() => {
                scoreBar.style.opacity = 1
                this.initEventHandler()
            }, 50)
        },
        // 开始游戏最初那几个
        initChild() {
            for (let i = 0; i < this.initBlockNum; i++) {
                const Child = this.getDiv('block')
                const [x, y] = this.getRandomPosition()
                this.positionData.push([x, y])
                Child.innerHTML = this.getRandomTwo(2, 4)
                Child.style.cssText = childStyle
                Child.style.left = x * 120 + 'px'
                Child.style.top = y * 120 + 'px'
                Child.dataset.x = x
                Child.dataset.y = y
                this.gameMap.append(Child)
                this.currentBlocks.push(Child)
            }
            // 设置好样式位置后展示出现的动画
            setTimeout(() => {
                this.currentBlocks.forEach((block) => {
                    block.style.transform = 'scale(1)'
                })
            }, 50)
            // 地图下沉
            setTimeout(() => {
                this.gameMap.style.marginTop = '70px'
            }, 500)
            // 开始渲染分数栏
            setTimeout(() => {
                this.drawScore()
            }, 1000)
        },
        // 开始监听操作
        initEventHandler() {
            window.addEventListener('keydown', (event) => {
                switch (event.keyCode) {
                    // 方向键上下左右
                    case 38:
                    case 40:
                    case 37:
                    case 39:
                }
            })
        },
    }
    win.startGame = Game.start.bind(Game)
})(window)

document.querySelector('button').onclick = startGame
