<template>
  <div>
    <van-nav-bar title="订单" left-text="返回" left-arrow @click-left="Jump" />
    <div class="address">
      <div>地址选择：</div>
      <van-button
        class="choseaddress"
        color="#7232dd"
        plain
        @click="goaddress"
        >{{ SelectAddress.name ? "选择其他地址" : "添加地址" }}</van-button
      >
      <!-- 当前选择地的址 -->
      <div v-if="SelectAddress.name">
        <van-contact-card
          type="edit"
          :name="SelectAddress.name"
          :tel="SelectAddress.tel"
        />
        <div>
          详细地址：{{
            SelectAddress.province +
            SelectAddress.city +
            SelectAddress.county +
            SelectAddress.addressDetail
          }}
        </div>
      </div>

      <div v-else>你还没有地址，请添加地址</div>
    </div>
    <br />
    <div>
      <div>你购买的图书：</div>
      <hr />
      <van-card
        v-for="item in payList"
        :num="item.buynum"
        :price="`${item.bookskuprice}.00`"
        :desc="item.dec"
        :title="item.goodsname"
        :thumb="item.buybookskuimg"
        :key="item.bookskuid"
      />
    </div>
    <van-submit-bar
      :price="totalPrice * 100"
      button-text="提交订单"
      @submit="onSubmit"
    />
    <van-popup v-model="payshow" position="bottom" :style="{ height: '30%' }">
      支付方式选择<van-button type="info">支付</van-button>
    </van-popup>
  </div>
</template>

<script>
import { NavBarMixin } from "@/utils/key_navbar";
import { mapActions, mapState } from "vuex";
export default {
  mixins: [NavBarMixin],
  data() {
    return {
      JumpTo: "/index",
      payshow: false,
    };
  },
  computed: {
    ...mapState(["payList"]),
    ...mapState("AddressStore",["SelectAddress"]),
    // ...mapGetters("AddressStore", ["SelectAddress"]),
    totalPrice() {
      return this.payList
        .map((item) => item.bookskuprice * item.buynum)
        .reduce((a, b) => a + b);
    },
  },
  methods: {
    ...mapActions("AddressStore", ["GetUserAddressList_va"]),

    goaddress() {
      this.$router.push("/addresslist");
    },
    Jump() {
      // 跳转页面之前获取用户购物车信息
      this.$router.push(this.JumpTo);
    },
    onSubmit() {
      this.payshow = true;
    },
  },
  created() {
    this.GetUserAddressList_va();
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (from.name == "shoppingcar") {
        vm.JumpTo = "/shoppingcar";
      }
    });
  },
};
</script>

<style lang="scss" scoped>
.choseaddress {
  width: 110px;
  height: 30px;
  font-size: 12px;
}
.address{
  font-size: 16px;
}
</style>
