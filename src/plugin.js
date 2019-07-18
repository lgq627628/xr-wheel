import Toast from './toast'
let curToast
export default {
    install(Vue, options) {
        Vue.prototype.$toast = function(msg, propsData) { // 我们调用时传递的参数
            if (curToast) curToast.close()
            curToast = createToast({
                Vue,
                msg,
                propsData,
                onClose: () => { // 不置空的话会多执行一次关闭
                    curToast = null
                }
            })
        }
    }
}

/* helpers */
function createToast({Vue, msg, propsData, onClose}) {
    let Constrouctor = Vue.extend(Toast)
    let toast = new Constrouctor({
        propsData
    })
    toast.$slots.default = [msg]
    toast.$mount() // 这个要放在 slot 后面
    toast.$on('close', onClose)
    document.body.appendChild(toast.$el)
    return toast
}