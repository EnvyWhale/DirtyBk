<template>
  <div>
    <van-sku
      v-model="show"
      :sku="sku"
      :goods="goods"
      :goods-id="bookId"
      :quota="quota"
      :hide-stock="sku.hide_stock"
      @buy-clicked="BeforeBuy"
      @add-cart="BeforeAddCart"
    />
  </div>
</template>

<script>
import { Dialog } from "vant";
import { Bus } from "@/utils/bus/bus";
import {
  QueryUserCar,
  UpdateUserCar,
  AddUserCar,
} from "@/utils/server/shoppingcar";
import { mapActions } from "vuex";
export default {
  props: ["SkuInfo", "BookInfo"],
  data() {
    return {
      show: false,
      sku: {
        tree: [],
        // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
        list: [],
        price: "1.00", // 默认价格（单位元）
        stock_num: 227, // 商品总库存
        hide_stock: false, // 是否隐藏剩余库存
      },
      goods: {
        // 默认商品 sku 缩略图
        picture: "https://img01.yzcdn.cn/2.jpg",
      },
      quota: 0, //限购
      bookId: 1, //商品id
    };
  },
  methods: {
    ...mapActions("ShoppingCarStore", ["GetUserCarList_va"]),
    BeforeBuy() {
      if (!sessionStorage.getItem("userinfo")) {
        Dialog.confirm({
          title: "登陆提示",
          message: "登陆体验更多功能喔!!!",
          theme: "round-button",
          confirmButtonText: "现在去登陆",
          cancelButtonText: "我再逛逛",
        })
          .then(() => {
            // on confirm
            this.$router.push("/login");
          })
          .catch(() => {
            // on cancel
          });
      } else {
        console.log("Can Buy");
        // 跳转结算页面
        // 可以购买
      }
      console.log("Buy");
    },
    BeforeAddCart(info) {
      if (!sessionStorage.getItem("userinfo")) {
        Dialog.confirm({
          title: "登陆提示",
          message: "登陆才能购买喔!!!",
          theme: "round-button",
          confirmButtonText: "现在去登陆",
          cancelButtonText: "我再逛逛",
        })
          .then(() => {
            // on confirm
            this.$router.push("/login");
          })
          .catch(() => {
            // on cancel
          });
      } else {
        // 提示用户加入购物车
        this.AddCar(info);
      }
    },
    async AddCar(info) {
      // console.log(info);
      let res2 = await QueryUserCar({
        userid: this.$store.state.userinfo.userid,
        bookskuid: info.selectedSkuComb.id,
      });
      // console.log(res2);
      if (res2.data.length) {
        // 用户有该购物车数据(数量更新)
        let UpdateInfo = res2.data[0];
        let id = UpdateInfo.id; //需要更新的编号
        let BuyNum = UpdateInfo.buynum; //需要更新原数量
        await UpdateUserCar(id, {
          buynum: BuyNum + info.selectedNum,
        });
        this.TipAddCar();
      } else {
        // 用户没有购物车信息（新增）
        // console.log(info.selectedSkuComb.price);
        let addinfo = {
          userid: this.$store.state.userinfo.userid,
          bookid: info.goodsId,
          bookskuid: info.selectedSkuComb.id,
          goodsname: this.BookInfo.name,
          bookskuprice: (info.selectedSkuComb.price / 100).toString(),
          buynum: info.selectedNum,
          bookoldprice: this.BookInfo.original_price,
          activestate: this.BookInfo.activestate,
          typename: this.BookInfo.typename,
        };
        // 购物车对象图片
        addinfo["buybookskuimg"] = this.sku.tree[0].v.filter(
          (item) => item.id == info.selectedSkuComb["s1"]
        )[0].previewImgUrl;

        let str = "";
        //过滤目前选择的信息，获取规格对应描述信息，并添加到购物车对象
        let obj = this.SkuInfo.filter(
          (item) => item.bookskuid == info.selectedSkuComb.id
        )[0];
        // console.log(obj);
        let tag = this.SkuInfo[0].tag;
        for (const key in tag) {
          str += obj[`${key}`] + "-";
        }
        str = str.slice(0, -1);
        addinfo["dec"] = str;
        // console.log(addinfo);
        // 向后端添加购物车数据
        await AddUserCar(addinfo);
        // 更新vuex数据
        this.GetUserCarList_va();
        this.TipAddCar();
      }
    },
    TipAddCar() {
      // 提示用户操作
      Dialog.confirm({
        title: "购物车提示",
        message: "添加成功了!!!",
        theme: "round-button",
        confirmButtonText: "现在去结算",
        cancelButtonText: "我再逛逛",
      })
        .then(() => {
          // on confirm
          this.$router.push("/shoppingcar");
        })
        .catch(() => {
          // on cancel
        });
    },
    InitSku() {
      // 渲染sku数据
      // console.log(this.SkuInfo);

      // 获取标签名，组集合（每一个规格类目名称）
      let tag = this.SkuInfo[0].tag;

      //获取标签名对应的数据;
      let tree = [];
      let list = [];
      let id = 1;
      // 根据数据组合sku_tree
      for (const key in tag) {
        //获取规格类目名称，通过类目名去过滤该类目的可选信息
        let arr = [];
        this.SkuInfo.filter((item) => {
          let obj = {};
          obj.id = item[`${key}id`];
          obj.name = item[key];
          // 将图片存放到s1(第一个选择规格类目)中
          if (id == 1) {
            // console.log(item.imgUrl);
            obj.imgUrl = item.imgUrl;
            obj.previewImgUrl = item.previewImgUrl;
          }
          arr.push(obj);
        });

        // 对象数组去重
        let uniqueArr = arr.filter(
          (item, index) => arr.findIndex((i) => i.id === item.id) === index
        );
        // 通过规格类目名获取可选信息
        // console.log(tag[key], uniqueArr);

        // 向sku_tree下添加数据
        tree.push({
          k: tag[key],
          k_s: `s${id}`,
          v: uniqueArr,
        });
        id++;
      }
      this.sku.tree = tree;

      this.SkuInfo.forEach((item) => {
        let p = 1;
        let lbj = {};
        lbj["id"] = item.bookskuid; // skuId
        for (const ke in tag) {
          lbj[`s${p}`] = item[`${ke}id`];
          p++;
        }

        lbj["price"] = item.price * 100; // 价格（单位分）
        lbj["stock_num"] = item.stock_num; // 当前 sku 组合对应的库存
        list.push(lbj);
      });

      // 怎么确保tree中的k_s的值和list中的s值正确匹配
      // s1,s2,s3在tree和list中,可以正确配对，
      // 因为for每次对tag进行遍历，确保遍历顺序，第一个tag值为s1，第二个为s2以此类推
      this.sku.list = list;

      this.sku.price = this.SkuInfo[0].price; // 默认价格（单位元）

      this.sku.stock_num = this.SkuInfo.reduce((a, item) => {
        return a + item.stock_num * 1;
      }, 0); // 商品总库存

      this.goods = {
        // 默认商品 sku 缩略图
        picture: this.SkuInfo[0].imgUrl,
      };

      this.bookId = this.SkuInfo[0].bookid; //商品id
    },
  },
  created() {},
  mounted() {
    Bus.$on("ShowSkuCom", (f) => {
      this.show = f;
    });
    // 通过父组件传过来的SkuInfo信息渲染Sku组件
    this.InitSku();
  },
};
</script>

<style lang="scss" scoped></style>
