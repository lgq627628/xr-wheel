<template>
    <svg v-if="name" class="xr-icon" aria-hidden="true">
        <use :xlink:href="`#icon-${name}`"></use>
    </svg>
</template>
<script>
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
<style lang="scss">
.xr-icon {
    width: 1em;
    height: 1em;
}
</style>
