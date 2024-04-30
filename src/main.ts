import { invoke } from "@tauri-apps/api/tauri";
import * as Cesium from "cesium";

let greetInputEl: HTMLInputElement | null;
let greetMsgEl: HTMLElement | null;

async function greet() {
  if (greetMsgEl && greetInputEl) {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    greetMsgEl.textContent = await invoke("greet", {
      name: greetInputEl.value,
    });
  }
}

window.addEventListener("DOMContentLoaded", () => {
  greetInputEl = document.querySelector("#greet-input");
  greetMsgEl = document.querySelector("#greet-msg");
  document.querySelector("#greet-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    greet();
  });
});

(function() {
  "use strict";
  Cesium.Ion.defaultAccessToken = '';

  // alomost of following code is from https://gist.github.com/banesullivan/e3cc15a3e2e865d5ab8bae6719733752

  /* Per Carto's website regarding basemap attribution: https://carto.com/help/working-with-data/attribution/#basemaps */
  let CartoAttribution = 'Map tiles by <a href="https://carto.com">Carto</a>, under CC BY 3.0. Data by <a href="https://www.openstreetmap.org/">OpenStreetMap</a>, under ODbL.'

  // Create ProviderViewModel based on different imagery sources
  // - these can be used without Cesium Ion
  var imageryViewModels = [];

  // This code comes from https://cesium.com/learn/ion-sdk/ref-doc/BaseLayerPicker.html
  imageryViewModels.push(new Cesium.ProviderViewModel({
    name: 'NaturalEarth\u00a0II',
    tooltip: 'NaturalEarthII',
    iconUrl: Cesium.buildModuleUrl("Widgets/Images/ImageryProviders/naturalEarthII.png"),
    creationFunction: function() {
      return Cesium.TileMapServiceImageryProvider.fromUrl(
          Cesium.buildModuleUrl("Assets/Textures/NaturalEarthII")
      );
    }
  }))
  
  imageryViewModels.push(new Cesium.ProviderViewModel({
    name: 'OpenStreetMap',
    iconUrl: Cesium.buildModuleUrl('Widgets/Images/ImageryProviders/openStreetMap.png'),
    tooltip: 'OpenStreetMap (OSM) is a collaborative project to create a free editable \
  map of the world.\nhttp://www.openstreetmap.org',
    creationFunction: function() {
      return new Cesium.UrlTemplateImageryProvider({
        url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        subdomains: 'abc',
        minimumLevel: 0,
        maximumLevel: 19
      });
    }
  }));
  imageryViewModels.push(new Cesium.ProviderViewModel({
    name: 'Positron',
    tooltip: 'CartoDB Positron basemap',
    iconUrl: 'http://a.basemaps.cartocdn.com/light_all/5/15/12.png',
    creationFunction: function() {
      return new Cesium.UrlTemplateImageryProvider({
        url: 'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
        credit: CartoAttribution,
        minimumLevel: 0,
        maximumLevel: 18
      });
    }
  }));
  imageryViewModels.push(new Cesium.ProviderViewModel({
    name: 'Positron without labels',
    tooltip: 'CartoDB Positron without labels basemap',
    iconUrl: 'http://a.basemaps.cartocdn.com/rastertiles/light_nolabels/5/15/12.png',
    creationFunction: function() {
      return new Cesium.UrlTemplateImageryProvider({
        url: 'https://{s}.basemaps.cartocdn.com/rastertiles/light_nolabels/{z}/{x}/{y}.png',
        credit: CartoAttribution,
        minimumLevel: 0,
        maximumLevel: 18
      });
    }
  }));
  imageryViewModels.push(new Cesium.ProviderViewModel({
    name: 'Dark Matter',
    tooltip: 'CartoDB Dark Matter basemap',
    iconUrl: 'http://a.basemaps.cartocdn.com/rastertiles/dark_all/5/15/12.png',
    creationFunction: function() {
      return new Cesium.UrlTemplateImageryProvider({
        url: 'https://{s}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}.png',
        credit: CartoAttribution,
        minimumLevel: 0,
        maximumLevel: 18
      });
    }
  }));
  imageryViewModels.push(new Cesium.ProviderViewModel({
    name: 'Dark Matter without labels',
    tooltip: 'CartoDB Dark Matter without labels basemap',
    iconUrl: 'http://a.basemaps.cartocdn.com/rastertiles/dark_nolabels/5/15/12.png',
    creationFunction: function() {
      return new Cesium.UrlTemplateImageryProvider({
        url: 'https://{s}.basemaps.cartocdn.com/rastertiles/dark_nolabels/{z}/{x}/{y}.png',
        credit: CartoAttribution,
        minimumLevel: 0,
        maximumLevel: 18
      });
    }
  }));
  imageryViewModels.push(new Cesium.ProviderViewModel({
    name: 'Voyager',
    tooltip: 'CartoDB Voyager basemap',
    iconUrl: 'http://a.basemaps.cartocdn.com/rastertiles/voyager_labels_under/5/15/12.png',
    creationFunction: function() {
      return new Cesium.UrlTemplateImageryProvider({
        url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}.png',
        credit: CartoAttribution,
        minimumLevel: 0,
        maximumLevel: 18
      });
    }
  }));
  imageryViewModels.push(new Cesium.ProviderViewModel({
    name: 'Voyager without labels',
    tooltip: 'CartoDB Voyager without labels basemap',
    iconUrl: 'http://a.basemaps.cartocdn.com/rastertiles/voyager_nolabels/5/15/12.png',
    creationFunction: function() {
      return new Cesium.UrlTemplateImageryProvider({
        url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}.png',
        credit: CartoAttribution,
        minimumLevel: 0,
        maximumLevel: 18
      });
    }
  }));
  imageryViewModels.push(new Cesium.ProviderViewModel({
    name: 'National Map Satellite',
    tooltip: 'National Map Satellite',
    iconUrl: 'https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryOnly/MapServer/tile/4/6/4',
    creationFunction: function() {
      return new Cesium.UrlTemplateImageryProvider({
        url: 'https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryOnly/MapServer/tile/{z}/{y}/{x}',
        credit: 'Tile data from <a href="https://basemap.nationalmap.gov/">USGS</a>',
        minimumLevel: 0,
        maximumLevel: 16
      });
    }
  }));

  imageryViewModels.push(new Cesium.ProviderViewModel({
    name: 'GSI Tile (Japan)',
    tooltip: 'GSI Tile',
    iconUrl: 'https://cyberjapandata.gsi.go.jp/xyz/std/2/3/1.png',
    creationFunction: function(){
      return new Cesium.UrlTemplateImageryProvider({
        url: 'https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png',
        credit: 'Tile data from <a href="https://maps.gsi.go.jp/development/ichiran.html">GSI in Japan</a>',
        minimumLevel: 0,
        maximumLevel: 16
      });
    }
  }),)

  imageryViewModels.push(new Cesium.ProviderViewModel({
    name: '20万分の1日本シームレス地質図V2',
    tooltip: '20万分の1日本シームレス地質図V2',
    iconUrl: 'https:/gbank.gsj.jp/seamless/v2/api/1.3.1/tiles/11/777/1827.png',
    creationFunction: function(){
      return new Cesium.UrlTemplateImageryProvider({
        url: 'https://gbank.gsj.jp/seamless/v2/api/1.3.1/tiles/{z}/{y}/{x}.png?type=level4',
        credit: 'Tile data from <a href="https://gbank.gsj.jp/seamless/v2/api/1.3.1/">GSJ, AIST</a>',
        minimumLevel: 0,
        maximumLevel: 16
      });
    }
  }),)

  // Home Viewを東京駅付近に設定
  var defaultExtent = Cesium.Rectangle.fromDegrees(139.75, 35.67, 139.76, 35.68);
  Cesium.Camera.DEFAULT_VIEW_RECTANGLE = defaultExtent;
  Cesium.Camera.DEFAULT_VIEW_FACTOR = 1;

  var _viewer = new Cesium.Viewer("cesium", {
    imageryProviderViewModels: imageryViewModels,
    terrainProviderViewModels: [],
    selectedImageryProviderViewModel: imageryViewModels[0],
    // baseLayerPicker: false,
    geocoder: false,
    infoBox: false,
    // creditContainer: document.createElement("none"),
  });

}());
