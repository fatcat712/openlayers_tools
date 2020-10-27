<template>
  <div class="base-map">
    <div id="map">
      <div id="zoom"></div>
    </div>
  </div>
</template>

<script>
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import XYZ from "ol/source/XYZ";
import Zoom from "ol/control/Zoom";
export default {
  name: "basemap",
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
          source: new XYZ({
            url:
              "http://t4.tianditu.com/DataServer?T=vec_w&tk=bc8607a5baffec68112b0923e618d1a0&x={x}&y={y}&l={z}",
          }),
        }),
        textlayer = new TileLayer({
          source: new XYZ({
            url:
              "http://t3.tianditu.com/DataServer?T=cva_w&tk=bc8607a5baffec68112b0923e618d1a0&x={x}&y={y}&l={z}",
          }),
        });
      const map = new Map({
        target: "map",
        layers: [baselayer, textlayer],
        view: new View({
          projection: "EPSG:4326",
          center: [117.22942, 31.79942],
          zoom: 12,
        }),
        controls: [
          new Zoom({
            target: "zoom",
          }),
        ],
      });
    },
  },
};
</script>

<style scoped lang="less">
.base-map {
  width: 100%;
  height: 100%;
  #map {
    width: 100%;
    height: 100%;
    #zoom {
      position: absolute;
      right: 20px;
      bottom: 20px;
      width: 60px;
      height: 60px;
      z-index: 99;
    }
  }
}
</style>