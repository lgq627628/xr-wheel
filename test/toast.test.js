import Vue from 'vue'
import chai from 'chai'
import sinon from 'sinon'
import sinonChai from "sinon-chai" // 可以不引入'mocha' 和 'sinon-chai'，因为 karma 自动引进了
import Toast from '../src/toast'
const expect = chai.expect;
chai.use(sinonChai)

Vue.config.productionTip = false
Vue.config.devtools = false

describe('Toast', () => {

  it('存在', () => {
    expect(Toast).to.exist
  })

  describe('Props', function() {
    this.timeout(5000) // 修改 mocha 默认时间限制
    it('关于 duration 参数', done => {
      let div = document.createElement('div')
      document.body.appendChild(div)
      const Constructor = Vue.extend(Toast)
      const vm = new Constructor({
        propsData: {
          duration: 1
        }
      }).$mount(div)
      // setTimeout(() => {
      //   expect(document.body.contains(vm.$el)).to.eq(false)
      //   done()
      // }, 3500);
      vm.$on('close', () => {
        expect(document.body.contains(vm.$el)).to.eq(false)
        done()
      })
    })
    it('关于 closeBtn 参数', () => {
      const cb = sinon.fake();
      const Constructor = Vue.extend(Toast)
      const vm = new Constructor({
        propsData: {
          closeBtn: {
            text: '关闭',
            cb
          }
        }
      }).$mount()
      let closeBtn = vm.$el.querySelector('.xr-toast__close')
      let text = closeBtn.textContent.trim()
      expect(text).to.eq('关闭')
      closeBtn.click()
      expect(cb).to.have.been.called
    })
    it('关于 enableHtml 参数', () => {
      const Constructor = Vue.extend(Toast)
      const vm = new Constructor({
        propsData: {
          enableHtml: true
        }
      })
      vm.$slots.default = ['<p id="xr">xr</p>']
      vm.$mount()
      let p = vm.$el.querySelector('#xr')
      expect(p).to.exist
    })
    it('关于 position 参数', () => {
      const Constructor = Vue.extend(Toast)
      const vm = new Constructor({
        propsData: {
          position: 'bottom'
        }
      })
      vm.$mount()
      let classList = vm.$el.classList
      expect(classList.contains('xr-toast--bottom')).to.equal(true)
    })
  })
})