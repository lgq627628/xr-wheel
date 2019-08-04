<template>
    <div class="xr-cascader">
        <div class="xr-cascader__trigger" @click="popoverVisible = !popoverVisible">
            <slot></slot>
        </div>
        <div class="xr-cascader__popover" v-if="popoverVisible">
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
    },
    data() {
        return {
            popoverVisible: false
        }
    }
}
</script>

<style lang="scss" scoped>
@import './var.scss';
.xr-cascader {
    &__trigger {
        width: 200px;
        height: 32px;
        border: 1px solid blue;
    }
    &__popover {
        border: 1px solid blue;
    }
}
</style>
