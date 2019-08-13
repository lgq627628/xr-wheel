<template>
    <div class="xr-page">
        <span
            class="xr-page__item"
            :class="[
                +curPage === page ? 'xr-page__item--active' : '',
                page === '...' ? 'xr-page__item--split' : ''
            ]"
            v-for="(page, index) in pages"
            :key="index"
            @click="changePage(page)">{{page}}</span>
    </div>
</template>
<script>
export default {
    name: 'XrPage',
    props: {
        totalPage: {
            type: Number | String,
            required: true
        },
        curPage: {
            type: Number | String,
            required: true
        },
        hideOnSinglePage: {
            type: Boolean,
            default: true
        }
    },
    data() {
        let pages = [...new Set([1, +this.totalPage, +this.curPage, +this.curPage+1, +this.curPage+2, +this.curPage-1, +this.curPage-2])]
                .filter(item=> item > 0)
                .sort((a, b) => a-b)
        pages = pages.reduce((prev, cur, index) => {
            prev.push(cur)
            if (pages[index+1] - pages[index] > 1) {
                prev.push('...')
            }
            return prev
        }, [])
        return {
            pages
        }
    },
    created() {
        window.vm = this;
    },
    methods: {
        changePage(page) {
            this.$emit('update:curPage', page)
            this.$emit('change', page)
        }
    }
}
</script>
<style lang="scss" scoped>
@import './var.scss';
.xr-page {
    user-select: none;
    &__item {
        margin: 0 5px;
        padding: .1em .5em;
        border-radius: $border-radius;
        border: 1px solid $border-color-grey;
        cursor: pointer;
        // &:not(:first-child) {
        //     margin-left: 10px;
        // }
        &--active, &:hover {
            border-color: $border-color-blue;
        }
        &--active, &--split {
            cursor: auto;
        }
        &--split {
            border: none;
        }
    }
}
</style>
