<template>
    <div class="xr-toast" ref="toast">
        <div v-if="enableHtml" v-html="$slots.default[0]"></div>
        <slot v-else></slot>
        <div class="xr-toast__line" ref="line"></div>
        <span class="xr-toast__close" v-if="closeBtn" @click="handleClose">{{closeBtn.text}}</span>
    </div>
</template>
<script>
export default {
    name: 'XrToast',
    props: {
        autoClose: {
            type: Boolean,
            default: true
        },
        duration: {
            type: Number,
            default: 300
        },
        closeBtn: {
            type: Object,
            default: () => {
                return {
                    text: '关闭',
                    cb: null
                }
            }
        },
        enableHtml: {
            type: Boolean,
            default: false
        }
    },
    mounted() {
        this.execAutoClose()
        this.updateStyle();
    },
    methods: {
        execAutoClose() {
            if (this.autoClose) {
                setTimeout(() => {
                    this.close();
                }, this.duration * 1000);
            }
        },
        updateStyle() {
            this.$nextTick(() => {
                this.$refs.line.style.height = this.$refs.toast.getBoundingClientRect().height + 'px'
            })
        },
        close() {
            this.$el.remove()
            this.$destroy()
        },
        handleClose() {
            if (this.closeBtn && typeof this.closeBtn.cb === 'function') {
                this.closeBtn.cb(this); // 可以把 this 回传给外面调用的地方
            }
            this.close()
        },
        log() {
            console.log('我居然能被外部调用')
        }
    }
}
</script>
<style lang="scss" scoped>
$font-size: 14px;
$min-height: 40px;
$bg-color: rgba(0, 0, 0, 0.7);
.xr-toast {
    display: flex;
    align-items: center;
    position: fixed;
    top: 15vh;
    left: 50%;
    padding: 0 16px;
    min-height: $min-height;
    transform: translateX(-50%);
    font-size: $font-size;
    background: $bg-color;
    border-radius: 4px;
    color: #fff;
    &__line {
        margin-left: 16px;
        height: 100%;
        border-left: 1px solid #ddd;
    }
    &__close {
        flex-shrink: 0;
        padding-left: 16px;
        cursor: pointer;
    }
}
</style>
