import { child, getDatabase, ref, get, set } from "firebase/database";
import { app, auth } from "../firebase/client";
import { signInAnonymously } from "firebase/auth";
import axios from "axios";

signInAnonymously(auth)

export async function log(ip, browser, platform) {

  const database = getDatabase(app);
  let inputId = ip.toString().replace(/\./g, "");
  let ipRef = ref(database, "ips/" + inputId);

  const apikey = import.meta.env.PUBLIC_GEO;

  const locationSnapshot = await get(child(ipRef, "location"));
  let existingLocation = locationSnapshot.exists() ? locationSnapshot.val() : [];
  let locationString, timeZone, lat, long;
  
  try {
    const locationResponse = await axios.get(
      `https://api.ipgeolocation.io/ipgeo?apiKey=${apikey}&ip=${ip}`
    );
    const city = locationResponse.data.city;
    const country = locationResponse.data.country_name;
    const region = locationResponse.data.state_prov;
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

  await set(ref(database, "ips/" + inputId), {
    ip: ip,
    browser: browser,
    platform: platform,
    timestamps: timestamps,
    location: existingLocation,
    coordinates: {
      lat: lat,
      long: long,
    },
  });
}
