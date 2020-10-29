<template>
  <div class="roller-shutters">
    <div class="swipe">
      <el-slider v-model="percent" :marks="marks" @input="swiperChange"></el-slider>
      <br />
    </div>
    <!-- 地图容器 -->
    <div id="map"></div>
  </div>
</template>

<script>
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";

export default {
  data() {
    return {
      map: null,
      percent: 10,
      marks: {
        0: {
          style: {
            color: "#1989FA",
          },
          label: this.$createElement("strong", "0"),
        },
        25: {
          style: {
            color: "#1989FA",
          },
          label: this.$createElement("strong", "25"),
        },
        50: {
          style: {
            color: "#1989FA",
          },
          label: this.$createElement("strong", "50"),
        },
        75: {
          style: {
            color: "#1989FA",
          },
          label: this.$createElement("strong", "75"),
        },
        100: {
          style: {
            color: "#1989FA",
          },
          label: this.$createElement("strong", "100"),
        },
      },
    };
  },
  mounted() {
    this.initMap();
  },
  methods: {
    swiperChange(val) {
      this.percent = val;
      this.map.render();
    },
    initMap() {
      let baselayer = new TileLayer({
          id: "baseLayer",
          title: "电子底图",
          layerName: "baseLayer",
          source: new XYZ({
            url:
              "http://t4.tianditu.com/DataServer?T=vec_w&tk=bc8607a5baffec68112b0923e618d1a0&x={x}&y={y}&l={z}",
          }),
        }),
        textlayer = new TileLayer({
          id: "markLayer",
          title: "标注层",
          layerName: "markLayer",
          source: new XYZ({
            url:
              "http://t3.tianditu.com/DataServer?T=cva_w&tk=bc8607a5baffec68112b0923e618d1a0&x={x}&y={y}&l={z}",
          }),
        }),
        satellite = new TileLayer({
          id: "satellite",
          title: "卫星图",
          layerName: "satellite",
          source: new XYZ({
            url:
              "http://t3.tianditu.com/DataServer?T=img_w&tk=bc8607a5baffec68112b0923e618d1a0&x={x}&y={y}&l={z}",
          }),
        });

      this.map = new Map({
        target: "map",
        layers: [baselayer, textlayer, satellite],
        view: new View({
          projection: "EPSG:4326",
          center: [117.22942, 31.79942],
          zoom: 12,
        }),
        controls: [],
      });

      satellite.on("prerender", (e) => {
        var ctx = e.context;
        var width = ctx.canvas.width * (this.percent / 100);
        ctx.save();
        ctx.beginPath();
        ctx.rect(width, 0, ctx.canvas.width - width, ctx.canvas.height);
        ctx.clip(); //裁剪
      });
      //请求完成，渲染
      satellite.on("postrender", (e) => {
        var ctx = e.context;
        ctx.restore();
      });
    },
  },
};
</script>

<style scoped lang="less">
.roller-shutters {
  width: 100%;
  height: 100%;
  position: relative;
  #map {
    width: 100%;
    height: 100%;
  }
  .swipe {
    position: absolute;
    top: 40px;
    left: 20px;
    width: 240px;
    height: 40px;
    z-index: 99;
  }
}
</style>