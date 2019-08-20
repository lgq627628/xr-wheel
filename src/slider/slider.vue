<template>
    <div class="xr-slider"
        @mouseenter="onMouseenter"
        @mouseleave="onMouseleave"
        @touchstart="onTouchstart"
        @touchmove="onTouchmove"
        @touchend="onTouchend">
        <div class="xr-slider__inner">
            <slot></slot>
        </div>
        <div class="xr-slider__dots">
            <span v-for="(item, idx) in names" :key="idx" :class="(selected || names[0]) === item ? 'active' : ''" @click="select(item)"></span>
        </div>
        <div class="xr-slider__arrow">
            <span @click="move(true)">&lt;</span>
            <span @click="move(false)">&gt;</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'XrSlider',
    props: {
        selected: {
            type: String
        },
        autoPlay: {
            type: Boolean,
            default: true
        },
        direction: {
            type: String,
            default: 'right'
        }
    },
    data() {
        return {
            names: [],
            lastSelected: '',
            timeId: '',
            startPoint: ''
        }
    },
    mounted() {
        this.names = this.$children.map(item => item.name)
        this.updateChildStatus()
        if (this.autoPlay) this.play()
    },
    methods: {
        play() {
            if (this.timeId) return // 可能会重复动画
            let names = this.names
            let len = names.length
            let run = () => {
                let idx = names.indexOf(this.getSelected())
                let newIdx = this.direction === 'right' ? idx + 1 : idx - 1
                if (newIdx > len - 1) newIdx = 0
                if (newIdx < 0) newIdx = len - 1
                this.select(names[newIdx])
                this.timeId = setTimeout(run, 3000);
            }
            this.timeId = setTimeout(run, 3000)
        },
        onMouseenter() {
            this.pause()
        },
        onMouseleave() {
            this.play()
        },
        onTouchstart(e) {
            this.pause()
            this.startPoint = e.touches[0] // 因为有多点触控
        },
        onTouchmove(e) {
        },
        onTouchend(e) {
            let {clientX: x1, clientY: y1} = this.startPoint
            let {clientX: x2, clientY: y2} = e.changedTouches[0]
            let deltaX = x2-x1
            let deltaY = y2-y1
            let k = deltaY / deltaX
            if (-1 < k && k < 1) { // 此处要判断滑动趋势，说明用户是在滑
                this.move(deltaX > 0)
            }
            this.play()
        },
        move(isLeft) {
            let newIdx = this.names.indexOf(this.selected || this.$children[0].name)
            let len = this.names.length
            isLeft ? newIdx-- : newIdx++
            if (newIdx > len - 1) newIdx = 0
            if (newIdx < 0) newIdx = len - 1
            this.select(this.names[newIdx])
        },
        pause() {
            window.clearTimeout(this.timeId)
            this.timeId = ''
        },
        select(item) {
            this.lastSelected = this.selected
            this.$emit('update:selected', item)
        },
        getSelected() {
            return this.selected || this.$children[0].name
        },
        updateChildStatus() {
            let selected = this.getSelected()
            let newIdx = this.names.indexOf(selected)
            let oldIdx = this.names.indexOf(this.lastSelected || this.$children[0].name)
            this.$children.forEach(vm => {
                vm.reverse = newIdx < oldIdx ? true : false
                if (newIdx === 0 && oldIdx === this.names.length - 1) {
                    vm.reverse = false
                }
                if (newIdx === this.names.length - 1 && oldIdx === 0) {
                    vm.reverse = true
                }
                this.$nextTick(() => {
                    vm.selected = selected
                }) 
            })
        }
    },
    watch: {
        selected() {
            this.updateChildStatus()
        }
    }
}
</script>

<style lang="scss" scoped>
.xr-slider {
    position: relative;
    overflow: hidden;
    &__inner {
        position: relative;
    }
    &__dots {
        display: flex;
        position: absolute;
        bottom: 15px;
        left: 50%;
        transform: translateX(-50%);
        span {
            width: 10px;
            height: 10px;
            background: #fff;
            border-radius: 50%;
            &:not(:first-child) {
                margin-left: 5px;
            }
                &:hover {
                    cursor: pointer;
                }
            &.active {
                background: #000;
                cursor: auto;
            }
        }
    }
    &__arrow {
        display: flex;
        align-items: center;
        position: absolute;
        justify-content: space-between;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        span {
            width: 20px;
            height: 20px;
            line-height: 20px;
            border-radius: 50%;
            background: #ddd;
            text-align: center;
        }
    }
}
</style>
