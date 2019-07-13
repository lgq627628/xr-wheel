<template>
    <div class="xr-row" :style="rowStyle" :class="rowClass">
        <slot></slot>
    </div>
</template>
<script>
export default {
    name: 'XrRow',
    props: {
        gutter: [String, Number],
        align: {
            type: String,
            validator(val) {
                return ['left', 'right', 'center'].includes(val)
            }
        }
    },
    computed: {
        rowStyle() {
            return {
                marginLeft: -this.gutter/2 + 'px',
                marginRight: -this.gutter/2 + 'px'
            }
        },
        rowClass() {
            return [
                this.align ? `xr-row--${this.align}` : ''
            ]
        }
    },
    mounted() {
        this.$children.forEach(vm => {
            vm.gutter = this.gutter;
        })
    }
}
</script>
<style lang="scss" scoped>
.xr-row {
    display: flex;
    &--left {
        justify-content: flex-start;
    }
    &--right {
        justify-content: flex-end;
    }
    &--center {
        justify-content: center;
    }
}
</style>
