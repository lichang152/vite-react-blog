import { useEffect } from "react";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { Feature } from "ol";
import { Point } from "ol/geom";
import VectorSource from "ol/source/Vector";
import Vector from "ol/layer/Vector";
import { Style, Icon, Fill, Circle, RegularShape } from "ol/style";
import anchorImg from "@public/imges/anchor.png";

let map: Map | null = null;
function MapView() {
  useEffect(() => {
    // 创建layer使用的style function，根据feature的自定义type，返回不同的样式
    const layerStyleFunction = function (feature: Feature) {
      const type = feature.get("type");
      let style = null;
      if (type === "point") {
        style = new Style({
          image: new Circle({
            radius: 3,
            fill: new Fill({ color: "red" }),
          }),
        });
      } else if (type === "circle") {
        style = new Style({
          image: new Circle({
            radius: 10,
            fill: new Fill({ color: "blue" }),
          }),
        });
      } else {
        // 其他形状
        style = new Style({
          image: new RegularShape({
            points: 5,
            radius: 10,
            fill: new Fill({ color: "green" }),
          }),
        });
      }
      // 返回 style 数组
      return [style];
    };
    const view = new View({
      projection: "EPSG:4326",
      center: [104, 30],
      zoom: 10,
    });
    const layer = new Vector({
      source: new VectorSource(),
    });
    const layer2 = new Vector({
      source: new VectorSource(),
      style: (e) => layerStyleFunction(e as Feature),
    });
    map = new Map({
      target: "map",
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        layer,
        layer2,
      ],
      view,
    });
    const anchor = new Feature({
      geometry: new Point([104, 30]),
    });
    // 应用style function，动态的获取样式
    const mapView = map?.getView();
    anchor.setStyle(function () {
      return [
        new Style({
          image: new Icon({
            src: anchorImg,
            scale: (mapView?.getZoom() ?? 0) / 10,
          }),
        }),
      ];
    });

    const source = layer?.getSource();
    if (source) {
      source.addFeature(anchor);
    }

    // 添加三个feature，并设置自定义属性 type
    const rect = new Feature({
      geometry: new Point([104.2, 30]),
    });
    layer2?.getSource()?.addFeature(rect);

    // 添加三个feature，并设置自定义属性 type
    const circle = new Feature({
      geometry: new Point([104.3, 30]),
    });
    circle.set("type", "circle");
    layer2?.getSource()?.addFeature(circle);

    const point = new Feature({
      geometry: new Point([104.4, 30]),
    });
    point.set("type", "point");
    layer2?.getSource()?.addFeature(point);
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
