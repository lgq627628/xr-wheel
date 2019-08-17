<template>
    <div class="xr-slider">
        <div class="xr-slider__inner">
            <slot></slot>
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
        }
    },
    mounted() {
        this.updateChildStatus()
        if (this.autoPlay) this.play()
    },
    methods: {
        play() {
            let names = this.$children.map(item => item.name)
            let idx = names.indexOf(this.getSelected())
            let len = names.length
            let run = () => {
                if (idx >= len) idx = 0
                this.$emit('update:selected', names[++idx])
                setTimeout(run, 2000);
            }
            setTimeout(run, 2000)
        },
        getSelected() {
            return this.selected || this.$children[0].name
        },
        updateChildStatus() {
            let selected = this.getSelected()
            this.$children.forEach(vm => {
                vm.selected = selected
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
    display: inline-block;
    border: 1px solid #000;
    // overflow: hidden;
    &__inner {
        position: relative;
   }
}
</style>
