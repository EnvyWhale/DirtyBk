<template>
  <div>
    <div class="topsearch">
      <van-search v-model="value" placeholder="请输入搜索关键词" />
      <div class="mine" @click="login">
        <img v-if="isLogin" :src="userinfo.user_img" alt="" />
        <van-icon v-else name="user-o" />
      </div>
    </div>
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item>
        <img src="https://img62.ddimg.cn/2023/8/21/2023082110283025562.jpg" alt="" />
      </van-swipe-item>
      <van-swipe-item>
        <img src="https://img62.ddimg.cn/2023/8/29/2023082917575171435.jpg" alt="" srcset="" />
      </van-swipe-item>
      <van-swipe-item>
        <img src="https://img63.ddimg.cn/2023/8/17/2023081713340331773.jpg" alt="" />
      </van-swipe-item>
      <van-swipe-item>
        <img src="http://img61.ddimg.cn/upload_img/00316/by/1242X366--1662606203.jpg" alt="" />
      </van-swipe-item>
      <van-swipe-item>
        <img src="      https://img60.ddimg.cn/2023/8/21/2023082110144242128.jpg" alt="" />
      </van-swipe-item>
    </van-swipe>
    <van-swipe class="my-swipe2" :loop="false" :width="80" :height="80" :show-indicators="false">
      <van-swipe-item v-for="item in gardList" :key="item.id">
        <div class="grid-item" @click="JumpToClassify(item.id)">
          <div class="grid-item-img">
            <img :src="item.img" alt="" srcset="" />
          </div>
          {{ item.content }}
        </div>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      value: "",
      gardlist: [],
    };
  },
  computed: {
    ...mapState(["gardList", "isLogin", "userinfo"]),
  },
  methods: {
    ...mapMutations(["ChangeTag"]),
    login() {
      if (!sessionStorage.getItem("userinfo")) {
        this.$router.push("/login");
      }
    },
    JumpToClassify(id) {
      this.ChangeTag(id);
      this.$router.push("/classify");
    },
  },
};
</script>

<style lang="scss" scoped>
.my-swipe2 {
  width: 95vw;
  margin: 5px auto;
  height: 70px;

  ::v-deep .van-swipe-item {
    width: 70px;
    height: max-content;

    .grid-item {
      display: inline-block;
      text-align: center;
      font-size: 14px;

      .grid-item-img {
        overflow: hidden;
        height: 38px;

        img {
          width: 70px;
        }
      }
    }
  }

}

.topsearch {
  width: 100vw;
  display: flex;
  align-items: center;
  height: 55px;

  .van-search {
    flex: 8.7;
    display: inline-block;
    height: 100%;
  }

  .mine {
    flex: 1.3;
    height: max-content;
    display: inline-block;
    overflow: hidden;

    .van-icon {
      font-size: 20px;
    }

    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }
}

.my-swipe .van-swipe-item {
  width: 100vw;
  height: 150px;
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;

  img {
    width: 100%;
    height: 150px;
  }
}
</style>
