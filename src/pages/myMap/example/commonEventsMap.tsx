import { useEffect, useState } from "react";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { transform } from "ol/proj";
let map: Map | null = null;
function MapView() {
  const [title, setTitle] = useState("");
  const [mapZoom, setMapZoom] = useState("10");
  const [centerPoint, setCenterPoint] = useState("");
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
    // 尽量不直接操作html标签
    // const infoDom = document.getElementById("info");
    // 响应单击事件
    map.on("singleclick", function () {
      setTitle("singleclick");
      //   if (infoDom) {
      //     infoDom.innerHTML = "触发了ol.Map的单击事件：singleclick";
      //   }
    });

    // 响应双击事件
    map.on("dblclick", function () {
      setTitle("dblclick");
      //   if (infoDom) {
      //     infoDom.innerHTML = "触发了ol.Map的双击事件：dblclick";
      //   }
    });

    // 响应点击事件
    map.on("click", function () {
      setTitle("click");
      //   if (infoDom) {
      //     infoDom.innerHTML = "触发了ol.Map的点击事件：click";
      //   }
    });

    // // 响应鼠标移动事件，事件太频繁，故注释掉了，可自行验证该事件
    // map.on("pointermove", function () {
    // setTitle('pointermove')
    //   if (infoDom) {
    //     infoDom.innerHTML = "触发了ol.Map的鼠标移动事件：pointermove";
    //   }
    // });

    // 响应拖拽事件
    map.on("pointerdrag", function () {
      setTitle("pointerdrag");
      //   if (infoDom) {
      //     infoDom.innerHTML = "触发了ol.Map的拖拽事件：pointerdrag";
      //   }
    });

    // 地图移动事件
    map.on("moveend", function () {
      setTitle("moveend");
      //   if (infoDom) {
      //     infoDom.innerHTML = "触发了ol.Map的地图移动事件：moveend";
      //   }
    });
    // 地图缩放事件
    view.on("change:resolution", () => {
      setMapZoom(view.getZoom()?.toString() || "");
    });
    // 地图中心点事件
    view.on("change:center", () => {
      // console.log('中心点',view.getCenter())
      const center = view.getCenter();
      if (center && center[0] && center[1]) {
        setCenterPoint(center[0].toString() + " " + center[1].toString());
      }
      //   setMapZoom(view.getZoom()?.toString() || "");
    });

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
      <div id="info" style={{ backgroundColor: "#999" }}>
        触发事件提示信息{title}
      </div>
      <div style={{ backgroundColor: "#999" }}>触发地图缩放{mapZoom}</div>
      <div style={{ backgroundColor: "#999" }}>地图中心点{centerPoint}</div>

      <div id="map" style={{ width: "100%", height: "400px" }}></div>
    </>
  );
}

export default MapView;
