<template>
    <div class="xr-table-wrapper">
        <table
            class="xr-table"
            :class="[
                bordered? 'xr-table--bordered' : '',
                size ? `xr-table--${size}` : '',
                stripe ? 'xr-table--stripe' : ''
            ]">
            <thead>
                <tr>
                    <th><input ref="allChecked" type="checkbox" @change="changeAllItem" :checked="isAllSelected"></th>
                    <th v-if="numVisible">#</th>
                    <th v-for="(col, index) in columns" :key="index">{{col.title}}<span class="xr-table__sort" v-if="col.sort" @click="toggleSort(col)">↑↓<span></th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="(row, i) in dataSource" :key="i">
                    <td><input type="checkbox" @change="changeItem(row, i, $event)" :checked="formateStatus(row)"></td>
                    <td v-if="numVisible">{{i+1}}</td>
                    <template v-for="(col, j) in columns">
                        <td :key="`${i}-${j}`">{{row[col.key]}}</td>
                    </template>
                </tr>
            </tbody>
        </table>
        <div class="xr-table--loading" v-if="loading">
            <xr-icon name="loading"></xr-icon>
        </div>
    </div>
</template>

<script>
export default {
    name: 'XrTable',
    props: {
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
            default: false
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
    computed: {
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
    methods: {
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
.xr-table {
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
    border-bottom: 1px solid $border-color-grey;
   
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
    &-wrapper {
        position: relative;
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