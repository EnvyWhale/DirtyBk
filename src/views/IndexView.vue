<template>
  <div>
    <TopBar></TopBar>
    <ContentList></ContentList>
  </div>
</template>

<script>
import TopBar from "@/components/index/TopBar.vue";
import ContentList from "@/components/index/ContentList.vue";
export default {
  components: {
    TopBar,
    ContentList,
  },
};
</script>

<style lang="scss" scoped></style>
