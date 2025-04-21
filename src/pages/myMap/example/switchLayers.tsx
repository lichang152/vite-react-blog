import { useEffect } from "react";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import BingMaps from "ol/source/BingMaps";
import XYZ from "ol/source/XYZ";
let map: Map | null = null;

// Open Street Map 地图层
const openStreetMapLayer = new TileLayer({
  source: new OSM(),
});
// Open Street Map 地图层XYZ
const openStreetMapXYZLayer = new TileLayer({
  source: new XYZ({
    url:'http://webst0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}'
  }),
});
// Open Street Map 地图层
const bingMapLayer = new TileLayer({
  source: new BingMaps({
    key: "AkjzA7OhS4MIBjutL21bkAop7dc41HSE0CNTR5c6HJy8JKc7U9U9RveWJrylD3XJ",
    imagerySet: "Road",
  }),
});
function MapView() {
  useEffect(() => {
    const view = new View({
     // 设置成都为地图中心
     center: [104.06, 30.67],
     projection: 'EPSG:4326',
     zoom: 10
    });
    map = new Map({
      target: "map",
      layers: [openStreetMapLayer],
      view,
    });

    return () => {
      map?.setTarget(undefined);
    };
  }, []);

  const switch2OSM = () => {
    map?.removeLayer(map.getLayers().item(0));
    map?.addLayer(openStreetMapLayer);
  };

  const switch2OSMXYZ = () => {
    map?.removeLayer(map.getLayers().item(0));
    map?.addLayer(openStreetMapXYZLayer);
  };

  const switch2BingMap = () => {
    map?.removeLayer(map.getLayers().item(0));
    map?.addLayer(bingMapLayer);
  };
  return (
    <>
      <input type="radio" name="mapSource" onClick={switch2OSM} />
      高德地图
      <input type="radio" name="mapSource" onClick={switch2OSMXYZ} />
      OpenStreetMap地图XYZ
      <input type="radio" name="mapSource" onClick={switch2BingMap} />
      Bing地图
      <div id="map" style={{ width: "100%", height: "400px" }}></div>
    </>
  );
}

export default MapView;
