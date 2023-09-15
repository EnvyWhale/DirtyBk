<template>
  <div>
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" dot />
      <van-goods-action-icon
        icon="cart-o"
        text="购物车"
        :badge="carnum"
        @click="gocar"
      />
      <van-goods-action-button
        type="warning"
        @click="AddCar"
        text="加入购物车"
      />
      <van-goods-action-button type="danger" text="立即购买" @click="Buythis" />
    </van-goods-action>
  </div>
</template>

<script>
import { Bus } from "@/utils/bus/bus";
export default {
  data() {
    return {};
  },
  computed: {
    carnum() {
      if (
        this.$store.state.isLogin &&
        this.$store.state.ShoppingCarStore.UserCarList.length == 0
      ) {
        return "";
      } else if (
        this.$store.state.isLogin &&
        this.$store.state.ShoppingCarStore.UserCarList.length != 0
      ) {
        return this.$store.state.ShoppingCarStore.UserCarList.length;
      } else {
        return "";
      }
    },
  },
  methods: {
    gocar() {
      this.$router.push("/shoppingcar");
    },
    AddCar() {
      //  展示商品版本信息提供用户选择购买(vant sku)
      Bus.$emit("ShowSkuCom", true);
    },
    Buythis() {
      Bus.$emit("ShowSkuCom", true);
    },
  },
};
</script>

<style lang="scss" scoped></style>
