<template>
    <div class="xr-cascader">
        <div class="xr-cascader__trigger">
            <slot></slot>
        </div>
        <div class="xr-cascader__options">
            <xr-cascader-option :options="options"></xr-cascader-option>
        </div>
    </div>
</template>

<script>
import XrCascaderOption from './cascader-option';
export default {
    name: 'XrCascader',
    components: {
        XrCascaderOption
    },
    props: {
        options: {
            type: Array,
            default: () => []
        }
    }
}
</script>

<style lang="scss" scoped>
@import './var.scss';
.xr-cascader { 
}
</style>
