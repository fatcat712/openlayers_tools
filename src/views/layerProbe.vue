<template>
  <div class="layer-probe">
    <div id="map"></div>
  </div>
</template>

<script>
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import XYZ from "ol/source/XYZ";
import Zoom from "ol/control/Zoom";
import ScaleLine from "ol/control/ScaleLine";

export default {
  name: "layerprobe",
  data() {
    return {};
  },
  created() {},
  mounted() {
    this.initMap();
  },
  methods: {
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

      var map = new Map({
        target: "map",
        layers: [satellite, baselayer, textlayer],
        view: new View({
          projection: "EPSG:4326",
          center: [117.22942, 31.79942],
          zoom: 12,
        }),
        controls: [],
      });

      var radius = 75;
      var mousePosition = null;
      map.getViewport().onmousemove = function (evt) {
        mousePosition = map.getEventPixel(evt); //获得当前鼠标的位置
        map.render();
      };
      map.getViewport().onmouseout = function () {
        mousePosition = null;
        map.render();
      };
      baselayer.on("prerender", function (event) {
        console.log(event);
        var ctx = event.context; //影像图层画布
        var pixelRatio = event.frameState.pixelRatio; //像素比
        ctx.save();
        ctx.beginPath();
        if (mousePosition) {
          ctx.arc(
            mousePosition[0] * pixelRatio,
            mousePosition[1] * pixelRatio,
            radius * pixelRatio,
            0,
            2 * Math.PI
          ); //设置画布区为一个圆
          ctx.lineWidth = 5 * pixelRatio;
          ctx.strokeStyle = "rgba(0,0,0,0.5)";
          ctx.stroke();
        }
        ctx.clip(); //裁剪画布
      });
      baselayer.on("postrender", function (event) {
        var ctx = event.context;
        ctx.restore(); //还原画布
      });
    },
  },
};
</script>

<style scoped lang="less">
.layer-probe {
  width: 100%;
  height: 100%;
  #map {
    width: 100%;
    height: 100%;
    position: relative;
    #zoom {
      position: absolute;
      right: 20px;
      bottom: 20px;
      width: 40px;
      height: 60px;
      z-index: 99;
    }
    #scale-line {
      position: absolute;
      left: 20px;
      bottom: 16px;
      width: 40px;
      height: 30px;
      z-index: 99;
    }
  }
}
</style>