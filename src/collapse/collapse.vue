<template>
    <div class="xr-collapse">
        <slot></slot>
    </div>
</template>
<script>
import Vue from 'vue'
export default {
    name: 'XrCollapse',
    props: {
        selected: {
            type: String | Number,
            default: ''
        },
        accordion: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            eventBus: new Vue()
        }
    },
    provide() {
        return {
            eventBus: this.eventBus,
            accordion: this.accordion
        }
    },
    mounted() {
        this.eventBus.$emit('updateAllStatus', this.selected)
        this.eventBus.$on('updateAllStatus', (name) => {
            this.$emit('update:selected', name)
        })
    }
}
</script>
<style lang="scss" scoped>
$grey: #ddd;
.xr-collapse {
   border: 1px solid $grey;
}
</style>
