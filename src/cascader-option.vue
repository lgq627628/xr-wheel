<template>
    <div class="xr-cascader-option">
        <div class="xr-cascader-option__left">
            <div class="xr-cascader-option__label" v-for="(item, index) in options " :key="index" @click="handleClick(item)">
                {{item.label}}
                <xr-icon class="xr-cascader-option__arrow" v-if="item.children && item.children.length" name="right"></xr-icon>
            </div>
        </div>
        <div class="xr-cascader-option__right" v-if="rightOptions.length">
            <xr-cascader-option :options="rightOptions" :selected="selected" :level="level+1" @update:selected="updateSelected"></xr-cascader-option>
        </div>
    </div>
</template>
<script>
export default {
    name: 'XrCascaderOption',
    props: {
        options: {
            type: Array,
            default: () => []
        },
        selected: {
            type: Array,
            default: () => []
        },
        level: {
            type: Number,
            default: 0
        }
    },
    computed: {
        rightOptions() {
            return this.selected[this.level] && this.selected[this.level].children || []
        }
    },
    methods: {
        handleClick(item) {
            // 下面这种做法使得子组件改变了父组件的值，是不好的习惯，要抛弃掉。
            // this.$set(this.selected, this.level, item);
            // 通常正确的做法是深拷贝数据往外传
            let copy = JSON.parse(JSON.stringify(this.selected))
            copy[this.level] = item
            this.$emit('update:selected', copy)
        },
        updateSelected(newSelected) {
            this.$emit('update:selected', newSelected)
        }
    }
}
</script>
<style lang="scss" scoped>
@import './var.scss'; 
.xr-cascader-option {
    display: flex;
    &__left, &__right {
        min-width: 150px;
        height: 200px;
        overflow: scroll;
    }
    &__left {
        padding: .3em 0;
    }
    &__right {
        border-left: 1px solid $border-color-light;
    }
    &__label {
        display: flex;
        align-items: center;
        padding: .3em 1em;
        cursor: pointer;
    }
    &__arrow {
        margin-left: auto ;
        transform: scale(0.8);
    }
}
</style>
