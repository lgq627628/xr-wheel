import Vue from '../node_modules/vue/dist/vue.common.js';
import chai from 'chai';
import Button from './button';
import ButtonGroup from './button-group';
import Icon from './icon';

Vue.component('xr-button', Button);
Vue.component('xr-button-group', ButtonGroup);
Vue.component('xr-icon', Icon);

new Vue({
    el: '#app',
    data: {
        showBtn: false
    }
})

// 单元测试（传一个输入得到一个输出，测试参数和事件）
const expect = chai.expect;
{
    // 测试图标
    // 先有实例，因为 button 是个对象，不能实例化，所以得 extend
    const Constructor = Vue.extend(Button);
    const button = new Constructor({
        propsData: {
            icon: 'setting'
        }
    });
    // button.$mount('#test');
    button.$mount();
    let useEle = button.$el.querySelector('use');
    let href = useEle.getAttribute('xlink:href');
    expect(href).to.eq('#icon-setting');
    button.$el.remove(); // 删元素
    button.$destroy(); // 删对象
}
{
    // 测试 loading
    const Constructor = Vue.extend(Button);
    const button = new Constructor({
        propsData: {
            icon: 'setting',
            loading: true
        }
    });
    button.$mount();
    let useEle = button.$el.querySelector('use');
    let href = useEle.getAttribute('xlink:href');
    expect(href).to.eq('#icon-loading');
    button.$el.remove();
    button.$destroy();
}
{
    // 测试图标顺序
    const Constructor = Vue.extend(Button);
    const button = new Constructor({
        propsData: {
            icon: 'setting'
        }
    });
    const div = document.createElement('div');
    document.body.appendChild(div);
    button.$mount(div); // 得渲染元素才行
    let svg  = button.$el.querySelector('svg');
    let { order } = window.getComputedStyle(svg);
    expect(order).to.eq('1');
    button.$el.remove();
    button.$destroy();
}
{
    // 测试图标顺序
    const Constructor = Vue.extend(Button);
    const button = new Constructor({
        propsData: {
            icon: 'setting',
            iconPos: 'right'
        }
    });
    const div = document.createElement('div');
    document.body.appendChild(div);
    button.$mount(div); // 得渲染元素才行
    let svg  = button.$el.querySelector('svg');
    let { order } = window.getComputedStyle(svg);
    expect(order).to.eq('2');
    button.$el.remove();
    button.$destroy();
}
{
    // 测试点击事件
    const Constructor = Vue.extend(Button);
    const button = new Constructor({
        propsData: {
            icon: 'setting'
        }
    });
    button.$mount();
    button.$on('click', function() {
        // expect(1).to.eq(2);
    }) 
    button.$el.click();
    button.$el.remove();
    button.$destroy();
}