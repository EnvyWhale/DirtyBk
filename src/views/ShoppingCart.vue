<template>
  <div>
    <van-nav-bar
      title="购物车列表"
      left-text="返回"
      left-arrow
      @click-left="Back"
    />
    <!-- 用户没有登陆 -->
    <div v-if="!this.$store.state.isLogin">
      <van-empty description="你还没有登陆喔，登陆才能显示购物车">
        <van-button round type="danger" @click="gologin" class="bottom-button"
          >Go Login</van-button
        >
      </van-empty>
    </div>
    <!-- 用户登陆了,但购物车为空 -->
    <div
      v-else-if="
        this.$store.state.isLogin &&
        this.$store.state.ShoppingCarStore.UserCarList.length == 0
      "
    >
      <van-empty description="你的购物车空空如也，赶快去选购吧！">
        <van-button round type="danger" class="custom-image" @click="goshopping"
          >Go Shopping</van-button
        >
      </van-empty>
    </div>
    <!-- 用户有购物车数据 -->
    <div v-else>
      <van-swipe-cell v-for="(item, index) in UserCarList" :key="index">
        <!-- 选择框 -->
        <input class="input_item" type="checkbox" v-model="item.checked" />

        <van-card
          :tag="item.activestate ? '活动商品' : ''"
          :price="`${item.bookskuprice}.00`"
          :desc="item.dec"
          :title="item.goodsname"
          :thumb="item.buybookskuimg"
          :origin-price="item.bookoldprice"
        >
          <template #tags>
            <van-tag plain type="danger">{{ item.typename }}</van-tag>
            <van-button
              class="btnadd"
              size="small "
              @click="UpdateNum(item, item.buynum + 1)"
              >+1</van-button
            >
            <input class="buynum" type="text" disabled v-model="item.buynum" />
            <van-button
              @click="UpdateNum(item, item.buynum - 1)"
              class="btndec"
              size="small "
              >-1</van-button
            >
          </template>
        </van-card>
        <template #right>
          <van-button
            square
            text="删除"
            type="danger"
            class="delete-button"
            @click="DeleteThis(item.id)"
          />
        </template>
      </van-swipe-cell>
      <van-submit-bar
        :price="TotalPrice * 100"
        button-text="提交订单"
        @submit="onSubmit"
        class="git"
      >
        <van-checkbox v-model="checkedAll" @click="ckAll">全选</van-checkbox>
      </van-submit-bar>
    </div>
  </div>
</template>

<script>
import { UpdateUserCar, DeleteUserCar } from "@/utils/server/shoppingcar";
import { mapMutations, mapState } from "vuex";
export default {
  data() {
    return {
      result: [],
      checkedAll: false,
    };
  },

  methods: {
    ...mapMutations("ShoppingCarStore", [
      "DeleteUserCar_vm",
      "UpdateCarNum_vm",
    ]),
    ...mapMutations(["ChangepayList"]),
    goshopping() {
      this.$router.push("/classify");
    },
    gologin() {
      this.$router.push("/login");
    },
    Back() {
      this.$router.back();
    },
    ckAll() {
      this.UserCarList.forEach((item) => {
        item.checked = this.checkedAll;
      });
    },
    async UpdateNum(item, buynum) {
      // 如果buynum目标值为0
      if (buynum == 0) {
        // 提示用户不能修改
        this.$toast({
          message: "不能减啦！",
          forbidClick: true,
          duration: 500,
        });
      } else {
        // 可以修改
        // 修改数据库中
        await UpdateUserCar(item.id, {
          buynum,
        });
        // 更新vuex中数据，因为UserCarList是通过MapStore获取，vuex修改，当前视图会同步更新
        this.UpdateCarNum_vm({ id: item.id, buynum });
      }
    },
    onSubmit() {
      if (this.UserCarList.some((item) => item.checked)) {
        let checkedList = this.UserCarList.filter((item) => item.checked);
        this.ChangepayList(checkedList);
        this.$router.push("/pay");
      } else {
        this.$toast.fail("请选择其中一件商品进行结算");
      }
    },
    async DeleteThis(id) {
      // 根据购物车id删除购物车数据
      // 调用删除接口，删后台数据
      await DeleteUserCar(id);
      this.$toast("删除成功");

      // 删除vuex数据，当前页面会同步更新
      this.DeleteUserCar_vm(id);
    },
    DeleteThisUserCar(id) {
      this.UserCarList = this.UserCarList.filter((item) => item.id != id);
    },
  },

  computed: {
    ...mapState("ShoppingCarStore", ["UserCarList"]),
    TotalPrice() {
      let checkedList = this.UserCarList.filter((item) => item.checked);
      return checkedList.length
        ? checkedList
            .map((item) => item.bookskuprice * item.buynum)
            .reduce((a, b) => a + b)
        : 0;
    },
  },
  watch: {
    UserCarList: {
      deep: true, //深度监听设置为 true
      handler: function () {
        if (this.UserCarList.every((item) => item.checked)) {
          this.checkedAll = true;
        } else {
          this.checkedAll = false;
        }
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.goods-card {
  margin: 0;
  background-color: white;
}

.delete-button {
  height: 100%;
}
.van-swipe-cell {
}
.input_item {
  position: relative;
  margin-left: 5px;
  bottom: 40px;
}
.van-card {
  display: inline-block;
  width: 93vw;
  height: 90px;
  // border: 1px solid black;
  padding: 0px;
  .van-card__num {
    font-size: 16px;
    position: absolute;
    bottom: 40px;
    right: 20px;
  }
  .van-button {
    width: 30px;
    height: 20px;
    position: absolute;
    border-radius: 5px;
    border: 1px solid rgb(51, 51, 51);
  }
  .btnadd {
    right: 66px;
    bottom: 10px;
  }
  .btndec {
    right: 10px;
    bottom: 10px;
  }
  .buynum {
    border: 0;
    width: 20px;
    text-align: center;
    font-size: 18px;
    position: absolute;
    right: 42px;
    bottom: 10px;
  }
  .van-card__desc {
    width: 150px;
  }
}
.git {
  margin-bottom: 50px;
}
</style>
