// 根据地图数据生成 DOM节点

// 生成一维元素
const templateCell = function(line, x) {
    let result = ''
    for (let i = 0; i < line.length; i++) {
        let name = line[i]
        let st = `<div class="cell" data-number="${name}" data-x="${x}" data-y="${i}">${name}</div>`
        result += st
    }
    return result
}

// 生成由二维数组载入的,div
const templateRow = function(square) {
    let result = ''
    for (let i = 0; i < square.length; i++) {
        let s = square[i]
        let one = templateCell(s, i)
        let st = `<div class="row clearfix">${one}</div>`
        result += st
    }
    return result
}

const insertTemplate = function(square) {
    let content = e('.content')
    let dom = templateRow(square)
    appendHtml(content, dom)
}