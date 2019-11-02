<template>
  <div class="xr-table" :style="tableStyle">
    <div class="xr-table__header" ref="tableHeader">
      <table>
        <colgroup>
          <col v-for="(col, index) in columns" :key="index" :width="col.width || ''">
        </colgroup>
        <thead>
          <tr>
            <th v-for="col in columns" :key="col.key">
              <div>
                <template v-if="col.type === 'selection'">
                  <input
                    ref="allCheckbox"
                    type="checkbox"
                    :checked="isSelectAll"
                    @change="selectAll"
                  >
                </template>
                <template v-else-if="col.type === 'expand'"></template>
                <template v-else>
                  <span>{{col.title}}</span>
                  <span v-if="col.sortable">
                    <i @click="handleSort(col.key, 'asc')">↑</i>
                    <i @click="handleSort(col.key, 'desc')">↓</i>
                  </span>
                </template>
              </div>
            </th>
          </tr>
        </thead>
      </table>
    </div>
    <div class="xr-table__body" ref="tableBody">
      <table>
        <colgroup>
          <col v-for="(col, index) in columns" :key="index" :width="col.width || ''">
        </colgroup>
        <tbody>
          <template v-for="(row, index) in data">
            <tr :key="row.id">
              <td v-for="col in columns" :key="col.key">
                <div>
                  <template v-if="col.slot">
                    <slot :name="col.slot" :row="row" :col="col" :index="index"></slot>
                  </template>
                  <template v-else-if="col.type === 'selection'">
                    <input
                      type="checkbox"
                      :checked="formateStatus(row)"
                      @change="toggleSelect($event, row)"
                    >
                  </template>
                  <template v-else-if="col.type === 'expand'">
                    <span @click="toggleExpand(row.id)">></span>
                  </template>
                  <template v-else>
                    <span>{{row[col.key]}}</span>
                  </template>
                </div>
              </td>
            </tr>
            <tr :key="`expand-${row.id}`" v-if="checkIsExpand(row.id)">
              <td :colspan="columns.length">{{row.desc}}</td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'XrTable',
  props: {
    columns: {
      type: Array,
      default: () => []
    },
    data: {
      type: Array,
      default: () => []
    },
    height: {
      type: [String, Number],
      default: -1
    }
  },
  data() {
    return {
      selectedRows: [],
      expandIds: []
    };
  },
  created() {
    window.vm = this;
  },
  mounted() {
    let { tableHeader, tableBody } = this.$refs;
    let headerH = parseInt(window.getComputedStyle(tableHeader).height);
    let bodyH = this.height - headerH;
    tableBody.style.height = `${bodyH}px`;
  },
  computed: {
    tableStyle() {
      return this.height ? `height: ${this.height}px` : '';
    },
    isSelectAll() {
      let all = this.data.map(item => item.id).sort();
      let selected = this.selectedRows.map(item => item.id).sort();
      let isSelectAll = true;
      if (all.length === selected.length) {
        for (let i = 0, len = all.length; i < len; i++) {
          if (all[i] !== selected[i]) {
            isSelectAll = false;
            break;
          }
        }
      } else {
        isSelectAll = false;
      }
      this.$nextTick(() => {
        this.$refs['allCheckbox'][0].indeterminate =
          selected.length && !isSelectAll;
      });
      return isSelectAll;
    }
  },
  methods: {
    selectAll(e) {
      let checked = e.target.checked;
      this.selectedRows = checked ? JSON.parse(JSON.stringify(this.data)) : [];
      this.$emit('on-selection-change', this.selectedRows);
    },
    toggleSelect(e, row) {
      let checked = e.target.checked;
      if (checked) {
        this.selectedRows.push(row);
      } else {
        let idx = this.selectedRows.findIndex(item => item.id === row.id);
        this.selectedRows.splice(idx, 1);
      }
      this.$emit(
        'on-selection-change',
        JSON.parse(JSON.stringify(this.selectedRows))
      );
    },
    formateStatus(row) {
      return this.selectedRows.findIndex(item => item.id === row.id) >= 0;
    },
    handleSort(key, sortType) {
      this.$emit('on-sort', { key, sortType });
    },
    toggleExpand(id) {
      let idx = this.expandIds.indexOf(id);
      if (idx >= 0) {
        this.expandIds.splice(idx, 1);
      } else {
        this.expandIds.push(id);
      }
    },
    checkIsExpand(id) {
      return this.expandIds.indexOf(id) >= 0;
    }
  }
};
</script>

<style lang="scss">
.xr-table {
  overflow: hidden;
  table {
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
    empty-cells: show;
    border: 1px solid #e9e9e9;
  }
  table th {
    background: #f7f7f7;
    color: #5c6b77;
    font-weight: 600;
    white-space: nowrap;
  }
  table td,
  table th {
    padding: 8px 16px;
    border: 1px solid #e9e9e9;
    text-align: left;
  }
  &__body {
    overflow: auto;
  }
}
</style>