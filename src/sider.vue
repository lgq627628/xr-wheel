<template>
    <div class="xr-sider" v-if="visible">
        <slot></slot>
        <xr-button @click="visible = false">Close</xr-button>
    </div>
</template>
<script>
export default {
    name: 'XrSider',
    data() {
        return {
            visible: true
        }
    }
}
</script>
<style lang="scss" scoped>
.xr-sider {
   
}
</style>
