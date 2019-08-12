<template>
    <div class="xr-cascader" ref="cascader" v-click-outside="close">
        <div class="xr-cascader__trigger" @click="toggle">
            {{nowCascader}}
        </div>
        <div class="xr-cascader__popover" v-if="popoverVisible">
            <xr-cascader-option :options="options" :selected="selected" @update:selected="updateSelected"></xr-cascader-option>
        </div>
    </div>
</template>

<script>
import XrCascaderOption from './cascader-option';
import ClickOutside from './click-outside';
export default {
    name: 'XrCascader',
    directives: {ClickOutside},
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
        },
        loadData: {
            type: Function
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
        close() {
            this.popoverVisible = false
        },
        toggle() {
            this.popoverVisible = !this.popoverVisible
        },
        updateSelected(newSelected) {
            this.$emit('update:selected', newSelected)
            this.$emit('change', newSelected.map(item => item.value))
            if (!this.loadData) return
            let lastItem = newSelected[newSelected.length - 1]
            let findItemFromSource = () => {}
            let updateSource = result => {
                let copy = JSON.parse(JSON.stringify(this.options))
                let toUpdate = findItemFromSource(copy, newSelected.value)
                toUpdate.children = result
                this.$emit('update:options', copy)
                // lastItem.children = result 这是单项数据流，用的是深拷贝，所以这样写是不好的，还是得操作 source
            }
            this.loadData(lastItem, updateSource)
        }
    }
}
</script>

<style lang="scss" scoped>
@import './var.scss';
.xr-cascader {
    display: inline-flex;
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
