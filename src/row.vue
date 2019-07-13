<template>
    <div class="xr-row" :style="rowObj">
        <slot></slot>
    </div>
</template>
<script>
export default {
    name: 'XrRow',
    props: {
        gutter: [String, Number]
    },
    computed: {
        rowObj() {
            return {
                marginLeft: -this.gutter/2 + 'px',
                marginRight: -this.gutter/2 + 'px'
            }
        }
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
