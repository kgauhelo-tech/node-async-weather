import { coordinates } from "../models/weatherModel";
import { fetchWeatherApi } from "openmeteo";

export const fetchWeather = async (coordinates: coordinates) => {
  const params = {
    latitude: coordinates.latitude,
    longitude: coordinates.longitude,
    hourly: [
      "rain",
      "wind_speed_80m",
      "temperature_80m",
      "relative_humidity_2m",
    ],
    current: [
      "temperature_2m",
      "rain",
      "wind_speed_10m",
      "relative_humidity_2m",
    ],
    timezone: "auto",
  };
  const url = "https://api.open-meteo.com/v1/forecast";
  const responses = await fetchWeatherApi(url, params);

  // Process first location. Add a for-loop for multiple locations or weather models
  const response = responses[0];

  // Attributes for timezone and location
  const timezone = response.timezone();
  const utcOffsetSeconds = response.utcOffsetSeconds();

  const current = response.current()!;
  const hourly = response.hourly()!;

  // Note: The order of weather variables in the URL query and the indices below need to match!
  const weatherData = {
    current: {
      time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
      temperature_2m: current.variables(0)!.value(),
      rain: current.variables(1)!.value(),
      wind_speed_10m: current.variables(2)!.value(),
      relative_humidity_2m: current.variables(3)!.value(),
    },
    hourly: {
      time: Array.from(
        {
          length:
            (Number(hourly.timeEnd()) - Number(hourly.time())) /
            hourly.interval(),
        },
        (_, i) =>
          new Date(
            (Number(hourly.time()) + i * hourly.interval() + utcOffsetSeconds) *
              1000,
          ),
      ),
      rain: hourly.variables(0)!.valuesArray(),
      wind_speed_80m: hourly.variables(1)!.valuesArray(),
      temperature_80m: hourly.variables(2)!.valuesArray(),
      relative_humidity_2m: hourly.variables(3)!.valuesArray(),
    },
    location: {
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
      timezone: timezone,
    },
  };
  return weatherData;
};
