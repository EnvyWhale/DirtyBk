<template>
  <div>
    <van-nav-bar title="分类" />
    <van-tree-select
      height="93vh"
      :items="gardList"
      :main-active-index.sync="index"
    >
      <template #content>
        <ClassContentComVue :index="index + 1"></ClassContentComVue>
      </template>
    </van-tree-select>
  </div>
</template>

<script>
import ClassContentComVue from "@/components/classify/ClassContentCom.vue";
export default {
  components: {
    ClassContentComVue,
  },
  data() {
    return {
      index: this.$store.state.tag,
      gardList: this.$store.state.gardList,
    };
  },
  async created() {
    this.gardList = this.gardList.map((item) => {
      let obj = {};
      obj.id = item.id;
      obj.text = item.content;
      return obj;
    });
  },
};
</script>
<style lang="scss" scoped>
.van-nav-bar {
  border-bottom: 1px solid rgb(205, 205, 205);
}
::v-deep .van-sidebar-item {
  width: 25vw;
}
.van-tree-select__content {
  flex: 4;
}
</style>
