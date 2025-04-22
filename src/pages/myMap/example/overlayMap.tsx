import { useEffect, useRef } from "react";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import anchorImg from "@public/imges/anchor.png";
import Overlay from "ol/Overlay";
import "./inde.css";
let map: Map | null = null;
function MapView() {
  const elementRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const view = new View({
      projection: "EPSG:4326",
      center: [104, 30],
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
    // 下面把上面的图标附加到地图上，需要一个ol.Overlay
    const anchor = new Overlay({
      element: elementRef.current as HTMLElement,
    });
    // 关键的一点，需要设置附加到地图上的位置
    anchor.setPosition([104, 30]);
    map.addOverlay(anchor);
    return () => {
      map?.setTarget(undefined);
      map?.removeOverlay(anchor);
    };
  }, []);

  return (
    <>
      <div id="map" style={{ width: "100%", height: "400px" }}></div>
      <div ref={elementRef}>
        <img src={anchorImg} id="anchorImg" alt="示例锚点" />
      </div>
    </>
  );
}

export default MapView;
