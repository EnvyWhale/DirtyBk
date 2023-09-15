<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" />
    </keep-alive>
    <!-- 不需要缓存的视图组件 -->
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <NavBar class="navbar" v-if="$store.state.NavBarState"></NavBar>
  </div>
</template>
<script>
import { mapActions, mapMutations } from "vuex";
import NavBar from "./components/NavBar";
export default {
  components: { NavBar },
  data() {
    return {};
  },
  methods: {
    ...mapActions(["GetGardList_va"]),
    ...mapActions("ShoppingCarStore", ["GetUserCarList_va"]),
    ...mapMutations(["GetUserInfo_vm"]),
  },
  created() {
    // 获取分类数据，并存放在vuex中
    this.GetGardList_va();
    // 判读用户登陆状态
    if (sessionStorage.getItem("userinfo")) {
      // 用户已经登陆，直接从本地获取用户信息和请求用户购物车信息存放vuex
      this.GetUserInfo_vm();
      this.GetUserCarList_va();
    }
  },
  watch: {
    $route() {
      document.title = "DirtyBK_" + this.$route?.meta?.title;
    },
  },
};
</script>
<style lang="scss">
.navbar{
position: fixed;
bottom: 0px;
}</style>
