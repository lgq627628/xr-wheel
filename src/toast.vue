<template>
    <div class="xr-toast" ref="toast" :class="toastClass">
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
        duration: {
            type: Number,
            default: 3
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
        },
        position: {
            type: String,
            default: 'top',
            validator(val) {
                return ['top', 'bottom', 'middle'].indexOf(val) >= 0
            }
        }
    },
    computed: {
        toastClass() {
            return `xr-toast--${this.position}`
        }
    },
    mounted() {
        this.execAutoClose()
        this.updateStyle();
    },
    methods: {
        execAutoClose() {
            if (this.duration) {
                setTimeout(() => {
                    this.close();
                }, this.duration * 1000);
            }
        },
        updateStyle() {
            this.$nextTick(() => {
                if (this.$refs.line) this.$refs.line.style.height = this.$refs.toast.getBoundingClientRect().height + 'px'
            })
        },
        close() {
            this.$el.remove()
            this.$emit('close')
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
$animation-duration: 1s;
.xr-toast {
    display: flex;
    align-items: center;
    position: fixed;
    left: 50%;
    padding: 0 16px;
    min-height: $min-height;
    font-size: $font-size;
    background: $bg-color;
    border-radius: 4px;
    color: #fff;
    &--top {
        top: 0;
        animation: fadeInTop $animation-duration;
        animation-fill-mode: forwards;
        border-top-left-radius: 0;
        border-top-right-radius: 0;
    }
    &--bottom {
        bottom: 0;
        animation: fadeInBottom $animation-duration;
        animation-fill-mode: forwards;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
    }
    &--middle {
        top: 50%;
        transform: translate(-50%, -50%);
        animation: fadeIn $animation-duration;
    }
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
@keyframes fadeIn {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;        
    }
}
@keyframes fadeInTop {
    0% {
        opacity: 0;
        transform: translate(-50%, -100%);
    }
    100% {
        opacity: 1;  
        transform: translate(-50%, 0);
    }
}
@keyframes fadeInBottom {
    0% {
        opacity: 0;
        transform: translate(-50%, 100%);
    }
    100% {
        opacity: 1;  
        transform: translate(-50%, 0);
    }
}
</style>
