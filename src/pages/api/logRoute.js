import { log } from "../../components/log";
import axios from "axios";

export const GET = async ({ request }) => {
  try {
    const ipResponse = await axios.get("https://api.ipify.org?format=json");
    const ip = ipResponse.data.ip;

    await log(ip);

    return new Response(JSON.stringify({ message: "done" }), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
};