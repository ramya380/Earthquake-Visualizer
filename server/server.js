import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
app.use(cors());

app.get("/api/earthquakes", async (req, res) => {
  try {
    const response = await axios.get(
      "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson"
    );
    const data = response.data.features.map(eq => ({
      id: eq.id,
      place: eq.properties.place,
      magnitude: eq.properties.mag,
      time: new Date(eq.properties.time),
      coordinates: eq.geometry.coordinates.slice(0, 2).reverse(), // [lat, lon]
    }));
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
