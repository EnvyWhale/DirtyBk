<template>
  <div class="Box">
    <h1>{{ title }}</h1>
    <div class="formbox">
      <LoginCom @Jump="Jump" v-show="isLogin"></LoginCom>
      <RegisterCom @Jump="Jump" v-show="!isLogin"></RegisterCom>
      <!-- 登陆与注册切换 -->
      <div class="Reg" @click="isLogin = !isLogin">{{ msg }}</div>
    </div>
    <div class="footer" @click="Jump">不登了，我要回去！</div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { NavBarMixin } from "@/utils/key_navbar";
import LoginCom from "@/components/login/LoginCom.vue";
import RegisterCom from "@/components/login/RegisterCom.vue";
export default {
  components: {
    LoginCom,
    RegisterCom,
  },
  mixins: [NavBarMixin], //混入
  data() {
    return {
      isLogin: true,
      msg: "注册",
      title: "Login",
      JumpTo: "",
    };
  },
  methods: {
    ...mapActions("ShoppingCarStore", ["GetUserCarList_va"]),
    Jump() {
      // 跳转页面之前获取用户购物车信息
      this.GetUserCarList_va();
      if (this.JumpTo == "/index") {
        this.$router.push("/index");
      } else {
        this.$router.back();
      }
    },
  },
  watch: {
    isLogin() {
      this.msg = this.isLogin ? "注册" : "登陆";
      this.title = this.isLogin ? "Login" : "Register";
    },
  },
  //  组件内路由守卫
  // 如果不是从详情页面跳转来的，目标路由为首页，否则为首页
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (from.name != "detail") {
        vm.JumpTo = "/index";
      }
    });
  },
};
</script>

<style lang="scss" scoped>
.Box {
  height: 100vh;
  background-image: url("../assets/IMG_8425.JPG");
  background-size: 100vw 100vh;
  overflow: hidden;

  .formbox {
    padding: 10px;
    margin: 0 auto;
    width: 90vw;
    border-radius: 10px;
    background-color: rgba($color: #000000, $alpha: 0.3);
  }

  ::v-deep .van-field {
    margin-bottom: 5px;
    // color: white;
    background-color: rgba($color: #000000, $alpha: 0);

    .van-field__label {
      // background-color: white;
      color: #000000;
    }
  }
}

h1 {
  text-align: center;
  margin-top: 60px;
}

.Reg {
  font-size: 16px;
  color: red;
  text-align: center;
  text-decoration: underline;
  margin-top: 10px;
}
.footer {
  width: 100vw;
  height: 40px;
  position: fixed;
  bottom: 0px;
  text-align: center;
  color: orangered;
  font-size: 18px;
  line-height: 40px;
  background-color: rgba($color: rgb(222, 222, 222), $alpha: 0.3);
}
</style>
