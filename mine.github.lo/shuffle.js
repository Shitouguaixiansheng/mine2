const shuffle = function(square) {
    for (let i = 0; i < square.length; i++) {
        let k = Math.floor(Math.random() * i)
        let line = square[k]
        for (let j = 0; j < line.length; j++) {
            let m = Math.floor(Math.random() * j)
            let s = square[k][m]
            let t = square[i][j]
            square[i][j] = square[k][m]
            square[k][m] = t
        }
    }
    return square
}
