<template>
  <div>
    <van-dropdown-menu>
      <van-dropdown-item v-model="sort1" :options="option1" />
      <van-dropdown-item v-model="sort2" :options="option2" />
      <van-dropdown-item v-model="order" :options="option3" />
    </van-dropdown-menu>
    <van-pull-refresh v-if="bookList" v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :immediate-check="false"
      >
        <van-cell
          @click="$router.push('/detail/id=' + item.id)"
          v-for="item in bookList"
          :key="item.id"
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
          <div class="publishdate">{{ item.publish_date }}</div>
        </van-cell>
      </van-list>
    </van-pull-refresh>
    <van-skeleton class="skeleton" title :row="6" v-if="!bookList" />
  </div>
</template>

<script>
import { GetBookList } from "@/utils/server/index";
export default {
  data() {
    return {
      sort: 0,
      //排序依赖1
      sort1: "",
      sort2: "",
      // 排序方式
      order: "asc",
      option1: [
        { text: "全部商品", value: "" },
        { text: "新款商品", value: "publish_date" },
        { text: "活动商品", value: "activestate" },
      ],
      option2: [
        { text: "默认排序", value: "" },
        { text: "价格排序", value: "price" },
        { text: "上架时间排序", value: "dat" },
      ],
      option3: [
        { text: "升序", value: "asc" },
        { text: "降序", value: "desc" },
      ],
      pag: 1,
      limit: 4, //每页显示的条数
      total: 10, //总数
      // 按值搜索
      SearchValue: "",
      bookList: [],
      loading: false,
      finished: false,
      refreshing: false,
    };
  },
  async created() {
    this.total = (await GetBookList({})).data.length;
    let params = {
      _page: this.pag,
      _limit: this.limit,
    };
    let res = await GetBookList(params);
    this.bookList = res.data;
    // console.log(res.data);
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
        _page: this.pag,
        _limit: this.limit,
        _sort: this.sort2,
        _order: this.order,
      };
      // 请求的比较数据,获取总数
      let params2 = {};
      // 依赖（活动）排序
      if (this.sort1 == "activestate") {
        // console.log(this.sort1);
        params2[`activestate`] = true;
        params[`activestate`] = true;
      }
      // 依赖（最新）排序
      if (this.sort1 == "publish_date") {
        // console.log(this.sort1);
        params2[`${this.sort1}_like`] = "2023";
        params[`${this.sort1}_like`] = "2023";
      }
      // 获取总条数
      let res2 = await GetBookList(params2);
      this.total = res2.data.length;

      // console.log(params);
      let res = await GetBookList(params);
      // console.log(res.data);
      this.bookList = [...this.bookList, ...res.data];
      if (this.bookList.length >= this.total) {
        this.finished = true;
      }
      this.loading = false;
    },
  },
  watch: {
    sort1() {
      // 清空列表数据
      this.finished = false;
      this.refreshing = false;
      this.bookList = [];
      this.pag = 1;
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.getbooklist();
    },
    sort2() {
      // 清空列表数据
      this.finished = false;
      this.refreshing = false;
      this.bookList = [];
      this.pag = 1;
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.getbooklist();
    },
    order() {
      // console.log(this.order);
      // 清空列表数据
      this.finished = false;
      this.refreshing = false;
      this.bookList = [];
      this.pag = 1;
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.getbooklist();
    },
  },
};
</script>

<style lang="scss" scoped>
.van-dropdown-menu {
  height: 50px;
  overflow: hidden;
  background-color: rgb(245, 245, 245);
}
::v-deep .van-dropdown-menu__bar {
  margin-top: 5px;
  height: 34px;
}
.skeleton {
  margin-top: 10px;
}
.van-pull-refresh {
  .van-cell {
    height: 120px;
  }
  margin-bottom: 100px;
}
.item {
  width: 95vw;
  margin: 0 auto;
  position: relative;
  border-bottom: 1px solid rgb(175, 175, 175);
  .imgbox {
    width: 100px;
    height: 140px;
    img {
      width: 100px;
    }
  }

  .titlebox {
    width: 220px;
    height: 50px;
    position: absolute;
    top: 10px;
    left: 110px;
    font-weight: 700;
    font-size: 12px;
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
    bottom: 0px;
    right: 0px;
    font-size: 12px;
    text-align: right;
  }
  .publishdate {
    text-align: right;
    position: absolute;
    width: 150px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    bottom: 20px;
    right: 0px;
    font-size: 12px;
  }
}
</style>
