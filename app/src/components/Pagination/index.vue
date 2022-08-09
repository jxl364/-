<template>
  <div class="pagination">
    <button :disabled='pageNo == 1' @click="$emit('getPageNo',pageNo - 1)">上一页</button>
    <button v-if="starNumAndEndNum.star>1" @click="$emit('getPageNo', 1)" :class='{active:pageNo==1}'>1</button>
    <button v-if="starNumAndEndNum.star>2">···</button>

    <button v-for="(page,index) in starNumAndEndNum.end" :key="index" v-if="page>=starNumAndEndNum.star" @click="$emit('getPageNo',page ) " :class='{active:pageNo==page}'>{{page}}</button>

    <button v-if="starNumAndEndNum.end < totalPage -1 ">···</button>
    <button v-if="starNumAndEndNum.end < totalPage" @click="$emit('getPageNo',totalPage)" :class='{active:pageNo==totalPage}'>{{ totalPage }}</button>
    <button :disabled='pageNo == totalPage' @click="$emit('getPageNo',pageNo + 1)">下一页</button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ["pageNo", "pageSize", "total", "continues"],
  computed: {
    totalPage() {
      return Math.ceil(this.total / this.pageSize);
    },
    starNumAndEndNum() {
      let star = 0,
        end = 0;
      if (this.continues > this.totalPage) {
        star = 1;
        end = this.totalPage;
      } else {
        if (this.pageNo < 3) {
          star = 1
          end = this.continues
        } else if (this.pageNo > this.totalPage - 2) {
          star = this.totalPage-this.continues+1;
          end = this.totalPage;
        } else {
          star = this.pageNo - parseInt(this.continues / 2);
          end = this.pageNo + parseInt(this.continues / 2);
        }
      }
      return {star,end}
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>
