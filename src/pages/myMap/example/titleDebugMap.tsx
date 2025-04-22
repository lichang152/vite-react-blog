import { useEffect } from "react";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import TileDebug from "ol/source/TileDebug";
import { transform } from "ol/proj";
let map: Map | null = null;
function MapView() {
  useEffect(() => {
    const view = new View({
      center: transform([104, 30], "EPSG:4326", "EPSG:3857"),
      zoom: 10,
    });
    const osmSource = new OSM();
    map = new Map({
      target: "map",
      layers: [
        new TileLayer({
          source: osmSource,
        }),
        // 添加一个显示Open Street Map地图瓦片网格的图层
        new TileLayer({
          source: new TileDebug({
            projection: "EPSG:3857",
            tileGrid: osmSource.getTileGrid() || undefined,
          }),
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
