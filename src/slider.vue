<template>
    <div class="xr-slider" @mouseenter="onMouseenter" @mouseleave="onMouseleave">
        <div class="xr-slider__inner">
            <slot></slot>
        </div>
        <div class="xr-slider__dots">
            <span v-for="(item, idx) in names" :key="idx" :class="(selected || names[0]) === item ? 'active' : ''" @click="select(item)"></span>
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
            timeId: ''
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
                if (this.direction === 'right') {
                    vm.reverse = false
                } else {
                    vm.reverse = newIdx < oldIdx || (newIdx === this.names.length - 1 && oldIdx === 0) ? true : false
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
}
</style>
