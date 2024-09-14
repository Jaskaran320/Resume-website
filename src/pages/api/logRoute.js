import { log } from "../../components/log";
import axios from "axios";

export const POST = async ({ request }) => {
  try {
    const { ip } = await request.json();

    if (!ip) {
      return new Response(JSON.stringify({ message: "IP address is required" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json"
        }
      });
    }

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