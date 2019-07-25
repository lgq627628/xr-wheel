<template>
    <div class="xr-tabs-pane" :class="tabClass" v-if="active">
        <slot></slot>
    </div>
</template>
<script>
export default {
    name: 'XrTabsPane',
    inject: ['eventBus'],
    props: {
        name: {
            type: String | Number,
            required: true
        }
    },
    data() {
        return {
            active: false
        }
    },
    computed: {
        tabClass() {
            return {
                active: this.active
            }
        }
    },
    created() {
        this.eventBus.$on('update:selected', name => {
            this.active = name === this.name
        })
    },
    methods: {
        change() {
            this.eventBus.$emit('update:selected', this.name)
        }
    }
}
</script>
<style lang="scss" scoped>
.xr-tabs-pane {
    padding: 1em;
}
</style>
