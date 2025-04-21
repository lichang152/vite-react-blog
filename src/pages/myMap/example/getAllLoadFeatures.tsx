import { useEffect, useState } from "react";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import Vector from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import GeoJSON from "ol/format/GeoJSON";
let map: Map | null = null;
function MapView() {
  const [count, setCount] = useState<number>(0);
  useEffect(() => {
    const view = new View({
      center: [-72.980624870461128, 48.161307640513321],
      zoom: 8,
      projection: "EPSG:4326",
    });
    const vectorLayer = new Vector({
      source: new VectorSource({
        url: "json/line-samples.geojson", // 地图来源
        format: new GeoJSON(), // 数据格式
      }),
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
    const listenerKey = vectorLayer.getSource()?.on("change", () => {
      if (vectorLayer.getSource()?.getState() === "ready") {
        setCount(vectorLayer.getSource()?.getFeatures()?.length ?? 0); // 获取Feature总数
        console.log(listenerKey);
        // vectorLayer.getSource()?.un("change" as "change", listenerKey); // 注销监听器
      }
    });
    map.addLayer(vectorLayer);
    return () => {
      map?.setTarget(undefined);
    };
  }, []);

  return (
    <>
      <div>矢量地图Feature总数： {count}</div>
      <div id="map" style={{ width: "100%", height: "400px" }}></div>
    </>
  );
}

export default MapView;
