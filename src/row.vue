<template>
    <div class="xr-row">
        <slot></slot>
    </div>
</template>
<script>
export default {
    name: 'XrRow',
    props: {
        gutter: {
            type: Number,
            default: 20
        }
    }
}
</script>
<style lang="scss" scoped>
.xr-row {
    display: flex;
}
</style>
