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

describe('Row', () => {

  it('存在', () => {
    expect(Row).to.exist
  })

  describe('Props', () => {
    
    it('接收 gutter 参数', (done) => {
      Vue.component('xr-row', Row)
      Vue.component('xr-col', Col)

      let div = document.createElement('div')
      document.body.appendChild(div)
      div.innerHTML = `
        <xr-row gutter="20">
          <xr-col span="12"></xr-col>
          <xr-col span="12"></xr-col>
        </xr-row>
      `
      const vm = new Vue({
        el: div
      })
      // console.log(vm.$el.outerHTML)
      setTimeout(() => { // 这是个异步的过程，如果眼睛和所见的内容不一样，那大部分是异步的锅
        // console.log(vm.$el.outerHTML)
        const row = vm.$el.querySelector('.xr-row')
        expect(getComputedStyle(row).marginRight).to.equal('-10px')
        expect(getComputedStyle(row).marginLeft).to.equal('-10px')
        const cols = vm.$el.querySelectorAll('.xr-col')
        expect(getComputedStyle(cols[0]).paddingRight).to.equal('10px')
        expect(getComputedStyle(cols[0]).paddingLeft).to.equal('10px')
        done()
        vm.$el.remove()
        vm.$destroy()
      }, 0);
    })

    it('接收 align 参数', () => {
      // 放到页面中才会有样式
      const div = document.createElement('div')
      document.body.appendChild(div)
      const Constructor = Vue.extend(Row)
      const vm = new Constructor({
        propsData: {
          align: 'center'
        }
      }).$mount(div)
      const ele = vm.$el
      expect(getComputedStyle(ele).justifyContent).to.equal('center')
      // expect(ele.classList.contains('xr-row--center')).to.equal(true)
      ele.remove()
      vm.$destroy()
    })
  })
})