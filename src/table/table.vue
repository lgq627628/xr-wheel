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
                    <th><input ref="allChecked" type="checkbox" @change="changeAllItem"></th>
                    <th v-if="numVisible">#</th>
                    <th v-for="(col, index) in columns" :key="index">{{col.title}}</th>
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
            this.$refs['allChecked'].indeterminate = false
            if (copy.length <= 0) {
                this.$refs['allChecked'].checked = false
            } else if (copy.length >= this.dataSource.length) {
                this.$refs['allChecked'].checked = true
            } else {
                this.$refs['allChecked'].indeterminate = true
            }
        },
        changeAllItem(e) {
            let selected = e.target.checked
            this.$emit('update:selected-items', selected ? this.dataSource : [])
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
} 
</style>