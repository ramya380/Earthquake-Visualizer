import React, { useEffect, useState } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function App() {
  const [earthquakes, setEarthquakes] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/earthquakes")
      .then(res => setEarthquakes(res.data))
      .catch(err => console.error("Error fetching data:", err));
  }, []);

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <h1 style={{ textAlign: "center", marginTop: "10px" }}>🌎 Earthquake Visualizer</h1>
      
      <MapContainer
        center={[20, 78]}
        zoom={3}
        style={{ height: "90vh", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {earthquakes.map(eq => (
          <Marker key={eq.id} position={eq.coordinates}>
            <Popup>
              <strong>{eq.place}</strong><br />
              Magnitude: {eq.magnitude}<br />
              Time: {new Date(eq.time).toLocaleString()}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default App;

