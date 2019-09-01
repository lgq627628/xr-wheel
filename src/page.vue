<template>
    <div class="xr-page">
        <span class="xr-page__btn" :class="+curPage === 1 ? 'xr-page__btn--disabled' : ''" @click="gotoPrev">
            <xr-icon name="left"></xr-icon>
        </span>
        <span
            class="xr-page__item"
            :class="[
                +curPage === page ? 'xr-page__item--active' : '',
                page === '...' ? 'xr-page__item--split' : ''
            ]"
            v-for="(page, index) in pages"
            :key="index"
            @click="changePage(page)">{{page}}</span>
        <span class="xr-page__btn" :class="+curPage === +totalPage ? 'xr-page__btn--disabled' : ''" @click="gotoNext">
            <xr-icon name="right"></xr-icon>
        </span>
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
    computed: {
        pages() {
            let pages = [...new Set([1, +this.totalPage, +this.curPage, +this.curPage+1, +this.curPage+2, +this.curPage-1, +this.curPage-2])]
                .filter(item=> item > 0 && item <= this.totalPage)
                .sort((a, b) => a-b)
            pages = pages.reduce((prev, cur, index) => {
                prev.push(cur)
                if (pages[index+1] - pages[index] > 1) {
                    prev.push('...')
                }
                return prev
            }, [])
            return pages
        }
    },
    methods: {
        changePage(page) {
            this.$emit('update:curPage', page)
            this.$emit('change', page)
        },
        gotoPrev() {
            if (this.curPage <= 1) return
            this.changePage(this.curPage-1)
        },
        gotoNext() {
            if (this.curPage >= this.totalPage) return
            this.changePage(this.curPage+1)
        }
    }
}
</script>
<style lang="scss" scoped>
@import './style/var.scss';
.xr-page {
    display: flex;
    align-items: center;
    user-select: none;
    &__item {
        margin: 0 5px;
        padding: .1em .5em;
        border-radius: $border-radius;
        border: 1px solid $border-color-grey;
        cursor: pointer;
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
    &__btn {
        display: flex;
        align-items: center;
        cursor: pointer;
        &--disabled {
            svg {
                fill: #ddd;
            }
            cursor: not-allowed;
        }
    }
}
</style>
