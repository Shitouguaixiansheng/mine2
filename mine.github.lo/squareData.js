//生成相对应的雷数
const mineCountFromList = function(result) {
    let s1 = []
    let n = result.length
    for (let i = 0; i < n; i++) {
        let s2 = result[i]
        for (let j = 0; j < s2.length; j++) {
            let s3 = s2[j]
            if (s3 === 9) {
                s1.push(s3)
            }
        }
    }
    return s1.length
}
// 这段代码的意思是计算二维数组result中值为9的元素的个数。
//
// 首先，定义了一个空数组s1，用于存储值为9的元素。
//
// 然后，使用两个嵌套的for循环遍历二维数组result。外层循环i用于遍历二维数组的行，内层循环j用于遍历二维数组的列。
//
// 在循环过程中，通过s2变量获取二维数组result的第i行，通过s3变量获取第i行第j列的元素。
//
// 如果s3的值等于9，则将其添加到s1数组中。
//
// 最后，返回s1数组的长度，即值为9的元素的个数。
//
// 简而言之，这个函数用于计算二维数组中值为9的元素的个数。
//先生成一个每次用随机函数调用得出不是0就是9的一维数组 ,接着循环9次这样的操作生成一个二维数组
//生成完这个二维数组的时候调用一个判断二维数组里面有多少9的嵌套循环
const randomMine = function() {
    if (Math.random() > 0.9) {
        return 9
    }
    return 0
}

const randomLine = function(n) {
    let result = []
    for (let i = 0; i < n; i++) {
        let s = randomMine()
        result.push(s)
    }
    return result
}

const randomSquare = function(n, mineCount) {
    // log('生成雷的二维数组')
    let result = []
    // 生成 n 列数据
    for (let i = 0; i < n; i++) {
        let s = randomLine(n)
        result.push(s)
    }
    // 生成的数组里里雷的数量
    let listMineCount = mineCountFromList(result)
    // 数组的雷个数 和 要生成的雷个数一致，返回地图数据
    if (listMineCount === mineCount) {
        return result
    }
    // 如果生成的地雷个数不满足要求的地雷个数，递归重新生成数组
    return randomSquare(n, mineCount)
}

// 首先，plus()函数用于给指定位置周围的元素加1。它接受三个参数：array表示二维数组，
// x和y表示指定位置的行和列。在函数内部，通过判断指定位置是否在合法范围内（即不越界）以及指定位置的值是
// 否不等于9，如果满足条件，则将指定位置的值加1。
//
// 然后，markAround1()函数用于对指定位置周围的元素进行标记。它接受三个参数：array表示二维数组，x和y
// 表示指定位置的行和列。在函数内部，首先判断指定位置的值是否等于9。如果等于9，则调用plus()函数分别对指
// 定位置周围的8个方向的元素进行标记。
//
// 简而言之，这两个函数用于对二维数组中指定位置周围的元素进行标记，通过给指定位置周围的元素加1来进行标记。
// markAround1()函数是在指定位置的值为9时调用plus()函数进行标记。
const plus = function(array, x, y) {
    let n = array.length
    if (x >= 0 && x < n && y >= 0 && y < n) {
        if (array[x][y] !== 9) {
            array[x][y] += 1
        }
    }
}

const markAround1 = function(array, x, y) {
    if (array[x][y] === 9) {
        //先标记左边三个,
        plus(array, x - 1, y - 1)
        plus(array, x, y - 1)
        plus(array, x + 1, y - 1)
        plus(array, x - 1, y + 1)
        plus(array, x, y + 1)
        plus(array, x + 1, y + 1)
        plus(array, x - 1, y)
        plus(array, x + 1, y)
    }
}

const clonedSquare = function(array) {
    let s = []
    for (let i = 0; i < array.length; i++) {
        let ss = array[i]
        let sss = clonedArray(ss)
        s.push(sss)
    }
    return s
}

const clonedArray = function(array) {
    return array.slice(0)
}

const markedSquare = function(array) {
    let square = clonedSquare(array)
    for (let i = 0; i < square.length; i++) {
        let line = square[i]
        for (let j = 0; j < line.length; j++) {
            markAround1(square, i, j)
        }
    }
    return square
}

