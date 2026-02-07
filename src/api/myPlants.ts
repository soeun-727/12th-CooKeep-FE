// src/api/myPlants.ts
import axios from "./axios";

export const getMyPlants = async () => {
  const res = await axios.get("/api/my-plants");
  return res.data.data; // MyPlant[]
};
