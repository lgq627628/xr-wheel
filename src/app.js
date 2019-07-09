import Vue from '../node_modules/vue/dist/vue.common.js';
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