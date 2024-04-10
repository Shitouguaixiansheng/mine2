// 显示时间的定时器

// 判断定时器是否存在,返回一个布尔值
const notStart = function() {
    let time = e('.time')
    let isStart = time.dataset.start
    if (isStart === 'false') {
        return true
    }
    return false
}

// 获取时间数值,以及分的数量,有点击事件发生时就调用.给住元素绑定一个关于时间的是否启动的值
const runTimeCounter = function() {
    let timeCounter = e('.time')
    let count = 0
    //时间进行函数
    let interval = setInterval(function() {
        timeCounter.value = `时间:${count}`
        count = count + 1
    }, 1000)
    timeCounter.dataset.time = String(interval)
    timeCounter.dataset.start = 'true'
}

// 清除定时器
const clearTimeCounter = function() {
    let timeCounter = e('.time')
    let number = Number(timeCounter.dataset.time)
    clearInterval(number)
}