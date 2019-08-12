document.addEventListener('click', e => { // 这样子写的话全局就一个事件监听，也没有必要移除掉
    let target = e.target
    clickEventList.forEach(item => {
        if(item.el === target || item.el.contains(target)) return
        item.cb()
    });
})
let clickEventList = []
export default {
    bind: function (el, binding, vnode) {
        clickEventList.push({el, cb: binding.value})
    }
}