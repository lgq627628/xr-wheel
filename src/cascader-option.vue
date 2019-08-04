<template>
    <div class="xr-cascader-option">
        <div class="xr-cascader-option__left">
            <div class="xr-cascader-option__label" v-for="(item, index) in options " :key="index" @click="leftSelected = item">
                {{item.label}}
                <xr-icon class="xr-cascader-option__arrow" v-if="item.children && item.children.length" name="right"></xr-icon>
            </div>
        </div>
        <div class="xr-cascader-option__right" v-if="rightOptions.length">
            <xr-cascader-option :options="rightOptions"></xr-cascader-option>
        </div>
    </div>
    <!-- <ul class="xr-cascader-option" v-if="options.length">
        <li v-for="(item,index) in options " :key="index">
            <p>{{item.label}}</p>
            <xr-cascader-option :options="item.children"></xr-cascader-option>
        </li>
    </ul> -->
</template>
<script>
export default {
    name: 'XrCascaderOption',
    props: {
        options: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            leftSelected: null
        }
    },
    computed: {
        rightOptions() {
            return this.leftSelected && this.leftSelected.children || []
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
