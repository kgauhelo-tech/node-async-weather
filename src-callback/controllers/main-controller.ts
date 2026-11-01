import { coordinates } from "../models/weatherModel";
import { fetchHeadlines } from "./headlines";
import { fetchWeather } from "./weather";

export const fetchData = async (coordinates: coordinates) => {
  const headlines = await fetchHeadlines();
  const weather = await fetchWeather(coordinates);
  return { weather, headlines };
};
