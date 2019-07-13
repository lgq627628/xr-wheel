<template>
    <div class="xr-input" :class="[error ? 'xr-input--error' : '']">
        <!-- change 是原生事件，$event 是浏览器给的原生事件值 -->
        <input
            type="text"
            :value="value"
            :disabled="disabled"
            :readonly="readonly"
            @change="$emit('change', $event)"
            @input="$emit('input', $event)"
            @focus="$emit('focus', $event)"
            @blur="$emit('blur', $event)">
        <template v-if="error">
            <xr-icon name="error" class="xr-input__erricon"></xr-icon>
            <span class="xr-input__errmsg">{{error}}</span> 
        </template>
    </div>
</template>
<script>
import XrIcon from './icon';
export default {
    name: 'XrInput',
    components: {
        XrIcon
    },
    props: {
        value: {
            type: String,
            default: ''
        },
        disabled: {
            type: Boolean,
            default: false
        },
        readonly: {
            type: Boolean,
            default: false
        },
        error: {
            type: String,
            default: ''
        },

    }
}
</script>
<style lang="scss" scoped>
$height: 32px;
$border-color: #999;
$border-color-hover: #666;
$border-radius: 4px;
$font-size: 14px;
$box-shadow-color: rgba(0,0,0,0.5);
$red: #f1453d;
.xr-input {
    display: inline-flex;
    align-items: center;
    font-size: $font-size;
    > input {
        padding: 0 8px;
        height: $height;
        border: 1px solid $border-color;
        border-radius: $border-radius;
        font-size: inherit;
        &:hover {
            border: 1px solid $border-color-hover;
        }
        &:focus {
            outline: none;
            box-shadow: inset 0 1px 3px $box-shadow-color;
        }
        &[disabled], &[readonly]{
            border-color: #bbb;
            color: #bbb;
            cursor: not-allowed;
        }
    }
    &--error {
        > input {
            border-color: $red;
            color: $red;
        }
        .xr-input__erricon {
            fill: $red;
        }
        .xr-input__errmsg {
            color: $red;
        }
    }
    > :not(:last-child) {
        margin-right: .5em;
    }
}
</style>