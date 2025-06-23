
import score from "assets/model.js"
import LocationStats from "assets/location_stats.json"
import LocationEncoder from "assets/location_encoder.json"
import type { Coordinate } from "types";
const LocationEncoderTyped: { [key: string]: number } = LocationEncoder as { [key: string]: number };
export function formatString(str: string): string {
    return str
      .trim()
      .split(" ")
      .map(
        (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      )
      .join(" ");
  }





export function buildFeatures(latitude: number, longitude: number): number[] {
    const now = new Date();
    const hour = now.getHours();
    const location_id = `${latitude.toFixed(4)}_${longitude.toFixed(4)}`;
    const location_encoded = LocationEncoderTyped[location_id] ?? -1;

    // const location_id = `${latitude.toFixed(4)}_${longitude.toFixed(4)}`;
    // const location_encoded = LocationEncoder[location_id] ?? -1;

    const stat = LocationStats.find((s) => s.location_id === location_id);
    const historical_risk = stat?.historical_risk ?? 0;

    return [hour,  now.getDay(),  ((Number(now.getDay())!==0)&&(now.getDay()!==6) ? false : true) ? 1 : 0 ,location_encoded, historical_risk];
}




// Grid function that will go around the person's location till they find the spot

export function recursiveRequest(
  latitude: number,
  longitude: number,
  maxTries: number = 20,
  placesTried: Coordinate[] = []
): Coordinate | Coordinate[] {
  const offsets = [
    [0, 0],
    [0.0005, -0.0005],
    [0.0005, 0],
    [0.0005, 0.0005],
    [0, -0.0005],
    [0, 0.0005],
    [-0.0005, -0.0005],
    [-0.0005, 0],
    [-0.0005, 0.0005],
  ];

  for (const [latOffset, lngOffset] of offsets) {
    const newLat = latitude + latOffset;
    const newLng = longitude + lngOffset;

    // Skip if already tried
    if (placesTried.some(p => p.latitude === newLat && p.longitude === newLng)) {
      continue;
    }

    const features = buildFeatures(newLat, newLng);
    const prediction = predictClass(features);
    console.log("Going through cycle 1", features)
    console.log("Prediction", prediction)
    if (prediction === 0) {
      return { latitude: newLat, longitude: newLng };
    }

    placesTried.push({ latitude: newLat, longitude: newLng });

    if (placesTried.length >= maxTries) {
      return placesTried;
    }
  }

  // If none of the 9 worked, recurse further out (like spiral)
  return recursiveRequest(latitude + 0.0005, longitude + 0.0005, maxTries, placesTried);
}


export const predictClass = (features: number[]) => {
    console.log("in the predict class")
  
    // This error is just wrong chat
    const probabilities = score(features);
    console.log("just passed probabilities")
    let maxIndex = 0;
    for (let i = 1; i < probabilities.length; i++) {
      if (probabilities[i] > probabilities[maxIndex]) {
        maxIndex = i;
      }
    }
    console.log("our prediction", maxIndex)
    return maxIndex; // return index of the highest probability

}
    