<template>
    <div class="xr-col" :class="span ? `xr-col-${span}` : ''">
        <slot></slot>
    </div>
</template>
<script>
export default {
    name: 'XrCol',
    props: {
        span: [Number, String]
    }
}
</script>
<style lang="scss" scoped>
.xr-col {
    height: 100px;
    width: 50%; // 给 50% 是因为 nowrap 和 shrink，多了会自动分配
    background: yellow;
    border: 1px solid red;
    @for $n from 1 through 24 {
        &.xr-col-#{$n} {
            width: ($n / 24) * 100%;
        }
    }
}
</style>
