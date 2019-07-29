import Vue from '../node_modules/vue/dist/vue.common.js';
import chai from 'chai';
import spies from 'chai-spies'
import Button from './button';
import ButtonGroup from './button-group';
import Icon from './icon';
import Input from './input';
import Layout from './layout';
import Header from './header';
import Sider from './sider';
import Main from './main';
import Footer from './footer';
import Tabs from './tabs/tabs';
import TabsHead from './tabs/tabs-head';
import TabsBody from './tabs/tabs-body';
import TabsItem from './tabs/tabs-item';
import TabsPane from './tabs/tabs-pane';
import Popover from './popover';
import Collapse from './collapse';
import CollapseItem from './collapse-item';
import Col from './col';
import Row from './row';
import plugins from './plugin';

Vue.component('xr-button', Button);
Vue.component('xr-button-group', ButtonGroup);
Vue.component('xr-icon', Icon);
Vue.component('xr-input', Input);
Vue.component('xr-layout', Layout);
Vue.component('xr-header', Header);
Vue.component('xr-sider', Sider);
Vue.component('xr-main', Main);
Vue.component('xr-footer', Footer);
Vue.component('xr-tabs', Tabs);
Vue.component('xr-tabs-head', TabsHead);
Vue.component('xr-tabs-body', TabsBody);
Vue.component('xr-tabs-item', TabsItem);
Vue.component('xr-tabs-pane', TabsPane);
Vue.component('xr-popover', Popover);
Vue.component('xr-collapse', Collapse);
Vue.component('xr-collapse-item', CollapseItem);
Vue.component('xr-col', Col);
Vue.component('xr-row', Row);
Vue.use(plugins);

chai.use(spies);

new Vue({
    el: '#app',
    data: {
        showBtn: false,
        msg: '哈哈哈',
        activateTab: 'two',
        selectedCollapse: '2'
    },
    methods: {
        changeInput(e) {
            console.log('input的值变啦', e);
            this.msg = e;
        },
        showToast() {
            this.$toast('<p>哈哈哈哈</p>', {
                position: 'bottom',
                enableHtml: true,
                closeBtn: {
                    text: '我知道了',
                    cb: (toast) => { // 这是不错的写法
                        toast.log()
                        console.log('我知道了')
                    }
                }
            });
        }
    }
})

// 单元测试（传一个输入得到一个输出，测试参数和事件）
const expect = chai.expect;
{
    // 测试图标
    // 先有实例，因为 button 是个对象，不能实例化，所以得 extend
    const Constructor = Vue.extend(Button);
    const vm = new Constructor({
        propsData: {
            icon: 'setting'
        }
    });
    // vm.$mount('#test');
    vm.$mount();
    let useEle = vm.$el.querySelector('use');
    let href = useEle.getAttribute('xlink:href');
    expect(href).to.eq('#icon-setting');
    vm.$el.remove(); // 删元素
    vm.$destroy(); // 删对象
}
{
    // 测试 loading
    const Constructor = Vue.extend(Button);
    const vm = new Constructor({
        propsData: {
            icon: 'setting',
            loading: true
        }
    });
    vm.$mount();
    let useEle = vm.$el.querySelector('use');
    let href = useEle.getAttribute('xlink:href');
    expect(href).to.eq('#icon-loading');
    vm.$el.remove();
    vm.$destroy();
}
{
    // 测试图标顺序
    const Constructor = Vue.extend(Button);
    const vm = new Constructor({
        propsData: {
            icon: 'setting'
        }
    });
    const div = document.createElement('div');
    document.body.appendChild(div);
    vm.$mount(div); // 得渲染元素才行
    let svg  = vm.$el.querySelector('svg');
    let { order } = window.getComputedStyle(svg);
    expect(order).to.eq('1');
    vm.$el.remove();
    vm.$destroy();
}
{
    // 测试图标顺序
    const Constructor = Vue.extend(Button);
    const vm = new Constructor({
        propsData: {
            icon: 'setting',
            iconPos: 'right'
        }
    });
    const div = document.createElement('div');
    document.body.appendChild(div);
    vm.$mount(div); // 得渲染元素才行
    let svg  = vm.$el.querySelector('svg');
    let { order } = window.getComputedStyle(svg);
    expect(order).to.eq('2');
    vm.$el.remove();
    vm.$destroy();
}
{
    // 测试点击事件
    const Constructor = Vue.extend(Button);
    const vm = new Constructor({
        propsData: {
            icon: 'setting'
        }
    });
    vm.$mount();
    let spy = chai.spy(() => {})
    vm.$on('click', spy);
    // vm.$on('click', function() {
    //     expect(1).to.eq(2); 可以这样写但不对
    // });
    vm.$el.click();
    expect(spy).to.have.been.called(); // 间谍函数被调用
    vm.$el.remove();
    vm.$destroy();
}