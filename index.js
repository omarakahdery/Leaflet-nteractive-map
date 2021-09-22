var baghdad = [33.3126882, 44.3863921];

var london = [51.5287714, -0.2420245];
var map = L.map("map", { zoomControl: false });
map.setView(baghdad, 10);

var osm = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
});
osm.addTo(map);

L.control.zoomslider({ position: "topright" }).addTo(map);

L.control.pan({ position: "bottomright" }).addTo(map);

var google = L.tileLayer(
  "https://mt0.google.com/vt/lyrs=s&hl=en&x={x}&y={y}&z={z}&s=Ga",
  {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }
);

function zoomToRaster() {
  map.setView([40.712216, -74.22655], 12);
}
function zoomToBaghdad() {
  map.setView(baghdad, 12);
}
var topo = L.tileLayer("https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png");

var darkMap = L.tileLayer(
  "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
);

var imageUrl = "http://www.lib.utexas.edu/maps/historical/newark_nj_1922.jpg";
var imageBounds = [
  [40.712216, -74.22655],
  [40.773941, -74.12544],
];
var img = L.imageOverlay(imageUrl, imageBounds).addTo(map);

var c = map.on("mousemove", function (e) {
  console.log(e.latlng);
});
L.control.mousePosition().addTo(map);
L.control
  .polylineMeasure(
    (options = {
      position: "topleft",
      unit: "metres",
      clearMeasurementsOnStop: true,
      showBearings: false,
      bearingTextIn: "In",
    })
  )
  .addTo(map);

L.easyButton("glyphicon glyphicon-align-justify", function () {
  sidebar.toggle();
  setTimeout(function () {
    sidebar.hide();
  }, 10000);
}).addTo(map);

var sidebar = L.control.sidebar("sidebar", {
  position: "left",
});

map.addControl(sidebar);

var baseLayers = {
  OSM: osm,
  Google: google,
  Topomap: topo,
  "Dark Map": darkMap,
};
var overlays = {
  "Raster Katma": img,
};
document.getElementById("myloc").addEventListener("click", function () {
  map.locate();
});
var marker1;
map.on("locationfound", function (e) {
  if (marker1) {
    marker1.remove();
  }
  marker1 = L.circle(e.latlng, { radius: 1000 }).addTo(map);
  map.setView(e.latlng, 12);
});

L.control.layers(baseLayers, overlays).addTo(map);
