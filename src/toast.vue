<template>
    <div class="xr-toast">
        <slot></slot>
    </div>
</template>
<script>
export default {
    name: 'XrToast'
}
</script>
<style lang="scss" scoped>
$font-size: 14px;
$height: 40px;
$bg-color: rgba(0, 0, 0, 0.7);
.xr-toast {
    position: fixed;
    top: 15vh;
    left: 50%;
    padding: 0 16px;
    height: $height;
    line-height: $height;
    transform: translateX(-50%);
    font-size: $font-size;
    background: $bg-color;
    border-radius: 4px;
    color: #fff;
}
</style>
