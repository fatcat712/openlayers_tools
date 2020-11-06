<template>
  <div class="area-content">
    <div id="map"></div>
    <!-- 地点搜索 -->
    <div class="search-box">
      <p class="label">请输入关键词：</p>
      <input class="input-box" type="text" v-input-throttle="[getFilterData,1000]" />
      <ul class="results" v-if="potList.length>0">
        <li class="pot" v-for="(item,index) in potList" :key="index" @click="panTo(item)">
          <p class="name">{{item.name}}</p>
          <p class="desc">{{item.district}}{{item.address}}</p>
        </li>
      </ul>
    </div>
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
      potList: [],
      poiUrl:
        "https://restapi.amap.com/v3/assistant/inputtips?s=rsv3&key=b8561141f2ea4bac4352b578c0468e2c&platform=JS&logversion=2.0&sdkversion=1.4.15",
    };
  },
  mounted() {
    this.initMap();
  },
  methods: {
    panTo(param) {
      let location = param.location.split(",");
      this.map.setView(
        new View({
          projection: "EPSG:4326",
          center: [location[0], location[1]],
          zoom: 16,
        })
      );
    },
    getFilterData(e) {
      console.log(e.target.value);
      this.$http
        .get(this.poiUrl, {
          params: {
            keywords: e.target.value,
          },
        })
        .then((res) => {
          console.log(res);
          let {
            obj: {
              data: { tips: list },
            },
          } = res;
          this.potList = list;
          console.log(this.potList);
        });
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
        });

      this.map = new Map({
        target: "map",
        layers: [baselayer, textlayer],
        view: new View({
          projection: "EPSG:4326",
          center: [117.22942, 31.79942],
          zoom: 12,
        }),
        controls: [],
      });
    },
  },
};
</script>

<style scoped lang="less">
.area-content {
  width: 100%;
  height: 100%;
  position: relative;
  .search-box {
    width: 300px;
    background: #fff;
    border-radius: 5px;
    box-shadow: 0 0 5px rgb(175, 174, 174);
    position: absolute;
    top: 30px;
    right: 30px;
    z-index: 99;
    padding: 10px;
    box-sizing: border-box;
    display: flex;
    flex-flow: column;
    align-items: flex-start;
    .label {
      flex: none;
      height: 40px;
      line-height: 40px;
    }
    input {
      border-radius: 5px;
      width: calc(100% - 20px);
      height: 40px;
      border: 1px solid #eee;
      padding: 0 6px;
    }
  }
  #map {
    width: 100%;
    height: 100%;
  }
  .results {
    margin-top: 10px;
    max-height: 260px;
    overflow-y: auto;
    width: 100%;
    border-top: 1px solid #eee;
    font-size: 14px;
    text-align: left;
    &::-webkit-scrollbar {
      width: 3px;
    }
    &::-webkit-scrollbar-track {
      background: transparent;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 2px;
      background: #eee;
    }
    .pot {
      padding: 8px 6px;
      border-bottom: 1px solid #eee;
      &:last-child {
        border-bottom: none;
      }
      .desc {
        font-size: 12px;
        color: #999;
      }
    }
  }
}
</style>