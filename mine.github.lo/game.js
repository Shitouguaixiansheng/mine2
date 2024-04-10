const runGame = function(mapSize, mineCount) {

    let squareWithMine = randomSquare(mapSize, mineCount)

    let square = markedSquare(squareWithMine)

    insertTemplate(square)

    initMineCounter(square)

    bindMouseEvent(square)

    bindLevelEvent()
}