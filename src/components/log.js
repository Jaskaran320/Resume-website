import { child, getDatabase, ref, get, set } from "firebase/database";
import { app, auth } from "../firebase/client";
import { signInAnonymously } from "firebase/auth";
import axios from "axios";

signInAnonymously(auth).catch((error) => {
  console.error("Error signing in anonymously:", error);
});

export async function log(ip) {

  const database = getDatabase(app);
  let inputId = ip.toString().replace(/\./g, "");
  let ipRef = ref(database, "ips/" + inputId);

  const apikey = import.meta.env.PUBLIC_GEO;
  var locationString;
  
  try {
    const location = await axios.get(
      `https://api.ipgeolocation.io/ipgeo?apiKey=${apikey}&ip=${ip}`
    );
    const city = location.data.city;
    const country = location.data.country_name;
    const region = location.data.state_prov;
    locationString = `${city}, ${region}, ${country}`;
  } catch (error) {
    locationString = "Location not found";
  }

  const snapshot = await get(child(ipRef, "timestamps"));
  let timestamps = snapshot.exists() ? snapshot.val() : [];
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
  timestamps.push(formattedTimestamp);

  await set(ref(database, "ips/" + inputId), {
    ip: ip,
    timestamps: timestamps,
    location: locationString,
  });
}
