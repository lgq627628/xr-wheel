<template>
    <div class="xr-tabs-body">
        <slot></slot>
    </div>
</template>
<script>
export default {
    name: 'XrTabsBody',
    inject: ['eventBus']
}
</script>
<style lang="scss" scoped>
.xr-tabs-body {}
</style>
