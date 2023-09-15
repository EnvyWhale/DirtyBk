<template>
  <div>
    <div class="msgbox">
      <div class="imgbox"><img :src="BookInfo.image_url" alt="" /></div>
      <van-divider content-position="left" :hairline="false"
        >商品名称</van-divider
      >
      <div class="name">{{ BookInfo.name }}</div>
      <van-divider content-position="left" :hairline="false"
        >基础信息</van-divider
      >
      <div class="content">
        <div>
          <span>所属类别</span>
          <van-tag color="#7232dd" plain>{{ BookInfo.typename }}</van-tag>
        </div>
        <div>
          <span>剩余库存</span>
          <span>{{ BookInfo.comments_count }}</span>
        </div>
        <div>
          <span>发售价</span>
          <span class="priceold">{{
            BookInfo.original_price ? BookInfo.original_price : "未知发售价格"
          }}</span>
        </div>
        <div>
          <span>现价</span>
          <span class="pricenow">{{ BookInfo.price }}</span>
        </div>
      </div>
      <van-divider :hairline="false" content-position="left">描述</van-divider>
      <div class="dec">{{ BookInfo.subname }}</div>
    </div>
  </div>
</template>

<script>
export default {
  // 接收父组件的BookInfo信息，渲染组件
  props: ["BookInfo"],
};
</script>

<style lang="scss" scoped>
.msgbox {
  // padding: 15px;
  font-size: 14px;
  text-indent: 28px;

  .imgbox {
    img {
      width: 200px;
    }
  }
  .name {
    padding: 15px;
  }
  .content {
    text-indent: 0;
    padding: 15px;
    display: flex;
    justify-content: space-around;
    div {
      width: 90px;
      text-align: center;
      span {
        display: inline-block;
        width: 100%;
        text-align: center;
      }
    }
    .priceold {
      text-decoration: line-through;
    }
    .pricenow {
      color: orange;
    }
  }
  .dec {
    padding: 15px;
    background-color: rgb(232, 232, 232);
  }
  .van-divider {
    margin: 6px 0;
  }
}
</style>
