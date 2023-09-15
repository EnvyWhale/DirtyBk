<template>
  <div>
    <!-- 底部工具栏 -->
    <van-tabbar v-model="active" class="NavBar" active-color="black" route>
      <van-tabbar-item to="/index" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item to="/classify" icon="apps-o">分类</van-tabbar-item>
      <van-tabbar-item to="/shoppingcar" icon="shopping-cart-o"
        >购物车</van-tabbar-item
      >
      <van-tabbar-item to="/minecenter" icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: null,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.van-tabbar-item--active {
  background-color: rgb(216, 0, 0);
  border-radius: 10px;
}
.NavBar {
  background-color: rgb(243, 103, 103);
}
</style>
