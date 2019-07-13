## 轮子工厂

[![Build Status](https://www.travis-ci.org/lgq627628/xr-wheel.svg?branch=master)](https://www.travis-ci.org/lgq627628/xr-wheel)

## 介绍

造轮子练习。

## 开始使用

第一步：加入 css
    ```
    *， *::before, *::after { box-sizing: border-box;}
    :root {
        --button-height: 32px;
        --font-size: 14px;
        --button-bg: #fff;
        --button-bg-active: #eee;
        --border-radius: 4px;
        --border-color: #999;
        --border-color-hover: #666;
    }
    ```

第二步：安装 xr-wheel
    `npm i xr-wheel -S`

第三步：引入 xr-wheel
    ```
    import { Button, ButtonGroup, Icon } from 'xr-wheel'
    import 'xr-wheel/dist/index.css'
    Vue.component('xr-button', Button);
    Vue.component('xr-button-group', ButtonGroup);
    Vue.component('xr-icon', Icon);
    ```
    
## 文档

## 提问
执行 npx parcel 时 node 会默认去执行 index.js 文件而我们需要的是找到 index.html
## 变更记录

## 联系方式

## 贡献代码
"dev-test": "parcel watch test/* --no-cache & karma start"
这个脚本一开始karma会运行两遍，因为开始的时候parcel还没打包完karma就已经开始工作，打完包后又会运行 一次
