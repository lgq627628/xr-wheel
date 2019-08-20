<template>
    <div class="xr-layout" :class="layoutClass">
        <slot></slot>
    </div>
</template>
<script>
export default {
    name: 'XrLayout',
    data() {
        return {
            layoutClass: ''
        }
    },
    mounted() {
        let hasSider = this.$children.findIndex(vm => {
            return vm.$options.name === 'XrSider'
        }) >= 0
        if (hasSider) this.layoutClass = 'has-sider'
    }
}
</script>
<style lang="scss" scoped>
.xr-layout {
   display: flex;
   flex-direction: column;
   flex-grow: 1;
   &.has-sider {
       flex-direction: row;
   }
}
</style>
