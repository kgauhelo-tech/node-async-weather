import { coordinates } from "../models/weatherModel";
import { fetchWeather } from "./weather";
import { fetchHeadlines } from "./headlines";

export const fetchData = (
  coordinates: coordinates,
  callback: (
    error: Error | null, // <--- Fixed: Added '| null' so you can pass null on success!
    results?: { weather: any; headlines: string[] },
  ) => void,
) => {
  let weatherResult: any = null;
  let headlinesResult: string[] | null = null;
  let errorOccurred = false;

  function checkCompletion() {
    if (errorOccurred) return;

    // Once both slots have data, deliver the combined package via the callback
    if (weatherResult !== null && headlinesResult !== null) {
      callback(null, {
        weather: weatherResult,
        headlines: headlinesResult,
      });
    }
  }

  // 1. Fire weather fetch
  fetchWeather(coordinates, (error, weather) => {
    if (error) {
      errorOccurred = true;
      callback(error);
      return;
    }
    weatherResult = weather;
    checkCompletion();
  });

  // 2. Fire headlines fetch concurrently
  fetchHeadlines((err, headlines) => {
    if (err) {
      errorOccurred = true;
      callback(err);
      return;
    }
    headlinesResult = headlines;
    checkCompletion();
  });
};
