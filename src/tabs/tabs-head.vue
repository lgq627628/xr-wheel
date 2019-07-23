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
    created() {
        this.eventBus.$on('update:selected', name => {
            this.$children.forEach(vm => {
                if (vm.$options.name === 'XrTabsItem' && vm.name === name) {
                    console.log(vm.$el)
                }
            })
        })
    }
}
</script>
<style lang="scss" scoped>
$tab-height: 40px;
$color-blue: blue;
.xr-tabs-head {
    display: flex;
    align-items: center;
    position: relative;
    height: $tab-height;
    &__action {
        margin-left: auto;
    }
    &__line {
        position: absolute;
        bottom: 0;
        width: 100%;
        border-bottom: 1px solid $color-blue;
    }
}
</style>
