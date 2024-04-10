// 把地雷个数显示到页面上
const initMineCounter = function(square1) {
    let nineNumber = mineCountFromList(square1)
    let Thunder = e('.thunder')
    Thunder.dataset.thunder = String(nineNumber)
    Thunder.value = `雷数:${nineNumber}`
}