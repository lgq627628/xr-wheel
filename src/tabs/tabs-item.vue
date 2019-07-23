<template>
    <div class="xr-tabs-item" :class="tabClass" @click="change">
        <slot></slot>{{active}}
    </div>
</template>
<script>
export default {
    name: 'XrTabsItem',
    inject: ['eventBus'],
    props: {
        name: {
            type: String | Number,
            required: true
        },
        disabled: {
            type: Boolean,
            default: false
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
$color-blue: blue;
.xr-tabs-item {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    padding: 0 1em;
    height: 100%;
    cursor: pointer;
    &.active {
        color: $color-blue;
        font-weight: bold;
    }
}
</style>
