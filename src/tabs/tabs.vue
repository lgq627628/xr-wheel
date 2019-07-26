<template>
    <div class="xr-tabs">
        <slot></slot>
    </div>
</template>

<script>
import Vue from 'vue'
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
    data() {
        return {
            eventBus: new Vue()
        }
    },
    provide() {
        return {
            eventBus: this.eventBus
        }
    },
    mounted(){
        if (this.$children.length <= 0) {
            throw new Error('xr-tabs 标签里面不能为空')
        }
        this.eventBus.$emit('update:selected', this.selected)
    }
}
</script>
<style lang="scss" scoped>
.xr-tabs {}
</style>
