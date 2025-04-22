import { useEffect } from "react";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import { Zoomify } from "ol/source";
// import zoomifyImg from "@public/imges/zoomify.png";
let map: Map | null = null;
const imgWidth = 4000;
const imgHeight = 3000;
const zoomifyUrl = "https://ol-zoomify.surge.sh/zoomify/";
function MapView() {
  useEffect(() => {
    const source = new Zoomify({
      url: zoomifyUrl,
      size: [imgWidth, imgHeight],
      crossOrigin: "anonymous",
      zDirection: -1,
    });
    const layer = new TileLayer({
      source: source,
    });
    const extent = source?.getTileGrid()?.getExtent();
    const view = new View({
      resolutions: layer?.getSource()?.getTileGrid()?.getResolutions(),
      // constrain the center: center cannot be set outside this extent
      extent: extent,

      constrainOnlyCenter: true,
    });

    map = new Map({
      target: "map",
      layers: [layer],
      view,
    });
    if (extent) {
      map?.getView().fit(extent);
    }
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
