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

  const moveTo = (type: string) => {
    const view = map?.getView();
    const mapCenter = view?.getCenter();
    const centerIndex = ["left", "right"].includes(type) ? 0 : 1;
    if (mapCenter && view) {
      mapCenter[centerIndex] = ["left", "down"].includes(type)
        ? mapCenter[centerIndex] + 50000
        : mapCenter[centerIndex] - 50000;
      view.setCenter(mapCenter);
      view.setCenter(mapCenter);
      map?.render();
    }
  };

  const zoomChange = (type: string) => {
    const view = map?.getView();
    view?.setZoom((view.getZoom() ?? 0) + (type === "in" ? 1 : -1));
  };
  return (
    <>
      <button onClick={() => moveTo("left")}>左移</button>
      <button onClick={() => moveTo("right")}>右移</button>
      <button onClick={() => moveTo("up")}>上移</button>
      <button onClick={() => moveTo("down")}>下移</button>
      <button onClick={() => zoomChange("in")}>放大</button>
      <button onClick={() => zoomChange("out")}>缩小</button>
      <div id="map" style={{ width: "100%", height: "300px" }}></div>
    </>
  );
}

export default MapView;
