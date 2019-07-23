<template>
    <div class="xr-tabs">
        <slot></slot>
    </div>
</template>
<script>
export default {
    name: 'XrTabs',
    props: {
        selected: {
            type: String,
            required: true,
            default: ''
        },
        direction: {
            type: String,
            default: 'horizontal',
            validator(val) {
                return ['horizontal', 'vettical'].indexOf(val) > -1
            }
        }
    },
    created(){
        this.$emit('update:selected')
    }
}
</script>
<style lang="scss" scoped>
.xr-tabs {
   
}
</style>
