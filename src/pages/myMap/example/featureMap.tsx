import { useEffect } from "react";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import Vector from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Feature } from "ol";
import { Point } from "ol/geom";
import Style from "ol/style/Style";
import Icon from "ol/style/Icon";
import anchorImg from "@public/imges/anchor.png";
import { Circle, Stroke, Fill, RegularShape, Text } from "ol/style";
let map: Map | null = null;
function MapView() {
  useEffect(() => {
    const layer = new Vector({
      // 图片
      source: new VectorSource({}),
    });
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
        layer,
      ],
      view,
    });

    // 添加点
    const point = new Feature({
      geometry: new Point([104, 30]),
    });
    point.setStyle(
      new Style({
        text: new Text({
          offsetY: 20,
          text: "测试带你啊",
          fill: new Fill({
            color: "red",
          }),
        }),
        image: new Circle({
          radius: 3,
          fill: new Fill({ color: "red" }),
          stroke: new Stroke({ color: "red", width: 2 }),
        }),
      })
    );
    layer.getSource()?.addFeature(point);
    // 创建一个Feature，并设置好在地图上的位置
    const anchor = new Feature({
      geometry: new Point([104, 30]),
    });
    // 设置样式
    anchor.setStyle(
      new Style({
        image: new Icon({
          src: anchorImg,
          anchor: [3, 1], // 设置图标位置
        }),
      })
    );
    layer.getSource()?.addFeature(anchor);
    map.getView()?.on("change:resolution", () => {
      const style = anchor.getStyle() as Style;
      style.getImage()?.setScale((map?.getView()?.getZoom() ?? 0) / 10);
      anchor.setStyle(style);
    });

    // 添加svg图标
    const svgIcon = new Feature({
      geometry: new Point([104, 30]),
    });
    // 构建svg的Image对象
    const svg =
      '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="30px" height="30px" viewBox="0 0 30 30" enable-background="new 0 0 30 30" xml:space="preserve">' +
      '<path fill="#156BB1" d="M22.906,10.438c0,4.367-6.281,14.312-7.906,17.031c-1.719-2.75-7.906-12.665-7.906-17.031S10.634,2.531,15,2.531S22.906,6.071,22.906,10.438z"/>' +
      '<circle fill="#FFFFFF" cx="15" cy="10.677" r="3.291"/></svg>';
    const mysvg = new Image();
    mysvg.src = "data:image/svg+xml," + escape(svg);
    svgIcon.setStyle(
      new Style({
        image: new Icon({
          anchor: [5, 1], // 设置图标位置
          img: mysvg, // 设置Image对象
          //   scale: 0.3, // 调整图标大小
          //          src: 'http://www.williambuck.com/portals/0/Skins/WilliamBuck2014/images/location-icon.svg',
          size: [30, 30],
        }),
      })
    );
    layer.getSource()?.addFeature(svgIcon);

    // 添加一个三角形
    const shape = new Feature({
      geometry: new Point([104.2, 30]),
    });
    shape.setStyle(
      new Style({
        image: new RegularShape({
          points: 3, // 顶点数
          radius: 20, // 图形大小，单位为像素
          stroke: new Stroke({
            // 设置边的样式
            color: "red",
            width: 5,
          }),
        }),
      })
    );
    layer.getSource()?.addFeature(shape);

    // 添加一个五角星
    const star = new Feature({
      geometry: new Point([104.2, 30.1]),
    });
    star.setStyle(
      new Style({
        image: new RegularShape({
          points: 5, // 顶点数
          radius: 20, // 外圈大小
          radius2: 10, // 内圈大小
          stroke: new Stroke({
            // 设置边的样式
            color: "red",
            width: 2,
          }),
          //   fill: new Fill({
          //     color: "yellow", // 填充颜色
          //   }),
        }),
      })
    );
    layer.getSource()?.addFeature(star);
    map?.on("click", (event) => {
      const feature = map?.forEachFeatureAtPixel(event.pixel, (feature) => {
        return feature;
      });
      if (feature) {
        // 将空心五星为红色实心五星
        (feature as Feature).setStyle(
          new Style({
            image: new RegularShape({
              points: 5,
              radius: 20,
              radius2: 10,
              stroke: new Stroke({
                // 设置边的样式
                color: "red",
                width: 2,
              }),
              fill: new Fill({
                color: "red",
              }),
            }),
          })
        );
      }
    });
    // 添加一个不规则
    const anomaly = new Feature({
      geometry: new Point([104.3, 30.1]),
    });
    // 使用canvas绘制一个不规则几何图形
    const canvas = document.createElement("canvas");
    canvas.width = 20;
    canvas.height = 20;
    const context = canvas.getContext("2d");
    if (context) {
      context.strokeStyle = "red";
      context.lineWidth = 1;
      context.beginPath();
      context.moveTo(0, 0);
      context.lineTo(20, 10);
      context.lineTo(0, 20);
      context.lineTo(10, 10);
      context.lineTo(0, 0);
      context.stroke();
    }
    anomaly.setStyle(
      new Style({
        image: new Icon({
          img: canvas,
          size: [canvas.width, canvas.height],
          rotation: (90 * Math.PI) / 180,
        }),
      })
    );
    layer.getSource()?.addFeature(anomaly);
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
