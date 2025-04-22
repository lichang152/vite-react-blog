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
      center: [0, 0],
      zoom: 2,
    });
    const osmLayer = new TileLayer({
      source: new OSM(),
    });
    map = new Map({
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
