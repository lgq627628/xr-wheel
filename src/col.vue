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
        phone: { // 有 5 种规模尺寸，肯定是其中一种，所以取一种作为默认（偏 pc 的话就取 widePc为默认值）
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
        },
        widePc: {
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
            let {span, offset, phone, ipad, narrowPc, pc, widePc} = this
            // 把 js 的变化体现在 html 上，从而体现在 css 上
            let phoneClass = phone && [
                phone.span ? `xr-col-${phone.span}--phone` : '',
                phone.offset ? `xr-col-offset-${phone.offset}--phone` : ''
            ] || []
            let ipadClass = ipad && [
                ipad.span ? `xr-col-${ipad.span}--ipad` : '',
                ipad.offset ? `xr-col-offset-${ipad.offset}--ipad` : ''
            ] || []
            let narrowPcClass = narrowPc && [
                narrowPc.span ? `xr-col-${narrowPc.span}--narrowPc` : '',
                narrowPc.offset ? `xr-col-offset-${narrowPc.offset}--narrowPc` : ''
            ] || []
            let pcClass = pc && [
                pc.span ? `xr-col-${pc.span}--pc` : '',
                pc.offset ? `xr-col-offset-${pc.offset}--pc` : ''
            ] || []
            let widePcClass = widePc && [
                widePc.span ? `xr-col-${widePc.span}--widePc` : '',
                widePc.offset ? `xr-col-offset-${widePc.offset}--widePc` : ''
            ] || []
            return [
                offset ? `xr-col-offset-${offset}` : '',
                span ? `xr-col-${span}` : 'xr-col-auto',
                ...phoneClass,
                ...ipadClass,
                ...narrowPcClass,
                ...pcClass,
                ...widePcClass
            ]
        },
        colStyle() {
            return {
                paddingLeft: this.gutter/2 + 'px',
                paddingRight: this.gutter/2 + 'px'
            }
        }
    }
}
</script> 
<style lang="scss" scoped>
.xr-col { // 这个可以做迷宫
    height: 100px;
    // width: 50%; // 给 50% 是因为 nowrap 和 shrink，多了会自动分配
    &-auto {
        flex: 1;
    }
    @for $n from 1 through 24 {
        &.xr-col-#{$n} {
            width: ($n / 24) * 100%;
        }
    }
    @for $n from 1 through 24 {
        &.xr-col-offset-#{$n} {
            margin-left: ($n / 24) * 100%;
        }
    }
    @media (max-width: 576px) { // 把手机样式写在这里，当屏幕缩小时，会覆盖上面的样式
        @for $n from 1 through 24 {
        &.xr-col-#{$n}--phone {
            width: ($n / 24) * 100%;
        }
        }
        @for $n from 1 through 24 {
            &.xr-col-offset-#{$n}--phone {
                margin-left: ($n / 24) * 100%;
            }
        }
    }
    @media (min-width: 577px) and (max-width: 768px) {
        @for $n from 1 through 24 {
        &.xr-col-#{$n}--ipad {
            width: ($n / 24) * 100%;
        }
        }
        @for $n from 1 through 24 {
            &.xr-col-offset-#{$n}--ipad {
                margin-left: ($n / 24) * 100%;
            }
        }
    }
    @media (min-width: 769px) and (max-width: 992px) {
        @for $n from 1 through 24 {
        &.xr-col-#{$n}--narrowPc {
            width: ($n / 24) * 100%;
        }
        }
        @for $n from 1 through 24 {
            &.xr-col-offset-#{$n}--narrowPc {
                margin-left: ($n / 24) * 100%;
            }
        }
    }
    @media (min-width: 993px) and (max-width: 1200px) {
        @for $n from 1 through 24 {
        &.xr-col-#{$n}--pc {
            width: ($n / 24) * 100%;
        }
        }
        @for $n from 1 through 24 {
            &.xr-col-offset-#{$n}--pc {
                margin-left: ($n / 24) * 100%;
            }
        }
    }
    @media (min-width: 1201px) {
        @for $n from 1 through 24 {
        &.xr-col-#{$n}--widePc {
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
