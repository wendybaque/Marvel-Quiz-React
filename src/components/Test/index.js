import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

function index() {
  return (
    <div>
      <MapContainer center={[47.89491, 1.89440]} zoom={15} scrollWheelZoom={true}>
        <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[47.89491, 1.89440]}>
          <Popup>
            Fedmind. <br /> C'est là.
          </Popup>
        </Marker>
    </MapContainer>
    <script src="https://apps.elfsight.com/p/platform.js" defer></script>
    <div class="elfsight-app-6eb6f4aa-2879-465d-b28b-6f8e349528a3"></div>
    </div>
  )
}

export default index;

