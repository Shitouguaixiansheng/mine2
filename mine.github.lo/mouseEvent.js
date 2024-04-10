
const isFirstClick = function() {
    let all = es('.cell')
    for (let i = 0; i < all.length; i++) {
        let cell = all[i]
        if (cell.classList.contains('down')) {
            return false
        }
    }
    return true
}
//左键事件
const actionLeftMouseDown = function(event, square) {
    let self = event.target
    let has = self.classList.contains.bind(self.classList)
    let x = Number(self.dataset.x)
    let y = Number(self.dataset.y)
    let selfNumber = Number(self.dataset.number)
    if (event.button === 0) {
        //如果是第一次点击为9,也就是点击到雷上,重新生成数据
        if (isFirstClick()) {
            if (selfNumber === 9) {
                let content = e('.content')
                clear(content)
                runGame(9, 10)
                log('runGame', self)
                self.classList.add('down')
                return
            }
        }
        //如果点击的元素是掀开的
        if (has('down')) {
            checkChessAround(square, x, y)
        }
        //如果点击的元素是有旗子的
        if (has('Chess')) {
            return
        }
        if (notStart()) {
            runTimeCounter()
        }
        if (has('cell')) {
            if (selfNumber === 9) {
                clearTimeCounter()
                changeNine(self)
            } else if (selfNumber > 0 && selfNumber <= 8) {
                openMaker(x, y)
            } else if (selfNumber === 0) {
                self.classList.add('down')
                self.style.cssText = 'color: rgba(0,0,0,0);'
                openAround(square, x, y)
            }
        }
    }
    gameWin(square)
}

const bindMouseLeftDown = function(square) {
    // 给每一行绑 左键按下 的事件
    bindAll('.row', 'mousedown', function(event) {
        actionLeftMouseDown(event, square)
    })
}


const actionLeftMouseUp = function(event, square) {
    let self = event.target
    let x = Number(self.dataset.x)
    let y = Number(self.dataset.y)
    if (event.button === 0) {
        if (self.classList.contains('down')) {
            log('左键抬起执行')
            removePressAround(square, x, y)
        }
    }
}
const bindMouseLeftUp = function(square) {
    log('绑定左键抬起来')
    //左键点击事件
    bindAll('.row', 'mouseup', function(event) {
        actionLeftMouseUp(event, square)
    })
}


const updateMineCounter = function(self) {
    let Thunder = e('.thunder')
    let nb = Number(Thunder.dataset.thunder)
    if (self.classList.contains('Chess')) {
        self.classList.toggle('Chess')
        nb += 1
        log('有旗子，拆下旗子，mine加一')
    } else {
        self.classList.toggle('Chess')
        log('插上旗子，mine减一')
        nb -= 1
    }
    Thunder.dataset.thunder = String(nb)
    Thunder.value = `雷数:${nb}`
}

const actionRightMouseDown = function(event) {
    if (event.button === 2) {
        let self = event.target
        if (self.classList.contains('down')) {
            log('塌陷不能插旗子')
            return
        }
        if (self.classList.contains('cell')) {
            if (notStart()) {
                runTimeCounter()
            }
            updateMineCounter(self)
        }
    }
}


const bindLeftMouse = function(square) {
    bindMouseLeftDown(square)
    bindMouseLeftUp(square)
}

const bindRightMouse = function() {
    bindAll('.row', 'mousedown', actionRightMouseDown)
}


const preventMouseRightMenu = function() {
    let content = e('.content')
    content.oncontextmenu = function() {
        return false
    }
}

const bindMouseEvent = function(square) {
    bindLeftMouse(square)
    bindRightMouse()
    preventMouseRightMenu()
}
