<template>
    <div
        class="xr-col"
        :class="colClass"
        :style="colStyle">
        <slot></slot>
    </div>
</template>
<script>
export default {
    name: 'XrCol',
    props: {
        span: [Number, String],
        offset: [Number, String]
    },
    data() {
        return {
            gutter: 0 
        }
    },
    computed: {
        colClass() {
            let {span, offset} = this
            return [
                offset ? `xr-col-offset-${offset}` : '',
                span ? `xr-col-${span}` : ''
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
    width: 50%; // 给 50% 是因为 nowrap 和 shrink，多了会自动分配
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
}
</style>
