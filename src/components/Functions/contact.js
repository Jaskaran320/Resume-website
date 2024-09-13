import { getDatabase, ref, set } from "firebase/database";
import { app } from "../../firebase/client";

async function Contact(name, email, text) {

  const database = getDatabase(app);
  let inputId = name + new Date().getTime();
  await set(ref(database, "users/"+inputId), {
    name: name,
    email: email,
    text: text,
  });
}

export default Contact;