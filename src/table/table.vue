<template>
    <div class="xr-table-wrapper" ref="wrapper" :style="tableStyle">
        <div class="xr-table__header" ref="tableHeader">
        </div>
        <div class="xr-table__body" ref="tableBody">
            <table
                class="xr-table"
                ref="table"
                :class="[
                    bordered? 'xr-table--bordered' : '',
                    size ? `xr-table--${size}` : '',
                    stripe ? 'xr-table--stripe' : ''
                ]">
                <thead>
                    <tr>
                        <th v-if="expand"></th>
                        <th v-if="hasCheckbox"><input ref="allChecked" type="checkbox" @change="changeAllItem" :checked="isAllSelected"></th>
                        <th v-if="numVisible">#</th>
                        <th v-for="(col, index) in columns" :key="index">{{col.title}}<span class="xr-table__sort" v-if="col.sort" @click="toggleSort(col)">↑↓<span></th>
                        <th v-if="$slots.op">操作</th>
                    </tr>
                </thead>

                <tbody>
                    <template v-for="(row, i) in dataSource">
                        <tr :key="i">
                            <td v-if="expand" @click="toggleExpand(row.id)"><xr-icon name="right"></xr-icon></td>
                            <td v-if="hasCheckbox"><input type="checkbox" @change="changeItem(row, i, $event)" :checked="formateStatus(row)"></td>
                            <td v-if="numVisible">{{i+1}}</td>
                            <template v-for="(col, j) in columns">
                                <td :key="`${i}-${j}`">{{row[col.key]}}</td>
                            </template>
                            <td v-if="$slots.op">
                                <slot name="op" v-bind:row="row"></slot>
                            </td>
                        </tr>
                        <tr :key="`expande-${i}`" v-if="checkIsExpand(row.id)">
                            <td :colspan="expandColSpan">{{`${row.desc}-${i}` || '暂无'}}</td>
                        </tr>
                    </template>
                </tbody>
            </table>
        </div>
        <div class="xr-table--loading" v-if="loading">
            <xr-icon name="loading"></xr-icon>
        </div>
    </div>
</template>

<script>
export default {
    name: 'XrTable',
    props: {
        hasCheckbox: {
            type: Boolean,
            default: false
        }, 
        expand: {
            type: Boolean,
            default: false
        }, 
        height: {
            type: String | Number,
            default: -1
        },
        columns: {
            type: Array,
            default: () => [],
            required: true
        },
        dataSource: {
            type: Array,
            default: () => [],
            required: true
        },
        numVisible: {
            type: Boolean,
            default: false
        
        },
        stripe: {
             type: Boolean,
            default: true
        },
        bordered: {
             type: Boolean,
            default: true
        },
        size: {
            type: String,
            default: ''
        },
        selectedItems: {
            type: Array,
            default: () => [],
        },
        loading: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            headerWrap: null,
            bodyWrap: null,
            expandIds: []
        }
    },
    computed: {
        expandColSpan() {
            return this.columns.length + Number(this.hasCheckbox)  + Number(this.expand) + Number(Object.keys(this.$slots).length)
        },
        tableStyle() {
            return this.height ? `height: ${this.height}px` : ''
        },
        isAllSelected() {
            // 由于是单向数据流，所以不能单纯判断长度是否相等来判断全选
            let all = this.dataSource.map(item => item.id).sort()
            let selected = this.selectedItems.map(item => item.id).sort()
            let isEqual = true
            if (all.length === selected.length) {
                for(let i = 0, len = all.length; i<len; i++) {
                    if (all[i] !== selected[i]) {
                        isEqual = false
                        break;
                    }
                }
            } else {
                isEqual = false
            }
            this.$nextTick(() => {
                this.$refs['allChecked'].indeterminate = selected.length && !isEqual
            })
            return isEqual
        }
    },
    mounted() {
        window.vm = this
        let origin = this.$refs.table
        let copy = origin.cloneNode(false)
        Array.from(origin.children).map(node => {
            if (node.tagName.toLowerCase() !== 'tbody') {
                copy.appendChild(node)
                // node.remove()
            }
        })
        // Array.from(copy.children[0].children).map(node => {
        //     if (node.tagName.toLowerCase() !== 'thead') node.remove()
        // })
        // this.$refs.wrapper.insertBefore(copy, this.$refs.wrapper.children[0])
        let tableHeader = this.$refs.tableHeader;
        this.$refs.tableHeader.appendChild(copy)
        let headerH = parseInt(window.getComputedStyle(tableHeader).height)
        // tableHeader.getBoundingClientRect()
        let bodyH = this.height - headerH
        this.$refs.tableBody.style.height = `${bodyH}px`
        this.headerWrap = this.$refs.tableHeader
        this.bodyWrap = this.$refs.tableBody
        this.updateHeaderWidth()
        window.addEventListener('resize', this.updateHeaderWidth)
    },
    beforeDestroy() {
        this.headerWrap.remove()
        window.removeEventListener('resize', this.updateHeaderWidth)
    },
    methods: {
        checkIsExpand(id) {
            return this.expandIds.indexOf(id) >= 0
        },
        toggleExpand(id) {
            let idx = this.expandIds.indexOf(id)
            if(idx >= 0) {
                this.expandIds.splice(idx, 1)
            } else {
                this.expandIds.push(id)
            }
            this.updateHeaderWidth()
        },
        onWindowResize() {
            this.updateHeaderWidth()
        },
        updateHeaderWidth() {
            // 这样好不好呢，不太好，最好让用户定宽，省得你计算，框架也是这样说的
            let originTd = this.bodyWrap.children[0].children[0].children[0].children
            let copyTd = this.headerWrap.children[0].children[0].children[0].children

            Array.from(originTd).map((td, idx) => {
                copyTd[idx].style.width = `${td.getBoundingClientRect().width}px`
            })
        },
        formateStatus(row) {
            return this.selectedItems.findIndex(item => item.id === row.id) >= 0
        },
        changeItem(row, i, e) {
            let selected = e.target.checked
            let copy = JSON.parse(JSON.stringify(this.selectedItems))
            if (selected) {
                copy.push(row)
            } else {
                let idx = copy.findIndex(item => item.id === row.id)
                copy.splice(idx, 1)
            }
            this.$emit('update:selected-items', copy)
        },
        changeAllItem(e) {
            let selected = e.target.checked
            this.$emit('update:selected-items', selected ? this.dataSource : [])
        },
        toggleSort(col) {
            this.$emit('sort')
        }
    }
}
</script>

<style lang="scss">
@import "../style/var.scss";
.xr-table-wrapper {
    position: relative;
    border-bottom: 1px solid $border-color-grey;
}
.xr-table {
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
   
    td, th {
        padding: 8px;
        text-align: left;
        border-bottom: 1px solid $border-color-grey;

    }
    thead > tr {
            background: $background-grey;
    }
    &--bordered {
        border: 1px solid $border-color-grey;
        td, th {
            border: 1px solid $border-color-grey;
        }

    }
    &--small {
        td, th {
            padding: 4px;
        }
    }
    &--stripe {
        tbody > tr {
            &:nth-child(even) {
                background: $background-grey;
            }
        }
    }
    &__sort {
        cursor: pointer;
    }
    &__body {
        overflow: auto;
    }
    &--loading {
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        font-size: 30px;
        background: rgba(255, 255, 255, 0.8);
    }
} 
</style>