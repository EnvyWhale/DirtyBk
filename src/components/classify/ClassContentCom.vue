<template>
  <div class="box">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-cell
          v-for="(item, index) in bookList"
          @click="$router.push('/detail/id=' + item.id)"
          :key="index"
          class="item"
        >
          <div class="imgbox">
            <img :src="item.image_url" alt="" />
          </div>
          <div class="titlebox">{{ item.name }}</div>
          <div class="pricebox">价格:{{ item.price }}</div>
          <div class="publisher">
            {{ item.publisher }}
          </div>
        </van-cell>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { GetBookList } from "@/utils/server";

export default {
  props: ["index"],
  data() {
    return {
      pag: 1,
      limit: 4, //每页显示的条数
      total: 10, //总数
      // 按值搜索
      SearchValue: "",
      bookList: [],
      loading: false,
      finished: false,
      refreshing: false,
      isGet: false,
    };
  },
  async created() {
    this.getbooklist();
  },
  methods: {
    onLoad() {
      this.pag++;
      this.getbooklist();
    },

    onRefresh() {
      // 清空列表数据
      this.finished = false;
      this.refreshing = false;
      this.bookList = [];
      this.pag = 1;
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.getbooklist();
    },
    async getbooklist() {
      // 请求的显示数据
      let params = {
        type: this.index,
        _page: this.pag,
        _limit: this.limit,
      };
      // 请求的比较数据,获取总数
      let params2 = {
        type: this.index,
      };
      // 获取总条数
      let res2 = await GetBookList(params2);
      this.total = res2.data.length;

      let res = await GetBookList(params);
      this.bookList = [...this.bookList, ...res.data];

      if (this.bookList.length >= this.total) {
        this.finished = true;
      }
      this.loading = false;
    },
  },
  watch: {
    index() {
      // console.log(this.order);
      // 清空列表数据
      this.pag = 1;
      this.finished = false;
      this.refreshing = false;
      this.bookList = [];
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.getbooklist();
    },
  },
};
</script>

<style lang="scss" scoped>
.box {
  margin-bottom: 70px;
}
.item {
  // width: ;
  margin: 0 auto;
  position: relative;
  height: 120px;
  border-bottom: 1px solid rgb(175, 175, 175);
  .imgbox {
    width: 80px;
    height: 120px;
    img {
      width: 100px;
    }
  }

  .titlebox {
    width: 145px;
    height: 50px;
    position: absolute;
    top: 10px;
    left: 110px;
    font-weight: 700;
    font-size: 10px;
    overflow: hidden;
    display: -webkit-box;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .pricebox {
    position: absolute;
    bottom: 10px;
    left: 120px;
    color: rgb(255, 49, 49);
  }
  .publisher {
    position: absolute;
    width: 150px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    bottom: 28px;
    right: 0px;
    font-size: 8px;
    text-align: right;
  }
}
</style>
