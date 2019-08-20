import Vue from 'vue/dist/vue.common';
import chai from 'chai'
import sinon from 'sinon'
import sinonChai from "sinon-chai"
import Tabs from '../../src/tabs/tabs'
import TabsHead from '../../src/tabs/tabs-head';
import TabsBody from '../../src/tabs/tabs-body';
import TabsItem from '../../src/tabs/tabs-item';
import TabsPane from '../../src/tabs/tabs-pane';
const expect = chai.expect;
chai.use(sinonChai)

Vue.config.productionTip = false
Vue.config.devtools = false

describe('TabsItem', () => {
  it('存在', () => {
    expect(TabsItem).to.exist
  })

  it('接受 name 参数', () => {
    const Constructor = Vue.extend(TabsItem)

    const vm = new Constructor({
      propsData: {
        name: 'hhh'
      }
    }).$mount()

    expect(vm.$el.getAttribute('data-name')).to.equal('hhh')
    vm.$el.remove()
    vm.$destroy()
  })

  it('接受 disabled 参数', () => {
    const Constructor = Vue.extend(TabsItem)

    const vm = new Constructor({
      propsData: {
        disabled: true
      }
    }).$mount()

    expect(vm.$el.classList.contains('disabled')).to.be.true
    const callback = sinon.fake();
    vm.$on('click', callback)
    vm.$el.click()
    expect(callback).to.have.not.been.called
    vm.$el.remove()
    vm.$destroy()
  })
})