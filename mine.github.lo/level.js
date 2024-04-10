
const clear = function(content) {
    log('clear')
    const son = content.childNodes;
    for (let i = son.length - 1; i >= 0; i--) {
        content.removeChild(son[i]);
    }
}
const bindLevelEvent = function() {
    let content = e('.content')
    let buttons = e('.buttons')
    BindEvent(buttons, 'click', function(event) {
        clear(content)
        let time = e('.time')
        time.value = `时间:${0}`
        clearTimeCounter()
        content.removeEventListener('mousedown', actionLeftMouseDown)
        content.removeEventListener('mousedown', actionRightMouseDown)
        let self = event.target
        if (self.classList.contains('button-1')) {
            runGame(9, 10)
        }
        if (self.classList.contains('button-2')) {
            runGame(16, 40)
        }
        if (self.classList.contains('button-3')) {
            runGame(32, 90)
        }
    })
}
