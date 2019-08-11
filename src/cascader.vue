<template>
    <div class="xr-cascader">
        <div class="xr-cascader__trigger" @click="popoverVisible = !popoverVisible">
            {{nowCascader}}
        </div>
        <div class="xr-cascader__popover" v-if="popoverVisible">
            <xr-cascader-option :options="options" :selected="selected" @update:selected="updateSelected"></xr-cascader-option>
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
        },
        selected: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            popoverVisible: false
        }
    },
    computed: {
        nowCascader() {
            return this.selected.map(item => item.label).join('/')
        }
    },
    methods: {
        updateSelected(newSelected) {
            this.$emit('update:selected', newSelected)
            this.$emit('change', newSelected.map(item => item.value))
        }
    }
}
</script>

<style lang="scss" scoped>
@import './var.scss';
.xr-cascader {
    position: relative;
    &__trigger {
        padding: 0 1em;
        width: 200px;
        height: $default-height;
        line-height: $default-height;
        border: 1px solid $border-color-grey;
        border-radius: $border-radius;
        @extend .ellipsis
    }
    &__popover {
        position: absolute;
        top: calc(100% + 4px);
        left: 0;
        background: #ffffff;
        @extend .box-shadow
    }
}
</style>
