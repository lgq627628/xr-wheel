<template>
    <button class="xr-button">点我</button>
</template>
<script>
export default {
    name: 'XrButton'
}
</script>
<style lang="scss">
.xr-button {
    padding: 0 1em;
    height: var(--button-height);
    font-size: var(--font-size);
    border-radius: var(--border-radius);
    border: 1px solid var(--border-color);
    background: var(--button-bg);
    &:hover {
        border: 1px solid var(--border-color-hover);
    }
    &:active {
        background: var(--button-bg-active);
    }
    &:focus {
        outline: none;
    }
}
</style>
