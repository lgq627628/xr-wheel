<template>
    <div class="xr-tabs-item" :data-name="name" :class="tabClass" @click="change">
        <slot></slot>
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
                active: this.active,
                disabled: this.disabled
            }
        }
    },
    created() {
        this.eventBus && this.eventBus.$on('update:selected', name => {
            this.active = name === this.name
        })
    },
    methods: {
        change() {
            if (this.disabled) return
            this.eventBus && this.eventBus.$emit('update:selected', this.name)
            this.$emit('click', this) // 给测试用的
        }
    }
}
</script>
<style lang="scss" scoped>
$color-blue: blue;
$color-disabled: #ccc;
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
    &.disabled {
        color: $color-disabled;
        cursor: not-allowed;
    }
}
</style>
