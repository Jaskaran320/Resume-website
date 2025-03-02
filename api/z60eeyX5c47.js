import { log } from "../src/functions/log";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  try {
    const forwardedIp = req.headers.get("X-Forwarded-For");
    const secCh = req.headers.get("Sec-Ch-Ua");
    const platform = req.headers.get("Sec-Ch-Ua-Platform");

    const ip = forwardedIp.split(",")[0].trim();
    if (!ip) {
      return res.status(400).end();
    }

    let browserName = "Unknown";
    const trimmedPlatform = platform.replace(/"/g, "").trim();
    let allBrowserList = [
      "Chrome Android",
      "Chrome Mobile",
      "Chrome",
      "Opera Android",
      "Opera Mobile",
      "Opera GX",
      "Opera",
      "Edge",
      "Brave",
      "Firefox",
      "Firefox Android",
      "Safari",
      "Mobile Safari",
      "Samsung Internet",
    ];

    if (secCh) {
      function matchBrowserName(secChUa, allBrowserList) {
        function extractQuotedValues(str) {
          const regex = /"([^"]*)"/g;
          const matches = str.match(regex);
          return matches ? matches.map((match) => match.slice(1, -1)) : [];
        }
      
        const cleanedList = extractQuotedValues(secChUa);
      
        function containsBrowser(str) {
          return allBrowserList.find((browser) => str.includes(browser));
        }
      
        const matchedBrowser = cleanedList.find(containsBrowser);
      
        if (matchedBrowser) {
          return allBrowserList.find((browser) => matchedBrowser.includes(browser));
        }
      
        return "Unknown";
      }
      browserName = matchBrowserName(secCh, allBrowserList);
    }

    await log(ip, browserName, trimmedPlatform);
    
    return res.status(200).end();
  } catch (error) {
    console.error("Error logging visitor:", error);
    return res.status(500).end();
  }
}