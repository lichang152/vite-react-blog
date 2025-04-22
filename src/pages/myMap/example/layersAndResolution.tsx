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
    // 监听层级变化，输出当前层级和分辨率
    const zoomElement = document.getElementById("zoom");
    const resolutionElement = document.getElementById("resolution");
    const mapChange = () => {
      if (zoomElement) {
        zoomElement.innerHTML = map?.getView()?.getZoom()?.toString() || "0";
      }
      if (resolutionElement) {
        resolutionElement.innerHTML =
          map?.getView()?.getResolution()?.toString() || "0";
      }
    };
    map.getView()?.on("change:resolution", mapChange);
    mapChange();
    return () => {
      map?.setTarget(undefined);
    };
  }, []);

  return (
    <>
      <div id="map" style={{ width: "100%", height: "400px" }}></div>
      <div>
        <span>当前层级：</span>
        <span id="zoom"></span>
        <span>分辨率：</span>
        <span id="resolution"></span>
      </div>
    </>
  );
}

export default MapView;
