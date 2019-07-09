<template>
    <div class="xr-button-group">
        <slot></slot>
    </div>
</template>
<script>
export default {
    name: 'XrButtonGroup',
}
</script>
<style lang="scss">
.xr-button-group {
    display: inline-flex;
    vertical-align: middle;
    .xr-button {
        margin-left: -1px; // 边框合并
        border-radius: 0;
        &:first-child {
            border-top-left-radius: var(--border-radius);
            border-bottom-left-radius: var(--border-radius);
        }
        &:last-child {
            border-top-right-radius: var(--border-radius);
            border-bottom-right-radius: var(--border-radius);
        }
        &:hover {
            position: relative;
            z-index: 1; // 边框悬浮
        }
    }
}
</style>
