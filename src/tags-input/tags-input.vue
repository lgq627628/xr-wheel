<template>
  <div class="muli-tags" @click="handleClick">
    <span v-for="(tag, index) in tags" ref="tag" :key="`${index}-${tag}`" :data-tag-index="index" class="tag">
      <i class="label">{{ tag }}</i>
    </span>
    <input ref="input"
      v-model="current"
      type="text"
      class="input"
      :size="current.length || 1"
      @keyup.enter="add"
      @keydown.delete="del"
      @keydown.left="preToMoveLeft"
      @keydown.right="preToMoveRight"
      @blur="add"
      @click.stop
      @keydown.up="selectItem($event, 'before')"
      @keydown.down="selectItem($event, 'after')">
    <div class="tip" @mouseout="selectedItem = null">
      <div v-for="(item, i) in relativeTagOpts" :key="i" class="tip-item" :class="isSelected(i) ? 'tip-selected' : ''" @mouseover="selectedItem = i">
        <span class="tip-text">{{ item }}</span>
        <span v-if="isSelected(i)" class="enter">回车选中</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TagsInput',
  props: {
    value: {
      type: Array,
      require: true,
      default: () => [],
    },
    relativeOpts: {
      type: Array,
      default: () => ['110', '114', '119', '120'],
    },
  },
  data() {
    return {
      current: '',
      selectedItem: null,
      tags: []
    };
  },
  watch: {
    value: {
      deep: true,
      immediate: true,
      handler() {
        this.tags = this.value.slice();
      }
    }
  },
  computed: {
    relativeTagOpts() {
      const curInputVal = this.current.trim();
      if (!curInputVal) return [];
      return this.relativeOpts.filter(opt => opt.includes(curInputVal));
    },
  },
  methods: {
    focus() {
      this.$nextTick(() => {
        this.$refs.input.focus();
      });
    },
    handleClick(e) {
      e.preventDefault();
      const rs = this.calcLatestTag(e);
      const ele = rs && rs.ele;
      if (ele) { // 找到了就移动输入框，没有就聚焦即可
        const input = this.$refs.input;
        if (rs.isRight) { // 将输入框移到标签右边
          const nextEle = ele.nextSibling;
          nextEle.before(input);
        } else { // 将输入框移到标签左边
          ele.before(input);
        }
      }
      this.focus();
    },
    calcLatestTag(e) {
      if (this.tags.length <= 1) return;
      if (['INPUT', 'SPAN', 'I'].includes(e.target.tagName)) return;
      const { clientX, clientY } = e;
      const tagArr = this.$refs.tag;
      const inlineTagArr = []; // 把同一行的标签的放进来
      let ele;
      let isRight = true; // 如果找到，就把输入框移到这个标签的右边
      tagArr.forEach(tag => {
        const { top, left, height } = tag.getBoundingClientRect();
        if (top <= clientY && top + height >= clientY) {
          // 如果在同一行，如果超出高度了可以提前退出循环，这里就简单写
          inlineTagArr.push(tag);
          if (left <= clientX) ele = tag; // 找到点击事件左手边最近的一个标签
        }
      });
      if (!ele) {
        // 左手边没有找到最近的一个标签，说明点击的是最左边的空白处，于是我们尝试从 inlineTagArr 找到离点击事件左右手边最近的一个标签
        if (inlineTagArr.length) {
          ele = inlineTagArr[0]; // 其实可以不用遍历，因为一定是同一行的第一个元素
          isRight = false; // 如果找到，就把输入框移到这个标签的左边
        }
      }
      return {
        isRight,
        ele,
      };
    },
    add() {
      const trueVal = this.relativeTagOpts[this.selectedItem] || this.current;
      if (!trueVal) return;

      // 必须得先清空值，否则会触发失焦逻辑，造成其他错误
      this.selectedItem = null;
      this.current = '';

      const input = this.$refs.input;
      const preTag = input.previousElementSibling;
      const tagIndex = preTag ? +preTag.dataset.tagIndex : -1;

      if (preTag && tagIndex >= this.tags.length - 1) { // 如果 input 在最后面
        this.tags.push(trueVal);
      } else {
        this.tags.splice(tagIndex + 1, 0, trueVal); // 如果 input 在标签之间
        this.$nextTick(() => { // 添加完之后 tag 会在后面，所以需要将 input 和当前这个添加的这个 tag 交换位置
          this.moveRight();
        });
      }

      this.emitParent();
      this.focus();
    },
    del() {
      // 当文本框内没有值才删除
      if (this.current.length || !this.tags.length) return;
      const input = this.$refs.input;
      const preTag = input.previousElementSibling;
      if (preTag) {
        const tagIndex = +preTag.dataset.tagIndex;
        if (tagIndex >= this.tags.length - 1) { // 从末尾删除
          this.tags.pop();
        } else {
          this.tags.splice(tagIndex, 1);
          this.$nextTick(() => { // 如果从中间删除，input 的位置在删完之后需要左移一下
            this.moveLeft();
          });
        }
        this.emitParent();
      }
    },
    preToMoveLeft() {
      if (this.current.length) return;
      this.moveLeft();
    },
    moveLeft() {
      const input = this.$refs.input;
      const preTag = input.previousElementSibling;
      if (!preTag) return;
      preTag.before(input);
      this.focus();
    },
    moveRight() {
      const input = this.$refs.input;
      const nextTag = input.nextElementSibling;
      if (!nextTag) return;
      input.before(nextTag);
      this.focus();
    },
    preToMoveRight() {
      if (this.current.length) return;
      this.moveRight();
    },
    // 下面几个是下拉相关方法
    selectItem(e, method) {
      e.preventDefault();
      this.selectedItem = this.getSelectedIndex(method);
    },
    getSelectedIndex(method) {
      // 上下键高亮候选词
      const items = this.relativeTagOpts;
      const selectedItem = this.selectedItem;
      const lastItem = items.length - 1;
      if (items.length === 0) return null;
      if (selectedItem === null) return 0;
      if (method === 'before' && selectedItem === 0) return lastItem;
      else if (method === 'after' && selectedItem === lastItem) return 0;
      else return method === 'after' ? selectedItem + 1 : selectedItem - 1;
    },
    isSelected(index) {
      return this.selectedItem === index;
    },
    emitParent() {
      this.$emit('input', this.tags);
    },
  },
};
</script>

<style lang="scss" scoped>
.muli-tags {
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  position: relative;
  min-height: 100px;
  border: 1px solid #ccc;
}
.tag {
  display: flex;
  align-items: center;
  margin: 5px 8px;
  max-width: calc(100% - 16px);
  height: 32px;
  background: #f8f9fa;
  border: 1px solid #dadfe3;
  border-radius: 4px;
  .label {
    font-style: normal;
    padding: 0 6px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
.input {
  margin: 5px 8px;
  max-width: calc(100% - 16px);
  height: 32px;
  font-size: 16px;
  box-shadow: none;
  outline: none;
  background-color: transparent;
  border: none;
}
.tip {
  position: absolute;
  top: 102%;
  left: 0;
  right: 0;
  background: white;
  box-shadow: 0px 0px 10px rgba(29, 29, 46, 0.02), 0px 6px 10px rgba(29, 29, 46, 0.04);
  border-radius: 4px;
  .tip-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 12px;
    height: 34px;
    cursor: pointer;
    &.tip-selected {
      background: #edf2ff;
    }
  }
  .enter {
    font-size: 12px;
    color: #c6c6cc;
  }
  .tip-text {
    display: inline-flex;
    align-items: center;
    padding: 0 6px;
    height: 26px;
    background: #f8f9fa;
    border: 1px solid #dadfe3;
    border-radius: 4px;
  }
}
</style>
