<template>
  <div class="base-map">
    <!-- 地图容器 -->
    <div id="map"></div>
  </div>
</template>

<script>
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";
import {
  Zoom,
  ScaleLine,
  OverviewMap,
  defaults as defaultControls,
} from "ol/control";

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
        });

      let zoom = new Zoom({
          className: "custom-zoom",
        }),
        scaleline = new ScaleLine({
          className: "custom-scale-line",
          bar: true,
        }),
        overview = new OverviewMap({
          className: "ol-overviewmap ol-custom-overviewmap",
          collapseLabel: "\u00BB",
          label: "\u00AB",
          collapsed: false,
          layers: [
            new TileLayer({
              id: "baseLayer",
              title: "电子底图",
              layerName: "baseLayer",
              source: new XYZ({
                url:
                  "http://t4.tianditu.com/DataServer?T=vec_w&tk=bc8607a5baffec68112b0923e618d1a0&x={x}&y={y}&l={z}",
              }),
            }),
          ],
        });

      const map = new Map({
        target: "map",
        layers: [baselayer, textlayer],
        view: new View({
          projection: "EPSG:4326",
          center: [117.22942, 31.79942],
          zoom: 12,
        }),
        controls: defaultControls().extend([zoom, scaleline, overview]),
      });
    },
  },
};
</script>

<style scoped lang="less">
.base-map {
  width: 100%;
  height: 100%;
  position: relative;
  #map {
    width: 100%;
    height: 100%;
  }
  /deep/ .custom-zoom {
    position: absolute;
    right: 20px;
    bottom: 20px;
    z-index: 99;
  }
  /deep/ .custom-scale-line {
    position: absolute;
    left: 20px;
    bottom: 16px;
    z-index: 99;
  }
  /deep/ .ol-overviewmap {
    top: auto;
    left: auto;
    bottom: auto;
  }
  /deep/ .ol-custom-overviewmap {
    position: absolute;
    top: 20px;
    right: 20px;
    z-index: 99;
  }
}
</style>