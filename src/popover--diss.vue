<template>
    <div class="xr-popover" @click.stop="toggleVisible">
        <!-- 加上 stop 的话，会阻止用户的点击事件，所以这是不可取的 -->
        <div class="xr-popover__content" v-if="visible" @click.stop>
            <slot></slot>
        </div>
        <slot name="reference"></slot>
    </div>
</template>
<script>
export default {
    name: 'XrPopover',
    data() {
        return {
            visible: false
        }
    },
    methods: {
        toggleVisible() {
            this.visible = !this.visible
            if (this.visible) {
                setTimeout(() => { // 这是异步的
                    let f = () => {
                        this.visible = false
                        document.removeEventListener('click', f)
                    }
                    document.addEventListener('click', f) // 不要加在 body 上，因为页面可能没那么高
                })
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.xr-popover {
   display: inline-block;
   position: relative;
   &__content {
       position: absolute;
       left: 0;
       bottom: 100%;
       border: 1px solid red;
       box-shadow: 0 0 3px rgba(0, 0, 0, .5)
   }
}
</style>
