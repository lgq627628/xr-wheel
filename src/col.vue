<template>
    <div
        class="xr-col"
        :class="colClass"
        :style="colStyle">
        <slot></slot>
    </div>
</template>
<script>
let validator = val => {
    let keys = Object.keys(val)
    let valid = true
    keys.forEach(key => {
        if (!['span', 'offset'].includes(key)) {
            valid = false
        }
    })
    return valid;
}
export default {
    name: 'XrCol',
    props: {
        span: [Number, String],
        offset: [Number, String],
        // 有 5 种规模尺寸，肯定是其中一种，所以取一种作为默认（偏 pc 的话就取 widePc为默认值）
        // 但如果我只传了两种，比如手机和pc，那ipad怎么办呢，采取往下靠拢的策略，需要调整media样式顺序
        // mobile first 移动优先
        phone: {
            type: Object,
            validator
        },
        ipad: {
            type: Object,
            validator
        },
        narrowPc: {
            type: Object,
            validator
        },
        pc: {
            type: Object,
            validator
        }
    },
    data() {
        return {
            gutter: 0 
        }
    },
    computed: {
        colClass() {
            // 把 js 的变化体现在 html 上，从而体现在 css 上
            // 方法一：
            // let {span, offset} = this
            // let screenArr = [];
            // ['phone', 'ipad', 'narrowPc', 'pc', 'widePc'].forEach(screen => {
            //     let nowScreen = this[screen];
            //     let screenClass = nowScreen && [
            //         nowScreen.span ? `xr-col-span-${nowScreen.span}--${screen}` : '',
            //         nowScreen.offset ? `xr-col-offset-${nowScreen.offset}--${screen}` : ''
            //     ] || []
            //     screenArr.push(screenClass);
            // })
            // return [
            //     offset ? `xr-col-offset-${offset}` : '',
            //     span ? `xr-col-span-${span}` : '',
            //     ...screenArr
            // ]

            // 方法二：
            let {span, offset, phone, ipad, narrowPc, pc, widePc, createClass} = this
            return [
                ...createClass({span, offset}),
                ...createClass(phone, '--phone'),
                ...createClass(ipad, '--ipad'),
                ...createClass(narrowPc, '--narrowPc'),
                ...createClass(pc, '--pc'),
                ...createClass(widePc, '--widePc'),
            ]
        },
        colStyle() {
            return {
                paddingLeft: this.gutter/2 + 'px',
                paddingRight: this.gutter/2 + 'px'
            }
        }
    },
    methods: {
        createClass (obj, screenName = '') {
            let arr = [];
            if (!obj) return arr;
            if (obj.span) arr.push(`xr-col-span-${obj.span}${screenName}`);
            if (obj.offset) arr.push(`xr-col-offset-${obj.offset}${screenName}`);
            return arr;
        }
    }
}
</script> 
<style lang="scss" scoped>
.xr-col { // 这个可以做迷宫
    height: 100px;
    // width: 50%; // 给 50% 是因为 nowrap 和 shrink，多了会自动分配
    // &-auto {
    //     flex: 1;
    // }
    @for $n from 1 through 24 {
        &.xr-col-span-#{$n} {
            width: ($n / 24) * 100%;
        }
    }
    @for $n from 1 through 24 {
        &.xr-col-offset-#{$n} {
            margin-left: ($n / 24) * 100%;
        }
    }
    @media (min-width: 0) { // 把手机样式写在这里，当屏幕缩小时，会覆盖上面的样式
        @for $n from 1 through 24 {
        &.xr-col-span-#{$n}--phone {
            width: ($n / 24) * 100%;
        }
        }
        @for $n from 1 through 24 {
            &.xr-col-offset-#{$n}--phone {
                margin-left: ($n / 24) * 100%;
            }
        }
    }
    @media (min-width: 577px) {
        @for $n from 1 through 24 {
        &.xr-col-span-#{$n}--ipad {
            width: ($n / 24) * 100%;
        }
        }
        @for $n from 1 through 24 {
            &.xr-col-offset-#{$n}--ipad {
                margin-left: ($n / 24) * 100%;
            }
        }
    }
    @media (min-width: 769px) {
        @for $n from 1 through 24 {
        &.xr-col-span-#{$n}--narrowPc {
            width: ($n / 24) * 100%;
        }
        }
        @for $n from 1 through 24 {
            &.xr-col-offset-#{$n}--narrowPc {
                margin-left: ($n / 24) * 100%;
            }
        }
    }
    @media (min-width: 993px) {
        @for $n from 1 through 24 {
        &.xr-col-span-#{$n}--pc {
            width: ($n / 24) * 100%;
        }
        }
        @for $n from 1 through 24 {
            &.xr-col-offset-#{$n}--pc {
                margin-left: ($n / 24) * 100%;
            }
        }
    }
    @media (min-width: 1200px) {
        @for $n from 1 through 24 {
        &.xr-col-span-#{$n}--pc {
            width: ($n / 24) * 100%;
        }
        }
        @for $n from 1 through 24 {
            &.xr-col-offset-#{$n}--widePc {
                margin-left: ($n / 24) * 100%;
            }
        }
    }
}
</style>
