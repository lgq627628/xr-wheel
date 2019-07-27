<template>
    <div class="xr-popover" ref="popover">
        <div class="xr-popover__content" :class="[`xr-popover__content--${direction}`]" ref="content" v-if="visible">
            <slot></slot>
        </div>
        <span ref="reference" class="xr-popover__reference">
            <slot name="reference"></slot>
        </span>
    </div>
</template>
<script>
export default {
    name: 'XrPopover',
    props: {
        direction: {
            type: String,
            default: 'top',
            validator(val) {
                return ['top', 'bottom', 'right', 'left'].indexOf(val) >= 0
            }
        },
        trigger: {
            type: String,
            default: 'hover',
            validator(val) {
                return ['click', 'hover'].indexOf(val) >= 0
            }
        }
    },
    data() {
        return {
            visible: false
        }
    },
    computed: {
        openEvent() {
            return this.trigger === 'click' ? 'click' : 'mouseenter'
        },
        closeEvent() {
            return this.trigger === 'click' ? 'click' : 'mouseleave'            
        }
    },
    mounted() {
        let popover = this.$refs.popover
        if (this.trigger === 'click') {
            popover.addEventListener('click', this.onClick)
        } else {
            popover.addEventListener('mouseenter', this.onClick)
            popover.addEventListener('mouseleave', this.onClick)
        }
        
    },
    methods: {
        onClick() {
            if (this.visible) {
                this.close()
            } else {
                this.open()
            }
        },
        open() {
            this.visible = true
            setTimeout(() => { // 这是异步的
                this.positionContent()
                document.addEventListener('click', this.onClickDocument) // 不要加在 body 上，因为页面可能没那么高，点击的就不是 body 了
            })
        },
        positionContent() {
            const {content, reference} = this.$refs
            document.body.appendChild(content) // 把元素移动到 body 下面，移动元素位置不会改变任何功能
            let {width, height, top, left} = reference.getBoundingClientRect()
            let {height: height2} = content.getBoundingClientRect()
            let posMap = {
                top: {
                    top: top + window.scrollY,
                    left: left + window.scrollX
                },
                bottom: {
                    top: top + window.scrollY + height,
                    left: left + window.scrollX
                },
                left: {
                    top: top + window.scrollY + (height - height2) / 2,
                    left: left + window.scrollX
                },
                right: {
                    top: top + window.scrollY + (height - height2) / 2,
                    left: left + width + window.scrollX
                }
            }
            content.style.top = posMap[this.direction].top + 'px'
            content.style.left = posMap[this.direction].left + 'px'
        },
        onClickDocument(e) {
            let content = this.$refs.content
            let target = e.target
            if (content && (content === target || content.contains(target))) return // 做这个判断是为了防止关闭两次
            this.close()
        },
        close() { // 收拢关闭路口
            this.visible = false
            document.removeEventListener('click', this.onClickDocument)
        },
        todo() {
            // 如果浮层触顶就自动放下面，获取 content 高度 和 reference 高度，然后相减判断
        }
    },
    destroyed() {
        let popover = this.$refs.popover
        if (this.trigger === 'click') {
            popover.removeEventListener('click', this.onClick)
        } else {
            popover.removeEventListener('mouseenter', this.onClick) // this.open 也可以
            popover.removeEventListener('mouseleave', this.onClick) // this.close 也可以
        }
    }
}
</script>
<style lang="scss" scoped>
$border-color: #ebeef5;
$border-radius: 4px;
.xr-popover {
    display: inline-block;
    &__content {
        position: absolute;
        padding: 0.5em 1em;
        max-width: 20em; // 限制多少个字而不是限制多宽
        border: 1px solid $border-color;
        border-radius: $border-radius;
        box-shadow: 0 2px 12px rgba(0, 0, 0, .1);
        word-break: break-all; // 英文网站最好不加
        // filter: drop-shadow(0 1px 1px rgba(0, 0, 0, .5));
        background: white;
        &::before, &::after {
            content: '';
            display: block;
            position: absolute;
            width: 0;
            height: 0;
            border: 6px solid transparent;
            // transform: translateX(-50%);
        }
        &--top {
            margin-top: -6px;
            transform: translateY(-100%);
            &::before, &::after {
                top: 100%;
                left: 10px;
                border-top-color: $border-color;
            }
            &::after {
                top: calc(100% - 1px);
                border-top-color: white;
            }
        }
        &--bottom {
            margin-top: 6px;
            &::before, &::after {
                bottom: 100%;
                left: 10px;
                border-bottom-color: $border-color;
            }
            &::after {
                bottom: calc(100% - 1px);
                border-bottom-color: white;
            }
        }
        &--left {
            transform: translateX(-100%);
            margin-left: -6px;
            &::before, &::after {
                top: 50%;
                transform: translateY(-50%);
            }
            &::before {
                left: 100%;
                border-left-color: $border-color;
            }
            &::after {
                left: calc(100% - 1px);
                border-left-color: white;
            }
        }
        &--right {
            margin-left: 6px;
            &::before, &::after {
                top: 50%;
                transform: translateY(-50%);
            }
            &::before {
                right: 100%;
                border-right-color: $border-color;
            }
            &::after {
                right: calc(100% - 1px);
                border-right-color: white;
            }
        }
    }
    &__reference {
        display: inline-block;
    }
}
</style>
