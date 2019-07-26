import Vue from '../node_modules/vue/dist/vue.common.js';
import chai from 'chai'
import sinon from 'sinon'
import sinonChai from "sinon-chai"
import Tabs from '../src/tabs/tabs'
import TabsHead from '../src/tabs/tabs-head';
import TabsBody from '../src/tabs/tabs-body';
import TabsItem from '../src/tabs/tabs-item';
import TabsPane from '../src/tabs/tabs-pane';
const expect = chai.expect;
chai.use(sinonChai)

Vue.config.productionTip = false
Vue.config.devtools = false

Vue.component('xr-tabs', Tabs);
Vue.component('xr-tabs-head', TabsHead);
Vue.component('xr-tabs-body', TabsBody);
Vue.component('xr-tabs-item', TabsItem);
Vue.component('xr-tabs-pane', TabsPane);

describe('Tabs', () => {
  it('存在', () => {
    expect(Tabs).to.exist
  })

  it('接受 selected 参数', (done) => {
    let div = document.createElement('div')
    document.body.appendChild(div)
    div.innerHTML = `
    <xr-tabs selected="one">
      <xr-tabs-head>
        <xr-tabs-item name="one">标签一</xr-tabs-item>
        <xr-tabs-item name="two">标签二</xr-tabs-item>
      </xr-tabs-head>
      <xr-tabs-body>
        <xr-tabs-pane name="one">1111111111</xr-tabs-pane>
        <xr-tabs-pane name="two">2222222222</xr-tabs-pane>
      </xr-tabs-body>
    </xr-tabs>
    `
    const vm = new Vue({
      el: div
    })
    vm.$nextTick(() => {
      // console.log(vm.$el.outerHTML)
      let nowTab = vm.$el.querySelector('.xr-tabs-item[data-name="one"]')
      expect(nowTab.classList.contains('active')).to.be.true
      vm.$el.remove()
      vm.$destroy()
      done()
    })
  })
})