import Toast from './toast'
export default {
    install(Vue, options) {
        Vue.prototype.$toast = function(msg) {
            let Constrouctor = Vue.extend(Toast)
            let toast = new Constrouctor()
            toast.$slots.default = [msg]
            toast.$mount() // 这个要放在 slot 后面
            document.body.appendChild(toast.$el)
        }
    }
}