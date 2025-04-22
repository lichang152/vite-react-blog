import { useEffect } from "react";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import Vector from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { Style, Circle, Fill } from "ol/style";

// import { Vector } from "ol/source";
let map: Map | null = null;
function MapView() {
  useEffect(() => {
    const osmLayer = new TileLayer({
      source: new OSM(),
    });
    const layer = new Vector({
      source: new VectorSource(),
    });
    const view = new View({
      center: [0, 0],
      zoom: 2,
    });
    map = new Map({
      target: "map",
      layers: [osmLayer, layer],
      view,
    });
    // 在原点处创建一个feature
    const feature1 = new Feature({
      geometry: new Point([0, 0]),
    });
    feature1.setStyle(
      new Style({
        image: new Circle({
          radius: 100,
          fill: new Fill({
            color: "red",
          }),
        }),
      })
    );
    layer.getSource()?.addFeature(feature1);

    const feature2 = new Feature({
      geometry: new Point([5000000, 5000000]),
    });
    feature2.setStyle(
      new Style({
        image: new Circle({
          radius: 100,
          fill: new Fill({
            color: "yellow",
          }),
        }),
      })
    );
    layer.getSource()?.addFeature(feature2);

    // 自定义事件mousemove
    const mousemove = (event: import("ol/MapBrowserEvent").default) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      map?.forEachFeatureAtPixel(event.pixel, (feature: any) => {
        feature.dispatchEvent({ type: "mousemove", event: event });
        // feature.dispatchEvent({ type: "mousein", event: event });
        // feature.dispatchEvent({ type: "mouseout", event: event });
      });
      const hoverFeture = map?.forEachFeatureAtPixel(
        [event.pixel[0], event.pixel[1]],
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (feature: any) => {
          return feature;
        }
      );
      if (hoverFeture === feature1) {
        hoverFeture.dispatchEvent({ type: "mousein", event: event });
      } else {
        hoverFeture.dispatchEvent({ type: "mouseout", event: event });
      }
    };
    map?.on("pointermove", mousemove);
    // 为feature1注册自定义事件mousemove的监听
    // const changeColor = (color: string) => {
    //   feature1.setStyle(
    //     new Style({
    //       image: new Circle({
    //         radius: 100,
    //         fill: new Fill({
    //           color: color,
    //         }),
    //       }),
    //     })
    //   );
    // };
    // feature1.on("mousemove", () => changeColor("blue"));
    // feature1.on("mousein", () => changeColor("yellow"));
    // feature1.on("mouseout",()=> changeColor("blue"));
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
