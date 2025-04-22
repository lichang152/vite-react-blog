import { useEffect } from "react";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { defaults } from "ol/interaction";
import Vector from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Feature } from "ol";
import { Point } from "ol/geom";
import { Style, Circle, Fill, RegularShape } from "ol/style";
import { Select } from "ol/interaction";
import { transform } from "ol/proj";
let map: Map | null = null;
let clickSelect: Select | null = null;
function MapView() {
  useEffect(() => {
    const view = new View({
      center: transform([104, 30], "EPSG:4326", "EPSG:3857"),
      zoom: 10,
    });
    const layer = new Vector({
      // 图片
      source: new VectorSource({}),
      style: new Style({
        image: new Circle({
          radius: 10,
          fill: new Fill({ color: "red" }),
        }),
      }),
    });
    const circleLayer = new Vector({
      // 图片
      source: new VectorSource({}),
      style: new Style({
        image: new Circle({
          radius: 10,
          fill: new Fill({ color: "red" }),
        }),
      }),
    });
    const starLayer = new Vector({
      // 图片
      source: new VectorSource({}),
      style: new Style({
        image: new RegularShape({
          points: 5,
          radius: 20,
          radius2: 10,
          fill: new Fill({ color: "red" }),
        }),
      }),
    });
    const osmLayer = new TileLayer({
      source: new OSM(),
    });
    const interactions = defaults({
      //   doubleClickZoom: false,
      //   mouseWheelZoom: false,
      //   shiftDragZoom: false,
      //   pinchZoom: false,
    });
    map = new Map({
      // 让所有的zoom开关都设置为false
      interactions,
      target: "map",
      layers: [osmLayer, layer, circleLayer, starLayer],
      view,
    });
    // 添加点

    const point = new Feature({
      geometry: new Point([104, 30]),
    });
    const circle = new Feature({
      geometry: new Point(transform([104, 30], "EPSG:4326", "EPSG:3857")),
    });
    const star = new Feature({
      geometry: new Point(transform([104.06, 30.05], "EPSG:4326", "EPSG:3857")),
    });

    layer.getSource()?.addFeature(point);
    circleLayer.getSource()?.addFeature(circle);
    starLayer.getSource()?.addFeature(star);
    // 添加一个用于选择Feature的交互方式
    // const selectSingleClick = new Select({});
    // map.addInteraction(selectSingleClick);
    // selectSingleClick.on("select", (event) => {
    //   event.selected[0].setStyle(
    //     new Style({
    //       image: new Circle({
    //         radius: 10,
    //         fill: new Fill({ color: "blue" }),
    //       }),
    //     })
    //   );
    // });
    clickSelect = new Select({
      // multi: true,    // 允许多选
      // condition: pointerMove, // 唯一的不同之处，设置鼠标移到feature上就选取
      // 关键： 设置过了条件，可以用feature来写过滤，也可以用layer来写过滤
      filter: function (_, layer) {
        return layer === circleLayer;
      },
      style: new Style({
        image: new Circle({
          radius: 10,
          fill: new Fill({ color: "blue" }),
        }),
      }),
    });
    map.addInteraction(clickSelect);
    return () => {
      map?.setTarget(undefined);
    };
  }, []);

  return (
    <>
      <button onClick={() => {clickSelect?.getFeatures()?.clear();}}>取消选中</button>
      <div
        id="map"
        tabIndex={0}
        style={{ width: "100%", height: "400px" }}
      ></div>
    </>
  );
}

export default MapView;
