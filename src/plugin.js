import Toast from './toast'
export default {
    install(Vue, options) {
        Vue.prototype.$toast = function(msg, toastOpts) { // 我们调用时传递的参数
            let Constrouctor = Vue.extend(Toast)
            let toast = new Constrouctor({
                propsData: toastOpts
            })
            toast.$slots.default = [msg]
            toast.$mount() // 这个要放在 slot 后面
            document.body.appendChild(toast.$el)
        }
    }
}