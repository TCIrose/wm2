//map object
var map1 = document.getElementById("map");
//limit map bounds
var corner1 = L.latLng(7, 40),
    corner2 = L.latLng(-5, 35),
    bounds = L.latLngBounds(corner1, corner2);
var map = L.map(map1, {
    center: [0.000, 38.000],
    zoom: 6,
    scrollWheelZoom: true,
    maxBounds: bounds,
    maxBoundsViscosity: 1.0


});
//base map
L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ENC222-0345/2016 Irose Tony,  Icons &copy; <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>'
}).addTo(map);

//data
var data = $.getJSON({
    'url': "./data/restaurants.json",
    'async': false
});
data = JSON.parse(data.responseText);

//define custom icon
var restIcon = L.icon({
    iconUrl: './icons/restaurant.png',
    iconSize: [35, 41],
    iconAnchor: [14, 40],
    popupAnchor: [0, -40]
});

//bind  data with popups on mousover
for (d in data) {
    var coords = L.latLng({
        lat: data[d].address.coord[1],
        lng: data[d].address.coord[0]
    });
    var date, otherinfo;
    var name = `<span style="font-weight: bold;">${data[d].name}</span>`;
    var cuisine = `<br><span style="font-style: italic;">${data[d].cuisine} cuisine </span>`;
    var street = `<br><b>Street</b>: ${data[d].address.street}`;
    otherinfo = name + cuisine + street;

    for (t = 0; t < data[d].grades.length; t++) {
        date = "<br><span style='font-weight: bold'>Date: </span>" + data[d].grades[t].date.$date;
        otherinfo = otherinfo + date;
    };
    var points = L.marker(coords, {
        icon: restIcon
    }).bindPopup(otherinfo);
    points.on('click', function() {
        this.openPopup();
    });

    points.addTo(map);


}