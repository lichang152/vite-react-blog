import { useEffect } from "react";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import Vector from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import GeoJSON from "ol/format/GeoJSON";
import { Style } from "ol/style";
import { Stroke } from "ol/style";
let map: Map | null = null;
function MapView() {
  useEffect(() => {
    const view = new View({
      center: [-72.980624870461128, 48.161307640513321],
      zoom: 8,
      projection: "EPSG:4326",
    });
    map = new Map({
      target: "map",
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        new Vector({
          // 设置样式，颜色为红色，线条粗细为1个像素
          style: new Style({
            stroke: new Stroke({
              color: "red",
              width: 1,
            }),
          }),
          source: new VectorSource({
            url: "json/line-samples.geojson", // 地图来源
            format: new GeoJSON(), // 数据格式
          }),
        }),
      ],
      view,
    });

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
