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
                    <th><input type="checkbox"></th>
                    <th v-if="numVisible">#</th>
                    <th v-for="(col, index) in columns" :key="index">{{col.title}}</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="(row, i) in dataSource" :key="i">
                    <td><input type="checkbox" @change="changeItem(row, i, $event)"></td>
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
            type:Array,
            default: () => [],
            required: true
        },
        dataSource: {
            type:Array,
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
        }
    },
    methods: {
        changeItem(row, i, e) {
            this.$emit('change-item', {selected: e.target.checked, row, index: i})
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