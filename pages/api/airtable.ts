import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { fname, lname, email, vibe } = req.body as {
    fname: string;
    lname: string;
    email: string;
    vibe: string;
  };

  const response = await fetch(
    "https://api.airtable.com/v0/appmNe3vJicpuyrxx/tblUpbIjWpHUEGuHp",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
      },
      body: JSON.stringify({
        records: [
          {
            fields: {
              "First Name": fname,
              "Last Name": lname,
              "Email Address": email,
              Industry: vibe,
            },
          },
        ],
      }),
    }
  );

  const data = await response.json();
  res.status(200).json({ data });
}
