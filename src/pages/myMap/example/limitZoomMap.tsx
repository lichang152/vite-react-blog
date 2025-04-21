import { useEffect } from "react";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
let map: Map | null = null;
function MapView() {
  useEffect(() => {
    const view = new View({
      // 设置成都为地图中心
      center: [104.06, 30.67],
      projection: "EPSG:4326",
      zoom: 10,
      // 限制地图缩放最大级别为14，最小级别为10
      minZoom: 10,
      maxZoom: 14,
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
