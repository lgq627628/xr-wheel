import Vue from '../node_modules/vue/dist/vue.common.js';
import chai from 'chai';
import spies from 'chai-spies'
import Button from './button';
import ButtonGroup from './button-group';
import Icon from './icon';
import Input from './input';

Vue.component('xr-button', Button);
Vue.component('xr-button-group', ButtonGroup);
Vue.component('xr-icon', Icon);
Vue.component('xr-input', Input);

chai.use(spies);

new Vue({
    el: '#app',
    data: {
        showBtn: false
    },
    methods: {
        changeInput(e) {
            console.log('input的值变啦', e);
        }
    },
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