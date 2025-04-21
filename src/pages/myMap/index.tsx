import { useEffect, useState } from "react";

import SwapMap from "./example/swapMap"; 
import NavigationMap from "./example/navigationMap"; 
import Map4326 from "./example/map4326"; 
import LimitRangeMap from "./example/limitRangeMap"; 
import LimitZoomMap from "./example/limitZoomMap"; 
import AdaptiveAreaMap from "./example/adaptiveAreaMap"; 
import SwitchLayers from "./example/switchLayers"; 
import StaticMap from "./example/staticMap"; 
// 地图工具
const mapList = [
  {
    name: "静态地图",
    component: StaticMap,
  },
  {
    name: "切换图层",
    component: SwitchLayers,
  },
  {
    name: "自适配区域",
    component: AdaptiveAreaMap,
  },
  {
    name: "限制地图缩放级别",
    component: LimitZoomMap,
  },
  {
    name: "限制地图范围",
    component: LimitRangeMap,
  },
  {
    name: "调换地图容器",
    component: SwapMap,
  },
  {
    name: "地图导航",
    component: NavigationMap,
  },
  {
    name: "4326坐标系",
    component: Map4326,
  },
];
function MapView() {
  const [deMap, setDeMap] = useState<number>(0);
  useEffect(() => {
    setDeMap(0);
  }, []);
  const Component = mapList[deMap]?.component;
  return (
    <>
      <div>
        {mapList.map((item, index) => {
          return (
            <button
              style={{
                backgroundColor: deMap === index ? "red" : "white",
                marginBottom: "10px",
                marginRight: "10px",
              }}
              key={index}
              onClick={() => {
                setDeMap(index);
              }}
            >
              {item.name}
            </button>
          );
        })}
      </div>
      {Component ? <Component /> : null}
    </>
  );
}

export default MapView;
