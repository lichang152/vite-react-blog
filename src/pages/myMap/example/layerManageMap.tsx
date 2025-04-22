import { useEffect } from "react";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import Vector from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Feature } from "ol";
import Point from "ol/geom/Point";
import { Style, Circle, Stroke, Fill } from "ol/style";
import { Checkbox, Radio } from "antd";
import type { CheckboxProps, RadioGroupProps } from "antd";

let map: Map | null = null;
// 创建3个图层
const osmLayer = new TileLayer({
  source: new OSM(),
  // 必须设置zIndex，否则会出现图层顺序不正确的问题,使用ZIndex也会获取underfound
  zIndex: 0, // 显式设置初始值
});
const pointLayer = new Vector({
  source: new VectorSource(),
  zIndex: 1, // 显式设置初始值
});
const circleLayer = new Vector({
  source: new VectorSource(),
  zIndex: 2, // 显式设置初始值
});
function MapView() {
  useEffect(() => {
    const view = new View({
      center: [0, 0],
      zoom: 2,
    });
    map = new Map({
      target: "map",
      layers: [osmLayer, pointLayer, circleLayer],
      view,
    });

    // 添加点
    const point = new Feature({
      geometry: new Point([0, 0]),
    });
    point.setStyle(
      new Style({
        image: new Circle({
          radius: 3,
          fill: new Fill({ color: "red" }),
          stroke: new Stroke({ color: "red", width: 2 }),
        }),
      })
    );
    pointLayer.getSource()?.addFeature(point);

    // 添加圆
    const circle = new Feature({
      geometry: new Point([0, 0]),
    });
    circle.setStyle(
      new Style({
        image: new Circle({
          radius: 10,
          stroke: new Stroke({ color: "blue", width: 2 }),
        }),
      })
    );
    circleLayer.getSource()?.addFeature(circle);
    return () => {
      map?.setTarget(undefined);
    };
  }, []);

  const checkOsm: CheckboxProps["onChange"] = (e) =>
    osmLayer.setVisible(e.target.checked);
  const checkCircle: CheckboxProps["onChange"] = (e) =>
    pointLayer.setVisible(e.target.checked);
  const checkPoint: CheckboxProps["onChange"] = (e) =>
    circleLayer.setVisible(e.target.checked);

  const radioChange: RadioGroupProps["onChange"] = (e) => {
    const value = e.target.value;
    console.log("测试00", circleLayer.getZIndex());
    if (value === 1) {
      osmLayer.setZIndex(3);
      circleLayer.setZIndex((circleLayer.getZIndex() ?? 0) - 1);
      pointLayer.setZIndex((pointLayer.getZIndex() ?? 0) - 1);
    } else if (value === 2) {
      circleLayer.setZIndex(3);
      osmLayer.setZIndex((osmLayer.getZIndex() ?? 0) - 1);
      pointLayer.setZIndex((pointLayer.getZIndex() ?? 0) - 1);
    } else {
      pointLayer.setZIndex(3);
      osmLayer.setZIndex((osmLayer.getZIndex() ?? 0) - 1);
      circleLayer.setZIndex((circleLayer.getZIndex() ?? 0) - 1);
    }
  };
  return (
    <>
      <div>
        显示/隐藏: <Checkbox defaultChecked={true} onChange={checkOsm} />
        底图
        <Checkbox defaultChecked={true} onChange={checkCircle} />圆
        <Checkbox defaultChecked={true} onChange={checkPoint} />点
      </div>
      <div>
        图层顺序：
        <Radio.Group
          onChange={radioChange}
          defaultValue={1}
          options={[
            { value: 1, label: "底图" },
            { value: 2, label: "圆" },
            { value: 3, label: "点" },
          ]}
        />
      </div>
      <div id="map" style={{ width: "100%", height: "400px" }}></div>
    </>
  );
}

export default MapView;
