import { useEffect } from "react";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { transform } from "ol/proj";
import Image from "ol/layer/Image";
import ImageStatic from "ol/source/ImageStatic";
import cehngdou from "../../../imges/cehngdou.png";
import flag_right from "../../../imges/flag_right.png";
import VectorLayer from "ol/layer/Vector";
import Vector from "ol/source/Vector";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import Style from "ol/style/Style";
import { Icon } from "ol/style";
let map: Map | null = null;
function MapView() {
  useEffect(() => {
    // 地图设置中心，设置到成都，在本地离线地图 offlineMapTiles刚好有一张zoom为4的成都瓦片
    const center = transform([104.06667, 30.66667], "EPSG:4326", "EPSG:3857");
    // 计算熊猫基地地图映射到地图上的范围，图片像素为 550*344，保持比例的情况下，把分辨率放大一些
    const extent = [
      center[0] - (550 * 1000) / 2,
      center[1] - (344 * 1000) / 2,
      center[0] + (550 * 1000) / 2,
      center[1] + (344 * 1000) / 2,
    ];

    const view = new View({
      center,
      zoom: 7,
    });

    map = new Map({
      target: "map",
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view,
    });

    // 加载熊猫基地静态地图层
    map.addLayer(
      new Image({
        source: new ImageStatic({
          url: cehngdou, // 熊猫基地地图
          imageExtent: extent, // 映射到地图的范围
        }),
      })
    );

    // 创建一个用于放置活动图标的layer
    const activityLayer = new VectorLayer({
      source: new Vector(),
    });
    // 创建一个活动图标需要的Feature，并设置位置
    const activity = new Feature({
      geometry: new Point([
        center[0] - (550 * 1000) / 2 + 390 * 1000,
        center[1] - (344 * 1000) / 2 + (344 - 145) * 1000,
      ]),
    });
    const iconStyle = new Icon({
      anchor: [0, 1],
      scale: 0.8,
      src: flag_right,
    });
    // 设置Feature的样式，使用小旗子图标
    activity.setStyle(
      new Style({
        image: iconStyle,
      })
    );
    activityLayer?.getSource()?.addFeature(activity);
    map.addLayer(activityLayer);
    return () => {
      map?.setTarget(undefined);
    };
  }, []);

  return (
    <>
      <div id="map" style={{ width: "100%", height: "400px" }}></div>
    </>
  );
}

export default MapView;
