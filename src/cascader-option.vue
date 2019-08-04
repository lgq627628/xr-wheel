<template>
    <ul class="xr-cascader-option" v-if="options.length">
        <li v-for="(item,index) in options " :key="index">
            <p>{{item.label}}</p>
            <xr-cascader-option :options="item.children"></xr-cascader-option>
        </li>
    </ul>
</template>
<script>
export default {
    name: 'XrCascaderOption',
    props: {
        options: {
            type: Array,
            default: () => []
        }
    }
}
</script>
<style lang="scss" scoped>
.xr-cascader-option {
   border: 1px solid #000;
   margin: 20px;
}
</style>
