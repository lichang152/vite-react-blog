import { useEffect } from "react";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
let map1: Map | null = null;
let map2: Map | null = null;
function MapView() {
  useEffect(() => {
    const view = new View({
      center: [0, 0],
      zoom: 2,
    });
    map1 = new Map({
      target: "map1",
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view,
    });
    map2 = new Map({
      target: "map1",
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: [0, 0],
        zoom: 2,
      }),
    });

    return () => {
      map1?.setTarget(undefined);
      map2?.setTarget(undefined);
    };
  }, []);
  const swapMap = () => {
    // 改变两个地图容器
    map1?.setTarget("map2");
    map2?.setTarget("map1");
  };
  return (
    <>
      <button onClick={swapMap}>调换地图</button>
      <p>地图1</p>
      <div id="map1" style={{ width: "100%", height: "300px" }}></div>
      <div>地图2</div>
      <div id="map2" style={{ width: "100%", height: "300px" }}></div>
    </>
  );
}

export default MapView;
