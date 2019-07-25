<template>
    <div class="xr-tabs-head">
        <slot></slot>
        <div class="xr-tabs-head__action">
            <slot name="action"></slot>
        </div>
        <div class="xr-tabs-head__line" ref="line"></div>
    </div>
</template>
<script>
export default {
    name: 'XrTabsHead',
    inject: ['eventBus'], 
    mounted() {
        this.eventBus.$on('update:selected', name => {
            this.$children.forEach(vm => {
                if (vm.$options.name === 'XrTabsItem' && vm.name === name) {
                    let {width, height, top, left} = vm.$el.getBoundingClientRect()
                    this.$refs.line.style.width = width + 'px'
                    this.$refs.line.style.left = left + 'px' // 可以改用 transform 因为它能加速
                }
            })
        })
    }
}
</script>
<style lang="scss" scoped>
$tab-height: 40px;
$color-blue: blue;
$border-color: #ddd;
$border-height: 2px;
.xr-tabs-head {
    display: flex;
    align-items: center;
    position: relative;
    height: $tab-height;
    border-bottom: $border-height solid $border-color;
    &__action {
        margin-left: auto;
    }
    &__line {
        position: absolute;
        bottom: -$border-height;
        border-bottom: $border-height solid $color-blue;
        transition: all .25s;
    }
}
</style>
