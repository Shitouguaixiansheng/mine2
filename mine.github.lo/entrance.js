const openAround = function(square, x, y) {
    openMake(square, x - 1, y - 1)
    openMake(square, x - 1, y)
    openMake(square, x - 1, y + 1)
    openMake(square, x, y - 1)
    openMake(square, x, y + 1)
    openMake(square, x + 1, y - 1)
    openMake(square, x + 1, y)
    openMake(square, x + 1, y + 1)
}

const openMake = function(square, x, y) {
    let len = square.length
    if (x >= 0 && x < len && y >= 0 && y < len) {
        let tag = e(`[data-x="${x}"][data-y="${y}"]`)
        let has = tag.classList.contains.bind(tag.classList)
        if (!has('down') || (!has('down') && !has('float') && !has('Chess'))) {
            let number = square[x][y]
            if (number > 0 && number <= 8) {
                openMaker(x, y)
            } else if (number === 0) {
                openMaker(x, y)
                return openAround(square, x, y)
            }
        }
    }
}

const pressAround = function(square, x, y) {
    pressMake(square, x - 1, y - 1)
    pressMake(square, x - 1, y)
    pressMake(square, x - 1, y + 1)
    pressMake(square, x, y - 1)
    pressMake(square, x, y + 1)
    pressMake(square, x + 1, y - 1)
    pressMake(square, x + 1, y)
    pressMake(square, x + 1, y + 1)
}
const pressMake = function(square, x, y) {
    log('执行判断周边函数')
    let n = square.length
    if (x >= 0 && x < n && y >= 0 && y < n) {
        let self = e(`[data-x="${x}"][data-y="${y}"]`)
        let has = self.classList.contains.bind(self.classList)
        if (!has('down') && !has('float') && !has('Chess')) {
            self.classList.add('float')
        }
    }
}

const removePressAround   = function(square, x, y) {
    removePressMake(square, x - 1, y - 1)
    removePressMake(square, x - 1, y)
    removePressMake(square, x - 1, y + 1)
    removePressMake(square, x, y - 1)
    removePressMake(square, x, y + 1)
    removePressMake(square, x + 1, y - 1)
    removePressMake(square, x + 1, y)
    removePressMake(square, x + 1, y + 1)
}
const removePressMake = function(square, x, y) {
    log('执行判断周边函数')
    let len = square.length
    if (x >= 0 && x < len && y >= 0 && y < len) {
        let self = e(`[data-x="${x}"][data-y="${y}"]`)
        let has = self.classList.contains.bind(self.classList)
        if (!has('down') && has('float') && !has('Chess')) {
            log('将带有float的标签函数删除来')
            self.classList.remove('float')
        }
    }
}


const checkChessAround = function(square, x, y) {
    let tag = e(`[data-x="${x}"][data-y="${y}"]`)
    let arrayAround = []
    log('检查旗子周边函数返回信息', arrayAround)
    let number1 = checkChessMake(square, x - 1, y - 1)
    arrayAround.push(number1)
    let number2 = checkChessMake(square, x - 1, y)
    arrayAround.push(number2)
    let number3 = checkChessMake(square, x - 1, y + 1)
    arrayAround.push(number3)
    let number4 = checkChessMake(square, x, y - 1)
    arrayAround.push(number4)
    let number5 = checkChessMake(square, x, y + 1)
    arrayAround.push(number5)
    let number6 = checkChessMake(square, x + 1, y - 1)
    arrayAround.push(number6)
    let number7 = checkChessMake(square, x + 1, y)
    arrayAround.push(number7)
    let number8 = checkChessMake(square, x + 1, y + 1)
    arrayAround.push(number8)
    let chessArray = []
    for (let i = 0; i < arrayAround.length; i++) {
        let k = arrayAround[i]
        if (k === '1') {
            chessArray.push(k)
        }
    }
    let downSelfNumber = Number(tag.dataset.number)
    let chessCount = chessArray.length
    if (chessCount === downSelfNumber && chessCount > 0) {
        let checkChessDomCount = es('[data-check="check"]')
        for (let i = 0; i < checkChessDomCount.length; i++) {
            let checkChessDom = checkChessDomCount[i]
            let checkChessNumber = Number(checkChessDom.dataset.number)
            if (checkChessNumber !== 9) {
                changeNine(checkChessDom)
                clearTimeCounter()
                checkChessDom.dataset.check = "checkOver"
                checkChessDom.classList.add('down')
            } else {
                checkChessDom.dataset.check = "checkOver"
            }
        }
        log('翻开没被翻开的元素')
        openAround(square, x, y)
    } else {
        pressAround(square, x, y)
    }
}

const checkChessMake = function(square, x, y) {
    let n = square.length
    if (x >= 0 && x < n && y >= 0 && y < n) {
        let tag = e(`[data-x="${x}"][data-y="${y}"]`)
        if (tag.classList.contains('Chess')) {
            tag.dataset.check = 'check'
            return '1'
        }
        return ''
    }
}

const openMaker = function(x, y) {
    let tag = e(`[data-x="${x}"][data-y="${y}"]`)
    let colors = ['color: rgba(0,0,0,0)', 'color: #4343ff;', 'color: rgb(52 135 56);',
        'color: #fb4f6d;', 'purple', 'yellow', 'Orange', 'Cyan']
    let number = Number(tag.dataset.number)
    tag.style.cssText = colors[number]
    tag.classList.add('down')
    if (tag.classList.contains('Chess')) {
        tag.classList.remove('Chess')
    }
}

const changeNine = function(self) {
    let gameOver = e('.gameOver')
    let cells = es('.cell')
    let cellCounter = cells.length
    for (let i = 0; i < cellCounter; i++) {
        let cell = cells[i]
        if (cell.dataset.number === '9' && !cell.classList.contains('Chess')) {
            cell.classList.add('mine')
        } else if (cell.dataset.number !== '9' && cell.classList.contains('Chess')) {
            cell.classList.add('noMine')
        } else if (cell.dataset.number === '9' && cell.classList.contains('Chess')) {
            cell.classList.add('mine')
        }
    }
    gameOver.style.opacity = '1'
    if (self.classList.contains('Chess')) {
        log('旗子不是雷')
        self.classList.add('noMine')
    }
    if (!self.classList.contains('Chess')) {
        self.classList.add('bz')
    }
}

const gameWin = function(square1) {
    let cells = es('.cell')
    let cellsCount = cells.length
    let downList = []
    for (let i = 0; i < cellsCount; i++) {
        let cell = cells[i]
        if (cell.classList.contains('down')) {
            downList.push('1')
        }
    }
    let mine = mineCountFromList(square1)
    let noMineCellCount = cellsCount - mine
    let downCellCount = downList.length
    if (downCellCount === noMineCellCount) {
        clearTimeCounter()
        let win = e('.gameOver')
        win.style.opacity = '1'
        win.style.color = 'red'
        win.innerHTML = '游戏胜利'
    }
}

const __main = function() {
    runGame(9, 10)
}
__main()
