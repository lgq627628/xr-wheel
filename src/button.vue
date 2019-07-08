<template>
    <button class="xr-button" :class="[iconPos === 'right' ? 'icon-right' : '']">
        <xr-icon v-if="icon" class="icon" :name="icon"></xr-icon>
        <!-- 因为slot不能加class，加了也会不见 -->
        <div class="content">
            <slot></slot>
        </div>
    </button>
</template>
<script>
export default {
    name: 'XrButton',
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
        }
    }
}
</script>
<style lang="scss">
.xr-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    // 所有行内样式都会有这个问题 
    vertical-align: middle;
    padding: 0 1em;
    height: var(--button-height);
    font-size: var(--font-size);
    border-radius: var(--border-radius);
    border: 1px solid var(--border-color);
    background: var(--button-bg);
    &:hover {
        border: 1px solid var(--border-color-hover);
    }
    &:active {
        background: var(--button-bg-active);
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
