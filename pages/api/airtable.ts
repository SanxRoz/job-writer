import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    fname,
    lname,
    email,
    vibe,
    company,
    sizecompany,
    product,
    whycompany,
    goals,
    benefits,
    workingops,
    jtitle,
    location,
    salary,
    supervisor,
    responsibilities,
    duties,
    experience,
    edurequirements,
    Skills,
  } = req.body as {
    fname: string;
    lname: string;
    email: string;
    vibe: string;
    company: string;
    sizecompany: string;
    product: string;
    whycompany: string;
    goals: string;
    benefits: string;
    workingops: string;
    jtitle: string;
    location: string;
    salary: string;
    supervisor: string;
    responsibilities: string;
    duties: string;
    experience: string;
    edurequirements: string;
    Skills: string;
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
              company: company,
              sizecompany: sizecompany,
              product: product,
              whycompany: whycompany,
              goals: goals,
              benefits: benefits,
              workingops: workingops,
              jtitle: jtitle,
              location: location,
              salary: salary,
              supervisor: supervisor,
              responsibilities: responsibilities,
              duties: duties,
              experience: experience,
              edurequirements: edurequirements,
              Skills: Skills,
            },
          },
        ],
      }),
    }
  );

  const data = await response.json();
  res.status(200).json({ data });
}
