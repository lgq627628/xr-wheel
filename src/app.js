import Vue from '../node_modules/vue/dist/vue.common.js';
import chai from 'chai';
import spies from 'chai-spies'
import Button from './button/button';
import ButtonGroup from './button/button-group';
import Icon from './icon';
import Input from './input';
import Layout from './layout/layout';
import Header from './layout/header';
import Sider from './layout/sider';
import Main from './layout/main';
import Footer from './layout/footer';
import Tabs from './tabs/tabs';
import TabsHead from './tabs/tabs-head';
import TabsBody from './tabs/tabs-body';
import TabsItem from './tabs/tabs-item';
import TabsPane from './tabs/tabs-pane';
import Popover from './popover';
import Collapse from './collapse/collapse';
import CollapseItem from './collapse/collapse-item';
import Cascader from './cascader/cascader';
import CascaderOption from './cascader/cascader-option';
import Page from './page';
import Slider from './slider/slider';
import SliderItem from './slider/slider-item';
import Col from './grid/col';
import Row from './grid/row';
import Nav from './Nav/nav';
import NavItem from './nav/nav-item';
import SubNav from './nav/sub-nav';
import XrTable from './table/table';
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
Vue.component('xr-cascader', Cascader);
Vue.component('xr-cascader-option', CascaderOption);
Vue.component('xr-page', Page);
Vue.component('xr-slider', Slider);
Vue.component('xr-slider-item', SliderItem);
Vue.component('xr-col', Col);
Vue.component('xr-row', Row);
Vue.component('xr-nav', Nav);
Vue.component('xr-nav-item', NavItem);
Vue.component('xr-sub-nav', SubNav);
Vue.component('xr-table', XrTable);

Vue.use(plugins);

chai.use(spies);

new Vue({
    el: '#app',
    data: {
        loadingTable: false,
        selectedItems: [],
        columns: [
          {key: 'name', title: '姓名'},
          {key: 'sex', title: '性别'},
          {key: 'score', title: '分数', sort: true}
        ],
        dataSource: [
          {id: 1, name: '张三', sex: '男', score: 100, desc: '我是详情啊一堆描述'},
          {id: 2, name: '李四', sex: '女 ', score: 60, desc: '我是详情啊一堆描述'},
          {id: 3, name: '王五', sex: '男', score: 90, desc: '我是详情啊一堆描述'},
          {id: 4, name: '李四法', sex: '女 ', score: 80, desc: '我是详情啊一堆描述'},
          {id: 5, name: '王五收', sex: '男', score: 88, desc: '我是详情啊一堆描述'},
          {id: 6, name: '李个四', sex: '女 ', score: 50, desc: '我是详情啊一堆描述'},
          {id: 7, name: '王好五', sex: '男', score: 40, desc: '我是详情啊一堆描述'},
          {id: 8, name: '王好五', sex: '男', score: 40, desc: '我是详情啊一堆描述'},
          {id: 9, name: '王好五', sex: '男', score: 40, desc: '我是详情啊一堆描述'},
          {id: 10, name: '王好五', sex: '男', score: 40, desc: '我是详情啊一堆描述'},
          {id: 11, name: '王好五', sex: '男', score: 40, desc: '我是详情啊一堆描述'},
          {id: 12, name: '王好五', sex: '男', score: 40, desc: '我是详情啊一堆描述'},
          {id: 13, name: '王好五', sex: '男', score: 40, desc: '我是详情啊一堆描述'},
          {id: 14, name: '王好五', sex: '男', score: 40, desc: '我是详情啊一堆描述'},
          {id: 15, name: '王好五', sex: '男', score: 40, desc: '我是详情啊一堆描述'}
        ],
        selectedSilder: '',
        curPage: 10,
        showBtn: false,
        msg: '哈哈哈',
        activateTab: 'two',
        selectedCollapse: '2',
        selectedCascader: ['zujian', 'basic', 'color'],
        options: [{
            value: 'zhinan',
            label: '指南',
            children: [{
              value: 'shejiyuanze',
              label: '设计原则',
              children: [{
                value: 'yizhi',
                label: '一致'
              }, {
                value: 'fankui',
                label: '反馈'
              }, {
                value: 'xiaolv',
                label: '效率'
              }, {
                value: 'kekong',
                label: '可控'
              }]
            }, {
              value: 'daohang',
              label: '导航',
              children: [{
                value: 'cexiangdaohang',
                label: '侧向导航'
              }, {
                value: 'dingbudaohang',
                label: '顶部导航'
              }]
            }]
          }, {
            value: 'zujian', 
            label: '组件',
            children: [{
              value: 'basic',
              label: 'Basic',
              children: [{
                value: 'layout',
                label: 'Layout 布局'
              }, {
                value: 'color',
                label: 'Color 色彩'
              }, {
                value: 'typography',
                label: 'Typography 字体'
              }, {
                value: 'icon',
                label: 'Icon 图标'
              }, {
                value: 'button',
                label: 'Button 按钮'
              }]
            }, {
              value: 'form',
              label: 'Form',
              children: [{
                value: 'radio',
                label: 'Radio 单选框'
              }, {
                value: 'checkbox',
                label: 'Checkbox 多选框'
              }, {
                value: 'input',
                label: 'Input 输入框'
              }, {
                value: 'input-number',
                label: 'InputNumber 计数器'
              }, {
                value: 'select',
                label: 'Select 选择器'
              }, {
                value: 'cascader',
                label: 'Cascader 级联选择器'
              }, {
                value: 'switch',
                label: 'Switch 开关'
              }, {
                value: 'slider',
                label: 'Slider 滑块'
              }, {
                value: 'time-picker',
                label: 'TimePicker 时间选择器'
              }, {
                value: 'date-picker',
                label: 'DatePicker 日期选择器'
              }, {
                value: 'datetime-picker',
                label: 'DateTimePicker 日期时间选择器'
              }, {
                value: 'upload',
                label: 'Upload 上传'
              }, {
                value: 'rate',
                label: 'Rate 评分'
              }, {
                value: 'form',
                label: 'Form 表单'
              }]
            }, {
              value: 'data',
              label: 'Data',
              children: [{
                value: 'table',
                label: 'Table 表格'
              }, {
                value: 'tag',
                label: 'Tag 标签'
              }, {
                value: 'progress',
                label: 'Progress 进度条'
              }, {
                value: 'tree',
                label: 'Tree 树形控件'
              }, {
                value: 'pagination',
                label: 'Pagination 分页'
              }, {
                value: 'badge',
                label: 'Badge 标记'
              }]
            }, {
              value: 'notice',
              label: 'Notice',
              children: [{
                value: 'alert',
                label: 'Alert 警告'
              }, {
                value: 'loading',
                label: 'Loading 加载'
              }, {
                value: 'message',
                label: 'Message 消息提示'
              }, {
                value: 'message-box',
                label: 'MessageBox 弹框'
              }, {
                value: 'notification',
                label: 'Notification 通知'
              }]
            }, {
              value: 'navigation',
              label: 'Navigation',
              children: [{
                value: 'menu',
                label: 'NavMenu 导航菜单'
              }, {
                value: 'tabs',
                label: 'Tabs 标签页'
              }, {
                value: 'breadcrumb',
                label: 'Breadcrumb 面包屑'
              }, {
                value: 'dropdown',
                label: 'Dropdown 下拉菜单'
              }, {
                value: 'steps',
                label: 'Steps 步骤条'
              }]
            }, {
              value: 'others',
              label: 'Others',
              children: [{
                value: 'dialog',
                label: 'Dialog 对话框'
              }, {
                value: 'tooltip',
                label: 'Tooltip 文字提示'
              }, {
                value: 'popover',
                label: 'Popover 弹出框'
              }, {
                value: 'card',
                label: 'Card 卡片'
              }, {
                value: 'carousel',
                label: 'Carousel 走马灯'
              }, {
                value: 'collapse',
                label: 'Collapse 折叠面板'
              }]
            }]
          }, {
            value: 'ziyuan',
            label: '资源',
            children: [{
              value: 'axure',
              label: 'Axure Components'
            }, {
              value: 'sketch',
              label: 'Sketch Templates'
            }, {
              value: 'jiaohu',
              label: '组件交互文档'
            }]
        }]
    },
    mounted() {
      
    },
    methods: {
      editTable() {
        alert('编辑表格数据')
      },
      lookTable() {
        alert('查看表格数据')
      },
      sort() {
        this.loadingTable = true;
        setTimeout(() => {
          this.loadingTable = false;
        }, 1000);
        console.log('排序啦')
        // 调用后端接口，再给this.dataSource赋值
      },
      changeItem (obj) {
        console.log(obj)
      },
        gotoPage(e) {
          console.log(`跳到第${e}页`)
        },
        loadData(node, cb) {
          console.log(node.id)
          setTimeout(() => { // 这里调用接口，并把数据传回去
            let res = []
            cb(res)
          })
        },
        changeCascader(e) {
          console.log(e)
        },
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