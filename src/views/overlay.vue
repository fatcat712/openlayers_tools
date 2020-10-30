<template>
  <div class="overlay">
    <div class="process-wrap">
      <div class="process" :style="{width:percent+'%'}"></div>
    </div>
  </div>
</template> 
<script>
export default {
  data() {
    return {
      percent: 0,
    };
  },
  created() {},
  mounted() {
    let _this = this;
    (function () {
      var i = 0;
      (function run() {
        _this.percent = i;
        if (++i <= 100) {
          setTimeout(run, 10);
        }
      })();
    })();
  },
  methods: {},
};
</script>

<style scoped lang="less">
.overlay {
  position: relative;
  .process-wrap {
    position: absolute;
    z-index: 99;
    top: 0;
    left: 0;
    width: 100%;
    height: 3px;
    .process {
      background: #96d1e2;
      height: 100%;
    }
  }
}
</style>