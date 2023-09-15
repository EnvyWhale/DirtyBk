<template>
  <div class="my-page">
    <div class="header">
      <div class="avatar">
        <img :src="isLogin ? userinfo.user_img : ''" alt="avatar" />
      </div>
      <div class="info" @click="login">
        <div class="name">{{ isLogin ? userinfo.username : "请登陆" }}</div>
        <div class="level">普通会员</div>
      </div>
    </div>
    <div class="menu">
      <div class="item" @click="handleClick('myOrder')">
        <div class="icon">
          <van-icon name="todo-list-o" />
        </div>
        <div class="text">我的订单</div>
      </div>
      <div class="item" @click="handleClick('myCoupon')">
        <div class="icon">
          <van-icon name="balance-pay" />
        </div>
        <div class="text">我的优惠券</div>
      </div>
      <div class="item" @click="handleClick('myCollect')">
        <div class="icon">
          <van-icon name="star-o" />
        </div>
        <div class="text">我的收藏</div>
      </div>
      <div class="item" @click="handleClick('myInfo')">
        <div class="icon">
          <van-icon name="user-o" />
        </div>
        <div class="text">个人资料</div>
      </div>
      <div class="item" @click="handleClick('contactUs')">
        <div class="icon">
          <van-icon name="chat-o" />
        </div>
        <div class="text">联系客服</div>
      </div>
      <div class="item" @click="handleClick('logout')">
        <div class="icon">
          <van-icon name="revoke" />
        </div>
        <div class="text">退出登录</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(["isLogin", "userinfo"]),
  },

  methods: {
    login() {
      if (!sessionStorage.getItem("userinfo")) {
        this.$router.push("/login");
      }
    },
    ...mapMutations(["ClearAll"]),
    ...mapMutations("ShoppingCarStore", ["ClearAll_Shop"]),
    ...mapMutations("AddressStore", ["ClearAll_Address"]),
    handleClick(type) {
      // 处理点击事件
      console.log("点击了", type);
      if (type == "logout") {
        // 退出登陆，清空所有用户缓存信息
        this.ClearAll();
        this.ClearAll_Shop();
        this.ClearAll_Address();
        sessionStorage.clear();
      }
    },
  },
  created() {},
};
</script>

<style scoped>
.my-page {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #f2f2f2;
}

.header {
  display: flex;
  align-items: center;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.avatar {
  width: 60px;
  height: 60px;
  margin-right: 20px;
  border-radius: 50%;
  overflow: hidden;
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.info .name {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
}

.info .level {
  font-size: 14px;
  color: #999;
}

.menu {
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  background-color: #fff;
}

.menu .item {
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #f2f2f2;
}

.menu .item:last-child {
  border-bottom: none;
}

.menu .item .icon {
  width: 30px;
  height: 30px;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}

.menu .item .text {
  font-size: 16px;
}
</style>
