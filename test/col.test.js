import Vue from '../node_modules/vue/dist/vue.common.js';
import chai from 'chai'
import sinon from 'sinon'
import sinonChai from "sinon-chai" // 可以不引入'mocha' 和 'sinon-chai'，因为 karma 自动引进了
import Row from '../src/row'
import Col from '../src/col'
const expect = chai.expect;
chai.use(sinonChai)

// 用 js 测 css 不好测啊
Vue.config.productionTip = false
Vue.config.devtools = false

describe('Col', () => {

  it('存在', () => {
    expect(Col).to.exist
  })

  describe('Props', () => {

    it('接收 span 参数', () => {
      const div = document.createElement('div')
      document.body.appendChild(div)
      const Constructor = Vue.extend(Col)
      const vm = new Constructor({
        propsData: {
          span: 1
        }
      }).$mount(div)
      const ele = vm.$el 
      expect(ele.classList.contains('xr-col-span-1')).to.equal(true)
      ele.remove()
      vm.$destroy()
    })

    it('接收 offset 参数', () => {
      const div = document.createElement('div')
      document.body.appendChild(div)
      const Constructor = Vue.extend(Col)
      const vm = new Constructor({
        propsData: {
          offset: 1
        }
      }).$mount(div)
      const ele = vm.$el 
      expect(ele.classList.contains('xr-col-offset-1')).to.equal(true)
      ele.remove()
      vm.$destroy()
    })

    it('接收 pc 参数', () => {
      const div = document.createElement('div')
      document.body.appendChild(div)
      const Constructor = Vue.extend(Col)
      const vm = new Constructor({
        propsData: {
          pc: { span: 1, offset: 2}
        }
      }).$mount(div)
      const ele = vm.$el 
      expect(ele.classList.contains('xr-col-span-1--pc')).to.equal(true)
      expect(ele.classList.contains('xr-col-offset-2--pc')).to.equal(true)
      ele.remove()
      vm.$destroy()
    })

    it('接收 phone 参数', () => {
      const div = document.createElement('div')
      document.body.appendChild(div)
      const Constructor = Vue.extend(Col)
      const vm = new Constructor({
        propsData: {
          phone: { span: 1, offset: 2}
        }
      }).$mount(div)
      const ele = vm.$el 
      expect(ele.classList.contains('xr-col-span-1--phone')).to.equal(true)
      expect(ele.classList.contains('xr-col-offset-2--phone')).to.equal(true)
      ele.remove()
      vm.$destroy()
    })
  })
})