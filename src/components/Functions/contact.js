import { getDatabase, ref, set } from "firebase/database";
import { app } from "../../firebase/client";

const database = getDatabase(app);

function Contact(name, email, text) {
  let inputId = name + new Date().getTime();
  let status = set(ref(database, "users/"+inputId), {
    name: name,
    email: email,
    text: text,
  });
}

export default Contact;