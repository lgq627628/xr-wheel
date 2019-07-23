<template>
    <div class="xr-tabs-item">
        <slot></slot>
    </div>
</template>
<script>
export default {
    name: 'XrTabsItem',
    props: {
        disabled: {
            type: Boolean,
            default: false
        }
    }
}
</script>
<style lang="scss" scoped>
.xr-tabs-item {
   
}
</style>
