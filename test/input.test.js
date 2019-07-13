import Vue from 'vue'
import chai from 'chai'
import sinon from 'sinon'
import sinonChai from "sinon-chai" // 可以不引入'mocha' 和 'sinon-chai'，因为 karma 自动引进了
import Input from '../src/input'
const expect = chai.expect;
chai.use(sinonChai)

Vue.config.productionTip = false
Vue.config.devtools = false

describe('Input', () => {

  it('存在', () => {
    expect(Input).to.exist
  })

  describe('Props', () => {
    const Constructor = Vue.extend(Input)
    let vm
    afterEach(() => {
      vm.$destroy()
    })
    it('接收 value 参数', () => {
      vm = new Constructor({
        propsData: {
          value: '哈哈'
        }
      }).$mount()
      const useElement = vm.$el.querySelector('input')
      expect(useElement.value).to.equal('哈哈') 
    })

    it('接收 disabled 参数', () => {
      vm = new Constructor({
        propsData: {
          disabled: true
        }
      }).$mount()
      const useElement = vm.$el.querySelector('input')
      expect(useElement.disabled).to.equal(true) 
    })

    it('接收 readonly 参数', () => {
      vm = new Constructor({
        propsData: {
          readonly: true
        }
      }).$mount()
      const useElement = vm.$el.querySelector('input')
      expect(useElement.readOnly).to.equal(true) 
    })

    it('接收 error 参数', () => {
      vm = new Constructor({
        propsData: {
          error: 'wrong'
        }
      }).$mount()
      const useElement = vm.$el.querySelector('use')
      const iconID = useElement.getAttribute('xlink:href');
      expect(iconID).to.equal('#icon-error');
      const spanElement = vm.$el.querySelector('.xr-input__errmsg')
      expect(spanElement.innerText).to.equal('wrong') 
    })

  })

  describe('Events', () => {
    const Constructor = Vue.extend(Input)
    let vm
    afterEach(() => {
      vm.$destroy()
    })
    it('支持 change 事件', () => {
      vm = new Constructor({}).$mount()
      const cb = sinon.fake()
      // 如何触发 change
      vm.$on('change', cb)
      let event = new Event('change')
      let ele = vm.$el.querySelector('input')
      ele.dispatchEvent(event)
      expect(cb).to.have.been.calledWith(event)
    })
    it('支持 input 事件', () => {
      vm = new Constructor({}).$mount()
      const cb = sinon.fake()
      // 如何触发 input
      vm.$on('input', cb)
      let event = new Event('input')
      let ele = vm.$el.querySelector('input')
      ele.dispatchEvent(event)
      expect(cb).to.have.been.calledWith(event)
    })
    it('支持 focus 事件', () => {
      vm = new Constructor({}).$mount()
      const cb = sinon.fake()
      // 如何触发 change
      vm.$on('focus', cb)
      let event = new Event('focus')
      let ele = vm.$el.querySelector('input')
      ele.dispatchEvent(event)
      expect(cb).to.have.been.calledWith(event)
    })
    it('支持 blur 事件', () => {
      vm = new Constructor({}).$mount()
      const cb = sinon.fake()
      // 如何触发 change
      vm.$on('blur', cb)
      let event = new Event('blur')
      let ele = vm.$el.querySelector('input')
      ele.dispatchEvent(event)
      expect(cb).to.have.been.calledWith(event)
    })
  })
})