import { useEffect, useState } from "react";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { transform } from "ol/proj";
import { Draw } from "ol/interaction";
import Vector from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Stroke, Style, Circle, Fill } from "ol/style";
let map: Map | null = null;
let draw: Draw | null = null;
let linelayer: Vector | null = null;
function MapView() {
  const [strs, setStrs] = useState("");
  useEffect(() => {
    const view = new View({
      center: transform([104, 30], "EPSG:4326", "EPSG:3857"),
      zoom: 10,
    });
    const osmLayer = new TileLayer({
      source: new OSM(),
    });

    map = new Map({
      target: "map",
      layers: [osmLayer],
      view,
    });
    linelayer = new Vector({
      source: new VectorSource({}),
      style: new Style({
        image: new Circle({
          radius: 3,
          fill: new Fill({ color: "red" }),
          stroke: new Stroke({ color: "red", width: 2 }),
        }),
        stroke: new Stroke({
          color: "red",
          width: 3,
        }),
      }),
    });
    map.addLayer(linelayer);
    draw = new Draw({
      type: "LineString",
      //   type包含
      // 'Point',
      // 'LineString',
      // 'LinearRing',线 报错
      //  'Polygon', 多边形
      // 'MultiPoint',多点的
      // 'MultiLineString',多线字符串
      // 'MultiPolygon',
      // 'GeometryCollection',报错 几何集合
      // 'Circle'

      source: linelayer.getSource() as VectorSource,
      maxPoints: 4,
    });
    draw.on("drawend", (event) => {
      const geome = event.feature?.getGeometry();
      if (geome && geome.getType() === "LineString") {
        setStrs(
          JSON.stringify(
            (geome as import("ol/geom/LineString").default).getCoordinates()
          )
        );
      }
    });
    map.addInteraction(draw);
    return () => {
      map?.setTarget(undefined);
    };
  }, []);

  return (
    <>
      <button
        onClick={() => {
          map?.removeLayer(linelayer as Vector);
        }}
      >
        清楚地图线
      </button>
      <button
        onClick={() => {
          map?.removeInteraction(draw as Draw);
        }}
      >
        取消绘制
      </button>
      <div>当前绘制线的坐标：{strs}</div>
      <div id="map" style={{ width: "100%", height: "400px" }}></div>
    </>
  );
}

export default MapView;
