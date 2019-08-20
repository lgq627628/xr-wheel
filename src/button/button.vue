<template>
    <button class="xr-button" :class="[iconPos === 'right' ? 'icon-right' : '']" @click="$emit('click')">
        <xr-icon v-if="loading" class="icon" name="loading"></xr-icon>
        <xr-icon v-if="icon && !loading" class="icon" :name="icon"></xr-icon>
        <!-- 因为slot不能加class，加了也会不见 -->
        <div class="content">
            <slot></slot> 
        </div>
    </button>
</template>
<script>
import XrIcon from '../icon';
export default {
    name: 'XrButton',
    components: {
        XrIcon
    },
    props: {
        icon: {
            type: String,
            default: ''
        },
        iconPos: {
            type: String,
            default: 'left',
            validator(val) {
                return val === 'left' || val === 'right'
            }
        },
        loading: {
            type: Boolean,
            default: false
        }
    }
}
</script>
<style lang="scss" scoped>
@import "../var.scss";
.xr-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    // 所有行内样式都会有这个问题 
    vertical-align: middle;
    padding: 0 1em;
    height: $default-height;
    font-size: $font-size;
    border-radius: $border-radius;
    border: 1px solid $border-color;
    background: $button-bg;
    &:hover {
        border: 1px solid $border-color-hover;
    }
    &:active {
        background: $button-bg-active;
    }
    &:focus {
        outline: none;
    }
    .icon {
        order: 1;
        margin-right: .2em;
    }
    .content {
        order: 2;
    }
    &.icon-right {
        .icon {
            order: 2;
            margin-left: .2em;
            margin-right: 0;
        }
        .content {
            order: 1;
        }
    }
}
</style>
