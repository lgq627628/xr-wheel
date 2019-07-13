<template>
    <div class="xr-row" :style="{marginLeft: -gutter/2 + 'px', marginRight: -gutter/2 + 'px'}">
        <slot></slot>
    </div>
</template>
<script>
export default {
    name: 'XrRow',
    props: {
        gutter: [String, Number]
    },
    mounted() {
        this.$children.forEach(vm => {
            vm.gutter = this.gutter;
        })
    }
}
</script>
<style lang="scss" scoped>
.xr-row {
    display: flex;
}
</style>
