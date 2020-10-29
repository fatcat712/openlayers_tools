<template>
  <div class="multi-layer">
    <el-button plain class="multilayer-icon" icon="el-icon-copy-document" @click="openLayerDrawer"></el-button>
    <!-- 地图容器 -->
    <div id="map"></div>

    <el-drawer
      custom-class="multilayer-drawer"
      :visible.sync="drawer"
      direction="rtl"
      :modal="true"
      :modal-append-to-body="false"
      size="20%"
      tabindex
    >
      <div slot="title">图层</div>
      <ul class="layer-group">
        <li
          :class="['layer-item',item.checked ? 'active':'']"
          v-for="(item,index) in sourceList"
          :key="item.id"
          @click="exchangeLayer(index,item)"
        >
          <img :src="item.img" :alt="item.title" />
          <p class="title">{{item.title}}</p>
        </li>
      </ul>
    </el-drawer>
  </div>
</template>

<script>
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import XYZ from "ol/source/XYZ";
export default {
  name: "basemap",
  data() {
    return {
      map: null,
      sourceList: [],
      layerList: [],
      drawer: false,
    };
  },
  created() {
    this.getLayerSource();
  },
  mounted() {
    this.initMap();
  },
  methods: {
    exchangeLayer(index, params) {
      this.sourceList[index].checked = !this.sourceList[index].checked;
      this.singleLayerInit(this.sourceList[index].checked, params);
    },
    openLayerDrawer() {
      this.drawer = !this.drawer;
    },
    getLayerSource() {
      //获取所有图层数据源
      this.$http.get(this.$api.sourcelist).then((res) => {
        this.sourceList = res.data;
        let baselayer = new TileLayer({
          id: this.sourceList[0].id,
          title: this.sourceList[0].title,
          layerName: this.sourceList[0].id,
          source: new XYZ({
            url: this.sourceList[0].source,
          }),
        });
      });
    },
    singleLayerInit(addFlag, params) {
      console.log(this.layerList);
      let layerIndex = this.layerInclude(params.id);
      if (!addFlag) {
        //移出图层
        this.map.removeLayer(this.layerList[layerIndex]);
      } else {
        //叠加图层，要判断图层是否创建好
        if (layerIndex > -1) {
          this.map.addLayer(this.layerList[layerIndex]);
        } else {
          let layer = new TileLayer({
            id: params.id,
            title: params.title,
            layerName: params.id,
            source: new XYZ({
              url: params.source,
            }),
          });
          this.layerList.push(layer);
          this.map.addLayer(this.layerList[this.layerList.length - 1]);
          console.log(this.layerList);
        }
      }
    },
    layerInclude(layerId) {
      return this.layerList.findIndex((v) => v.values_.id === layerId);
    },
    initMap() {
      this.map = new Map({
        target: "map",
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
        ],
        view: new View({
          projection: "EPSG:4326",
          center: [117.22942, 31.79942],
          zoom: 8,
        }),
        controls: [],
      });
    },
  },
};
</script>

<style scoped lang="less">
.multi-layer {
  width: 100%;
  height: 100%;
  position: relative;
  #map {
    width: 100%;
    height: 100%;
  }
  .multilayer-icon {
    position: absolute;
    right: 20px;
    top: 20px;
    z-index: 99;
  }
  /deep/ .multilayer-drawer {
    top: 56px !important;
    .el-drawer__header {
      margin-bottom: 20px;
    }
    .layer-group {
      border-top: 1px solid #b3b5b7;
      padding-top: 20px;
      display: flex;
      flex-flow: row wrap;
      padding: 20px;
      background: linear-gradient(to top, rgba(0, 0, 0, 0.4), white);
      .layer-item {
        margin: 0 20px 20px 0;
        width: 60px;
        font-size: 12px;
        color: #666;
        text-align: center;
        border: 2px solid #dfe3e6;
        border-radius: 3px;
        line-height: 20px;
        img {
          width: 60px;
          height: 60px;
        }
        &.active {
          border-color: #14b982;
        }
        &:nth-child(3n) {
          margin-right: 0;
        }
      }
    }
  }
}
</style>