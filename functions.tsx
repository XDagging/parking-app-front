
import score from "./assets/model"
import LocationStats from "assets/location_stats.json"
import LocationEncoder from "assets/location_encoder.json"
import type { Coordinate } from "types";
 import * as SecureStore from 'expo-secure-store';
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

    console.log("Location ID:", location_id);

    // const location_id = `${latitude.toFixed(4)}_${longitude.toFixed(4)}`;
    // const location_encoded = LocationEncoder[location_id] ?? -1;

    const stat = LocationStats.find((s) => s.location_id === location_id);
    const historical_risk = stat?.historical_risk ?? 0;
  

    return [hour,  now.getDay(),  ((Number(now.getDay())!==0)&&(now.getDay()!==6) ? false : true) ? 1 : 0 ,location_encoded, historical_risk];

  }




// Grid function that will go around the person's location till they find the spot

export async function recursiveRequest(
  latitude: number,
  longitude: number,
  maxTries: number = 40,
  placesTried: Coordinate[] = []
): Promise<Coordinate | Coordinate[]> {
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
  console.log("recursive was called")
  for (const [latOffset, lngOffset] of offsets) {
    const newLat = latitude + latOffset;
    const newLng = longitude + lngOffset;

    // Skip if already tried
    if (placesTried.some(p => p.latitude === newLat && p.longitude === newLng)) {
      continue;
    }
    console.log("lat tried", newLat)

    const features = buildFeatures(newLat, newLng);
    // return {latitude: 0, longitude: 0}
    
    if (features[3] === -1) {
      placesTried.push({ latitude: newLat, longitude: newLng });
      // This would mean they aren't in the area/unapplicable


      if (placesTried.length >= maxTries) {
        return placesTried
      }
      break;
    }


    const prediction = await predictClass(features);
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


export const predictClass = async(features: number[]) => {
    console.log("in the predict class")
  
    // This error is just wrong chat
    const probabilities = await score(features);
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

// Harded that we will save the token at the authToken location
export async function saveAuth(value: string) {
  await SecureStore.setItemAsync('authToken', value);
}


export async function getAuth() {
  let result = await SecureStore.getItemAsync('authToken');

  if (result) {
    return result
  } else {
    return null;
  }
}



  type Headers = {
    "Content-Type": string;
    "Authorization"?: string;
  }
export default async function callApi(
  path: string,
  method: string,
  body: any,
): Promise<any> {
  const endpoint: string = 'https://api.plastuchino.xyz';
  console.log(endpoint);
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  console.log("method", method)

  const authToken = await getAuth();
  console.log("Auth token in callApi", authToken);
  
  if (authToken !== null) {
    headers["Authorization"] = `${authToken}`;
  }

  const bodyString = JSON.stringify(body);
  console.log("Body string in callApi", bodyString);
  try {
    let response: Response;
    if (method.toLowerCase() === "get") {
      response = await fetch(endpoint + path, {
        method: method.toUpperCase(),
        credentials: "include",
        headers: headers,
      });
    } else {
      response = await fetch(endpoint + path, {
        method: method.toUpperCase(),
        credentials: "include",
        headers: headers,
        body: bodyString,
      });
      console.log("Response in callApi", response);
    }
    return response.json();
  } catch (error) {
    throw error;
  }
}



export function isString(str: string, lengthLimit: number = 1000000): boolean {
  for (let i = 0; i < str.length; i++) {
    if (!isNaN(Number(str[i])) && str[i] !== " " && str[i] !== "-") {
      console.log("the character that failed us is,", str[i]);
      return false;
    }
  }

  return str.length < lengthLimit;
}
export function isPassword(password: string): boolean {
    let passedTests = true;
  
    if (password.length < 4) {
      passedTests = false;
    } else if (password.length > 15) {
      passedTests = false;
    }
  
    return passedTests;
  }
  

  export function isEmail(email: string): boolean {
    let passedTests = true;
  
    if (email.split("@").length !== 2) {
      passedTests = false;
    } else if (email.length < 4) {
      passedTests = false;
    } else if (email.length > 40) {
      passedTests = false;
    }
  
    return passedTests;
  }
