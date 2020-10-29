<template>
  <div class="empty-page">
    <img src="@/assets/img/empty-icon.png" alt />
    <p class="tip">开发中，敬请期待...</p>
  </div>
</template>

<script>
export default {
  name: "empty",
};
</script>

<style scoped lang="less">
.empty-page {
  padding-top: 160px;
  color: #696969;
  font-size: 18px;
  img {
    width: 200px;
  }
}
</style>