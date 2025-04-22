import { useEffect } from "react";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { transform } from "ol/proj";
import './inde.css'
import { defaults ,FullScreen,MousePosition,OverviewMap,ScaleLine,ZoomSlider,ZoomToExtent} from "ol/control";
// ol.control.Attribution: 右下角的地图信息控件
// ol.control.FullScreen: 全屏控件
// ol.control.MousePosition: 鼠标位置控件
// ol.control.OverviewMap: 鸟瞰图控件
// ol.control.Rotate: 指北针控件
// ol.control.ScaleLine: 比例尺控件
// ol.control.Zoom: 缩放按钮控件
// ol.control.ZoomSlider: 缩放滚动条控件
// ol.control.ZoomToExtent: 放大到设定区域控件
let map: Map | null = null;
function MapView() {
  useEffect(() => {
    const view = new View({
        center: transform(
            [104, 30], 'EPSG:4326', 'EPSG:3857'),
        zoom: 10
    });
    const osmLayer = new TileLayer({
      source: new OSM(),
    });
    map = new Map({
         // 在默认控件的基础上，再加上其他内置的控件
         controls: defaults().extend([
            new FullScreen(),
            new MousePosition(),
            new OverviewMap(),
            new ScaleLine(),
            new ZoomSlider(),
            new ZoomToExtent()
        ]),
      target: "map",
      layers: [osmLayer],
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
