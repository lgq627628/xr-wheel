<template>
    <div class="xr-popover" @click="onClick">
        <div class="xr-popover__content" ref="content" v-if="visible">
            <slot></slot>
        </div>
        <span ref="reference">
            <slot name="reference"></slot>
        </span>
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
        onClick() {
            this.visible = !this.visible
            if (this.visible) this.onShow()
        },
        onShow() {
            setTimeout(() => { // 这是异步的
                this.positionContent()
                this.addDocumentListener()
            })
        },
        positionContent() {
            let content = this.$refs.content
            document.body.appendChild(content) // 把元素移动到 body 下面，移动元素位置不会改变任何功能
            let {width, height, top, left} = this.$refs.reference.getBoundingClientRect()
            content.style.top = `${top + window.scrollY}px`
            content.style.left = `${left + window.scrollX}px`
        },
        addDocumentListener() {
            let f = (e) => {
                if (this.$refs.content && this.$refs.content.contains(e.target)) return
                this.visible = false
                document.removeEventListener('click', f)
            }
            document.addEventListener('click', f) // 不要加在 body 上，因为页面可能没那么高
        }
    }
}
</script>
<style lang="scss" scoped>
.xr-popover {
   display: inline-block;
   &__content {
       position: absolute;
       border: 1px solid red;
       box-shadow: 0 0 3px rgba(0, 0, 0, .5);
       transform: translateY(-100%);
   }
}
</style>
