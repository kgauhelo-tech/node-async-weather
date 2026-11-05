import { coordinates } from "../models/weatherModel";
import { fetchWeather } from "./weather";
import { fetchHeadlines } from "./headlines";

export const fetchData = (
  coordinates: coordinates,
  callback: (
    error: Error | null,
    results?: { weather: any; headlines: string[] },
  ) => void,
) => {
  let weatherResult: any = null;
  let headlinesResult: string[] | null = null;
  let errorOccurred = false;

  function checkCompletion() {
    if (errorOccurred) return;

    if (weatherResult !== null && headlinesResult !== null) {
      callback(null, {
        weather: weatherResult,
        headlines: headlinesResult,
      });
    }
  }

  fetchWeather(coordinates, (error, weather) => {
    if (error) {
      errorOccurred = true;
      callback(error);
      return;
    }
    weatherResult = weather;
    checkCompletion();
  });

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
