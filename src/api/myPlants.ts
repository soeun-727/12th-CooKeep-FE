// src/api/myPlants.ts
import axios from "./axios";

export const getMyPlants = async () => {
  const res = await axios.get("/api/my-plants");
  return res.data.data; // MyPlant[]
};

export const registerMyPlant = async (plantId: number) => {
  const res = await axios.post(`/api/my-plants/${plantId}`);
  return res.data;
};

export const waterMyPlant = async (userPlantId: number) => {
  const res = await axios.post(`/api/my-plants/${userPlantId}/water`);
  return res.data;
};

export const deleteMyPlant = async (userPlantId: number) => {
  const res = await axios.delete(`/api/my-plants/${userPlantId}`);
  return res.data;
};

export const reviveMyPlant = async (userPlantId: number) => {
  const res = await axios.post(`/api/my-plants/${userPlantId}/revive`);
  return res.data;
};

export const setProfileMyPlant = async (userPlantId: number) => {
  const res = await axios.patch(`/api/my-plants/${userPlantId}/profile`);
  return res.data;
};
