const log = console.log.bind(console)
// const has = classList.contains.bind(classList)
const e = function(selector) {
    let element = document.querySelector(selector)
    if (element === null) {
        let s = `元素没找到，选择器 ${selector} 错误`
        alert(s)
        return null
    } else {
        return element
    }
}
const es = function(selector) {
    let elements = document.querySelectorAll(selector)
    if (elements.length === 0) {
        let s = `元素没找到, 选择器 ${selector} 错误`
        alert(s)
        //
        return []
    } else {
        return elements
    }
}
const BindEvent = function(elements, eventName, callback) {
    elements.addEventListener(eventName, callback)
}
const bindAll = function(selector, eventName, callback) {
    let elements = es(selector)
    for (let i = 0; i < elements.length; i++) {
        let e = elements[i]
        BindEvent(e, eventName, callback)
    }
}
const appendHtml = function(element, html) {
    element.insertAdjacentHTML('beforeend', html)
}
async function f1 () {
    return 2
}
async function f2 () {
    let p = new Promise(resolve => {
        resolve(3)
    })
    return p
}