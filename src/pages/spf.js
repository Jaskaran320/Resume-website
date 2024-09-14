import { log } from "../components/log";

function matchBrowserName(secChUa, allBrowserList) {
  function extractQuotedValues(str) {
    const regex = /"([^"]*)"/g;
    const matches = str.match(regex);
    return matches ? matches.map(match => match.slice(1, -1)) : [];
  }

  const cleanedList = extractQuotedValues(secChUa);

  function containsBrowser(str) {
    return allBrowserList.find(browser => str.includes(browser));
  }

  const matchedBrowser = cleanedList.find(containsBrowser);

  if (matchedBrowser) {
    return allBrowserList.find(browser => matchedBrowser.includes(browser));
  }

  return 'Unknown';
}

export const POST = async ({ request }) => {
  try {
    const forwardedIp = request.headers.get('X-Forwarded-For');
    const secCh = request.headers.get('Sec-Ch-Ua');
    const platform = request.headers.get('Sec-Ch-Ua-Platform');

    const ip = forwardedIp.split(',')[0].trim();
    if (!ip) {
      return new Response(null, {
        status: 400,
        headers: {
          "Content-Type": "application/json"
        }
      });
    }

    let browserName = "Unknown";
    let allBrowserList = ["Chrome", "Edge","Opera GX", "Opera", "Brave", "Firefox"];

    const trimmedPlatform = platform.replace(/"/g, '').trim();
    if (trimmedPlatform === "Windows") {
      browserName = matchBrowserName(secCh, allBrowserList);
    }

    await log(ip, browserName, trimmedPlatform);

    return new Response(null, {
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