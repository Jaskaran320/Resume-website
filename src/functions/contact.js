import { getDatabase, ref, set } from "firebase/database";
import { app } from "@/firebase/client";

async function Contact(name, email, text) {

  const database = getDatabase(app);
  let inputId = name + new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
  await set(ref(database, "users/" + inputId + "(IST)"), {
    name: name,
    email: email,
    text: text,
  });
}

export default Contact;