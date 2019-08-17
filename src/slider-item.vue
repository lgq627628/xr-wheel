<template>
    <transition name="slide">
        <div class="xr-slider-item" v-if="visible">
            <slot></slot>
        </div>
    </transition>
</template>

<script>
export default {
    name: 'XrSliderItem',
    props: {
        name: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            selected: ''
        }
    },
    computed: {
        visible() {
            return this.selected === this.name
        }
    }
}
</script>

<style lang="scss" scoped>
.xr-slider-item {
    width: 100px;
    height: 100px;
    flex-shrink: 0;
}
.slide-leave-active { // 这个思想很重要，一个元素绝对定位，另一个元素正常布局就能够撑开父元素
    position: absolute;
    top: 0;
    left: 0;
}
.slide-enter-active, .slide-leave-active {
    transition: all 1s;
}
.slide-enter {
    transform: translateX(100%);
}
.slide-leave-to {
    transform: translateX(-100%);
}
</style>
