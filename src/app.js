import Vue from '../node_modules/vue/dist/vue.common.js';
import Button from './button';
import Icon from './icon';

Vue.component('xr-button', Button);
Vue.component('xr-icon', Icon);

new Vue({
    el: '#app'
})