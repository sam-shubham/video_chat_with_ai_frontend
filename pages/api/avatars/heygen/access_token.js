const HEYGEN_API_KEY = process.env.HEYGEN_API_KEY;

import { createRouter, expressWrapper } from "next-connect";
const router = createRouter();
router.get(async (req, res) => {
  try {
    if (!HEYGEN_API_KEY) {
      throw new Error("API key is missing from .env");
    }

    // First, get list of active sessions

    try {
      const listResp = await fetch("https://api.heygen.com/v1/streaming.list", {
        method: "GET",
        headers: {
          "x-api-key": HEYGEN_API_KEY,
          accept: "application/json",
        },
      });
      const sessions = await listResp.json();

      // Close any existing sessions
      if (sessions.data?.sessions?.length > 0) {
        for (const session of sessions.data.sessions) {
          await fetch(
            `https://api.heygen.com/v1/streaming.close?session_id=${session.session_id}`,
            {
              method: "POST",
              headers: {
                "x-api-key": HEYGEN_API_KEY,
              },
            }
          );
        }
      }
    } catch (er) {
      console.log("clearing session error");
    }

    // Create new access token
    const resp = await fetch(
      "https://api.heygen.com/v1/streaming.create_token",
      {
        method: "POST",
        headers: {
          "x-api-key": HEYGEN_API_KEY,
        },
      }
    );
    const data = await resp.json();

    return res.send(data.data.token);
  } catch (error) {
    console.error("Error retrieving access token:", error);
    return res.send({ status: false });
  }
});
export default router.handler({
  onError: (err, req, res) => {
    console.error(err.stack);
    res.status(err.statusCode || 500).end(err.message);
  },
});
