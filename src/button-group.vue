<template>
    <div class="xr-button-group">
        <slot></slot> 
    </div>
</template>
<script>
export default {
    name: 'XrButtonGroup',
    mounted() {
        // console.log(this.$children); 这个只会打印vue示例，所以不能用它来判断用户输入的slot
        for (let node of this.$el.children) {
            let name = node.nodeName.toLowerCase();
            if (name !== 'button') {
                console.warn(`xr-button-group 组件下应全部为 xr-button，但你写的是 ${name}`);
            }
        };
    }
}
</script>
<style lang="scss">
.xr-button-group {
    display: inline-flex;
    vertical-align: middle;
    .xr-button {
        border-radius: 0;
        &:not(:first-child) {
            margin-left: -1px; // 边框合并
        }
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
