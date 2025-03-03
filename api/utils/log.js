import { getDatabase, ref, get, set, child } from "firebase/database";
import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously } from "firebase/auth";
import axios from "axios";

const firebaseConfig = {
  apiKey: process.env.VITE_FIRE,
  authDomain: "resume-website-457ee.firebaseapp.com",
  databaseURL: "https://resume-website-457ee-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "resume-website-457ee",
  storageBucket: "resume-website-457ee.appspot.com",
  messagingSenderId: "91412892308",
  appId: "1:91412892308:web:1b60ae6fd77c8cd1510281",
  measurementId: "G-081FR0B9B4"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

signInAnonymously(auth)

export async function log(ip, browser, platform) {

  const database = getDatabase(app);
  let inputId = ip.toString().replace(/\./g, "");
  let ipRef = ref(database, "ips/" + inputId);

  const apikey = import.meta.env.VITE_GEO;

  const locationSnapshot = await get(child(ipRef, "location"));
  let existingLocation = locationSnapshot.exists() ? locationSnapshot.val() : [];
  let locationString, timeZone, lat, long, city;
  
  try {
    const locationResponse = await axios.get(
      `https://api.ipgeolocation.io/ipgeo?apiKey=${apikey}&ip=${ip}`
    );
    const country = locationResponse.data.country_name;
    const region = locationResponse.data.state_prov;
    city = locationResponse.data.city;
    timeZone = locationResponse.data.time_zone.name;
    lat = locationResponse.data.latitude;
    long = locationResponse.data.longitude;
    locationString = `${city}, ${region}, ${country}`;
  } catch (error) {
    locationString = "Location not found";
  }

  if (!existingLocation.includes(locationString)) {
    existingLocation.push(locationString);
  }

  const timeSnapshot = await get(child(ipRef, "timestamps"));
  let timestamps = timeSnapshot.exists() ? timeSnapshot.val() : [];
  const browserSnapshot = await get(child(ipRef, "browser"));
  let existingBrowser = browserSnapshot.exists() ? browserSnapshot.val() : [];
  const platformSnapshot = await get(child(ipRef, "platform"));
  let existingPlatform = platformSnapshot.exists() ? platformSnapshot.val() : [];

  const formattedTimestamp = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
  const formattedOriginal = new Date().toLocaleString("en-IN", {
    timeZone: timeZone,
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
  timestamps.push(`${formattedTimestamp} (IST) / ${formattedOriginal} (${timeZone})`);
  existingBrowser.push(browser);
  existingPlatform.push(platform);

  await set(ref(database, "ips/" + inputId), {
    ip: ip,
    browser: existingBrowser,
    platform: existingPlatform,
    timestamps: timestamps,
    location: existingLocation,
    coordinates: {
      lat: lat,
      long: long,
    },
  });
}
