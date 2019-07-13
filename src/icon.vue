<template>
    <svg v-if="name" class="xr-icon" :class="[name === 'loading' ? 'xr-icon--loading' : '']" aria-hidden="true">
        <use :xlink:href="`#icon-${name}`"></use>
    </svg>
</template>
<script>
import './svg';
export default {
    name: 'XrIcon',
    props: {
        name: {
            type: String,
            default: ''
        }
    }
}
</script>
<style lang="scss" scoped>
.xr-icon {
    width: 1em;
    height: 1em;
    &--loading {
        animation: spin infinite linear 2s;
    }
    @keyframes spin {
        0% {
            transform: rotate(0);
        }
        100% {
            transform: rotate(360deg);
        }
    }
}
</style>
