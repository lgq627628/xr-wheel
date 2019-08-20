<template>
    <div class="xr-collapse-item">
        <div class="xr-collapse-item__title" @click="toggle">{{title}}</div>
        <div class="xr-collapse-item__content" v-show="isOpen">
            <slot></slot>
        </div>
    </div>
</template>
<script>
export default {
    name: 'XrCollapseItem',
    inject: ['eventBus', 'accordion'],
    props: {
        title: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            isOpen: false
        }
    },
    mounted() {
        this.eventBus.$on('updateAllStatus', (name) => {
            if (name === this.name) {
                this.isOpen = true
            } else {
                if (this.accordion) this.isOpen = false
            }
        })
    },
    methods: {
        toggle() {
            this.isOpen = !this.isOpen
            if (this.isOpen && this.accordion) this.eventBus.$emit('updateAllStatus', this.name)
        }
    }
}
</script>
<style lang="scss" scoped>
$grey: #ddd;
.xr-collapse-item {
    border-top: 1px solid $grey;
    &__title {
        display: flex;
        align-items: center;
        padding: 0 10px;
        min-height: 32px;
        font-weight: bold;
    }
    &__content {
        padding: 10px;
        border-top: 1px solid $grey;
        transition: all 1s;
    }
    &:first-child {
        border-top: none;
    }
}
</style>
