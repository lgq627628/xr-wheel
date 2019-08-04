<template>
    <div class="xr-cascader-option">
        <div class="xr-cascader-option__left">
            <div class="xr-cascader-option__label" v-for="(item, index) in options " :key="index" @click="leftSelected = item">{{item.label}}</div>
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
.xr-cascader-option {
    display: flex;
    border: 1px solid #000;
    &__left, &__right {
        min-width: 150px;
        height: 200px;
        overflow: scroll;
    }
    &__right {
        margin-top: -1px;
    }
}
</style>
