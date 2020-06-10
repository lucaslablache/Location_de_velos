class Map
{
  constructor(geoX,geoY,geoZ)
  {
    this.leafletMap = L.map('mapContainer').setView([geoX, geoY], geoZ);
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
    {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      accessToken: 'pk.eyJ1IjoiYXp1cm1hZWwiLCJhIjoiY2s1MnRiNHd3MDFiNjNwbWQ2ZXltMm5xeiJ9.dhJ9-0rrxozSEKzkuAaE1A'
    }).addTo(this.leafletMap);

    fetch(
        "https://api.jcdecaux.com/vls/v3/stations?apiKey=dff771ae311d8fdc73a309b9c67afee55b8f12cc"
    ).then(this.checkResponse.bind(this));

    this.iconeBleu = L.icon({
    iconUrl: '../assets/iconebleu.svg',
    shadowUrl: '../assets/icone.svg',

    iconSize:     [25, 60], // size of the icon
    shadowSize:   [29, 64], // size of the shadow
    //iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    //shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [0, -15] // point from which the popup should open relative to the iconAnchor
    });

    this.iconeGris = L.icon({
    iconUrl: '../assets/iconegris.svg',
    shadowUrl: '../assets/icone.svg',

    iconSize:     [25, 60], // size of the icon
    shadowSize:   [29, 64], // size of the shadow
    popupAnchor:  [0, -15] // point from which the popup should open relative to the iconAnchor
    });

    this.iconeRouge = L.icon({
    iconUrl: '../assets/iconerouge.svg',
    shadowUrl: '../assets/icone.svg',

    iconSize:     [25, 60], // size of the icon
    shadowSize:   [29, 64], // size of the shadow
    popupAnchor:  [0, -15] // point from which the popup should open relative to the iconAnchor
    });
  }
//fin constructor

    checkResponse(reponse)
    {
        if (reponse.status !== 200)
        {
            console.log('Looks like there was a problem. Status Code: ' +
              reponse.status);
            return;
        }
        reponse.json().then(this.exploitData.bind(this));
    }

    exploitData(data)
    {
        data.forEach((e, i) =>
        {
            this.setMarker(e);
        });
    }

    setMarker(station)
    {

        let icone = this.iconeBleu;
        if (station.status === "CLOSED")
        {
            icone = this.iconeRouge;
        }
        else if (station.totalStands.availabilities.bikes === 0)
        {
            icone = this.iconeGris;
        }
        let marker = L.marker([station.position.latitude, station.position.longitude],
                              {icon: icone})
        .addTo(this.leafletMap)
        .on('click', this.handleClick)
        .bindPopup(station.address);
        marker.dataStation = station;
    }

    handleClick(e)
    {
        station.display(this.dataStation);
    }
}
