import { useEffect, useState } from "react";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { transform } from "ol/proj";
import { easeIn, easeOut, inAndOut, linear, upAndDown } from "ol/easing";
import Vector from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Feature } from "ol";
import { Point } from "ol/geom";
import { Style, Circle, Stroke } from "ol/style";
const sin = (t: number) => {
  // 使用sin曲线公式
  return Math.sin((t * Math.PI) / 2);
};
const easingList = [
  { label: "缓入（起始缓慢然后加速）", value: easeIn },
  { label: "先快后慢", value: easeOut },
  { label: "先慢后快再慢", value: inAndOut },
  { label: "线性", value: linear },
  { label: "先慢后快再慢", value: upAndDown },
  { label: "sin曲线公式", value: sin },
];
let map: Map | null = null;
function MapView() {
  const [index, setIndex] = useState<number>(0);
  useEffect(() => {
    const view = new View({
      center: transform([104, 30], "EPSG:4326", "EPSG:3857"),
      zoom: 10,
    });
    const osmLayer = new TileLayer({
      source: new OSM(),
    });
    const layer = new Vector({
      source: new VectorSource({}),
      style: new Style({
        image: new Circle({
          radius: 0,
          stroke: new Stroke({ color: "red", width: 2 }),
        }),
      }),
    });
    map = new Map({
      target: "map",
      layers: [osmLayer, layer],
      view,
    });
    const circle = new Feature({
      geometry: new Point(transform([104, 30], "EPSG:4326", "EPSG:3857")),
    });
    layer.getSource()?.addFeature(circle);
    // 关键的地方在此：监听postcompose事件，在里面重新设置circle的样式
    let radius = 0;
    map.on("postcompose", () => {
      radius++;
      radius = radius % 40;
      circle.setStyle(
        new Style({
          image: new Circle({
            radius: radius,
            stroke: new Stroke({ color: "red", width: 2 }),
          }),
        })
      );
    });
    return () => {
      map?.setTarget(undefined);
    };
  }, []);
  const backNoAnim = () => {
    map?.getView().setCenter(transform([104, 30], "EPSG:4326", "EPSG:3857"));
  };
  const backWithAnim = () => {
    map?.getView().animate({
      center: transform([104, 30], "EPSG:4326", "EPSG:3857"),
      duration: 1500,
      zoom: 12,
      //   rotation: 120,
      easing: easingList[index].value,
    });
  };
  return (
    <>
      <select onChange={(e) => setIndex(Number(e.target.value))}>
        {easingList.map((item, index) => (
          <option key={index} value={index}>
            {item.label}
          </option>
        ))}
      </select>
      <button onClick={backNoAnim}>回到原点-不带动画</button>
      <button onClick={backWithAnim}>回到原点-带动画</button>
      <div id="map" style={{ width: "100%", height: "400px" }}></div>
    </>
  );
}

export default MapView;
