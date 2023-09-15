<template>
  <div class="this_root">
    <van-nav-bar
      :title="BookInfo.name"
      left-text="返回"
      left-arrow
      @click-left="GoBack"
    />
    <ContentCom :BookInfo="BookInfo"></ContentCom>
    <SkuCom
      :SkuInfo="SkuInfo"
      :BookInfo="BookInfo"
      v-if="this.SkuInfo"
    ></SkuCom>
    <FooterCom class="footercom"></FooterCom>
  </div>
</template>

<script>
import { NavBarMixin } from "@/utils/key_navbar";
import { GetDetail, GetDetailSku } from "@/utils/server/index";
import ContentCom from "@/components/detail/ContentCom.vue";
import FooterCom from "@/components/detail/FooterCom.vue";
import SkuCom from "@/components/detail/SkuCom.vue";
export default {
  components: {
    ContentCom,
    FooterCom,
    SkuCom,
  },
  mixins: [NavBarMixin],
  data() {
    return {
      BookInfo: "",
      SkuInfo: "",
    };
  },
  async created() {
    let id = this.$route.params.id;
    let res = await GetDetail(id);
    this.BookInfo = res.data;
    let SkuInfo = await GetDetailSku({
      bookid: id,
    });
    this.SkuInfo = SkuInfo.data;
  },
  methods: {
    GoBack() {
      this.$router.back();
    },
  },
};
</script>

<style lang="scss" scoped></style>
