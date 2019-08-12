export default {
    bind: function (el, binding, vnode) {
        document.addEventListener('click', e => {
            let target = e.target
            if (el === target || el.contains(target)) return
            binding.value()
        })
    }
}