import { useEffect } from "react";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { transform } from "ol/proj";
let map: Map | null = null;
function MapView() {
  useEffect(() => {
    const view = new View({
      center: transform([104, 30], "EPSG:4326", "EPSG:3857"),
      zoom: 10,
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
    const singleClickListener = (
      event: import("ol/MapBrowserEvent").default
    ) => {
      // 通过getEventCoordinate方法获取地理位置，再转换为wgs84坐标，并弹出对话框显示
      const coordinate = event.coordinate;
      if (coordinate) {
        alert(transform(coordinate, "EPSG:3857", "EPSG:4326").toString());
      } else {
        console.error("Failed to get coordinate from the event.");
      }
      map?.un("singleclick", singleClickListener); // 移除事件监听器
    };
    map.on("singleclick", singleClickListener);
    // 地图鼠标左键单击事件 singleclick
    // 地图鼠标左键双击事件 dblclick
    // 地图鼠标点击事件 click
    // 地图鼠标移动事件 pointermove
    // 地图鼠标拖拽事件 pointerdrag
    // 地图移动事件 moveend
    // 使用once函数，只会响应一次事件，之后自动注销事件监听
    // map.once("singleclick", singleClickListener);
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
