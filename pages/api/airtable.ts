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
        Authorization: `Bearer patwUrd1AQcAnyNnW.b4870a1612528d7332a4287212efac9f1bd605d7282a74cad0e28c4bfc9e76de`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        records: [
          {
            fields: {
              First_Name: fname,
              Last_Name: lname,
              Email: email,
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
