import { useEffect, useState } from "react";

import SwapMap from "./example/swapMap";
import NavigationMap from "./example/navigationMap";
import Map4326 from "./example/map4326";
import LimitRangeMap from "./example/limitRangeMap";
import LimitZoomMap from "./example/limitZoomMap";
import AdaptiveAreaMap from "./example/adaptiveAreaMap";
import SwitchLayers from "./example/switchLayers";
import StaticMap from "./example/staticMap";
import VectorMap from "./example/vectorMap";
import GetAllLoadFeatures from "./example/getAllLoadFeatures";
import CoordinateTransFormMap from "./example/coordinateTransFormMap";
import LayerManageMap from "./example/layerManageMap";
import TitleDebugMap from "./example/titleDebugMap";
import LayersAndResolution from "./example/layersAndResolution";
import OverlayMap from "./example/overlayMap";
import FeatureMap from "./example/featureMap";
import StyleFunctionMap from "./example/styleFunctionMap";
import SingecliclMap from "./example/singecliclMap";
import CommonEventsMap from "./example/commonEventsMap";
import CustomEvents from "./example/customEvents";
import InteractionMap from "./example/interactionMap";
import DrawALineMap from "./example/drawALineMap";
import ControlsOverviewMap from "./example/controlsOverviewMap";
import AnimationMap from "./example/animationMap";
import ZoomifyMap from "./example/zoomifyMap";
// 地图工具
const mapList = [
  {
    name: "放大查看(图片)",
    component: ZoomifyMap,
  },
  {
    name: "动画",
    component: AnimationMap,
  },
  {
    name: "控件概览",
    component: ControlsOverviewMap,
  },
  {
    name: "绘制一条线",
    component: DrawALineMap,
  },
  {
    name: "地图互动",
    component: InteractionMap,
  },
  {
    name: "自定义事件",
    component: CustomEvents,
  },
  {
    name: "地图常用事件",
    component: CommonEventsMap,
  },
  {
    name: "点击事件",
    component: SingecliclMap,
  },
  {
    name: "应用StyleFunction",
    component: StyleFunctionMap,
  },
  {
    name: "应用featureMap",
    component: FeatureMap,
  },
  {
    name: "应用overlay",
    component: OverlayMap,
  },
  {
    name: "获取层级和分辨率",
    component: LayersAndResolution,
  },
  {
    name: "瓦片地图调试",
    component: TitleDebugMap,
  },
  {
    name: "图层管理",
    component: LayerManageMap,
  },
  {
    name: "坐标转换",
    component: CoordinateTransFormMap,
  },
  {
    name: "获取加载后的所有feature",
    component: GetAllLoadFeatures,
  },
  {
    name: "矢量地图",
    component: VectorMap,
  },
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
