<template>
    <div class="xr-collapse">
        <slot></slot>
    </div>
</template>
<script>
export default {
    name: 'XrCollapse'
}
</script>
<style lang="scss" scoped>
$grey: #ddd;
.xr-collapse {
   border: 1px solid $grey;
}
</style>
