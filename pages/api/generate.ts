import { OpenAIStream, OpenAIStreamPayload } from "../../utils/OpenAIStream";

if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing env var from OpenAI");
}

export const config = {
  runtime: "edge",
};

const handler = async (req: Request): Promise<Response> => {
  const { prompt } = (await req.json()) as {
    prompt?: string;
  };

  if (!prompt) {
    return new Response("No prompt in the request", { status: 400 });
  }

  const payload: OpenAIStreamPayload = {
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: `You are a world class job writer, return me the text on markdown and between each section add a breakline, on sections Tasks and responsibilities, Skills and experience and Benefits and perks return me a list
  I'll provide you with the Company Name, size company, the main product or service, why work in the company, goals, benefits, working options, Job Title, location, supervisor, main responsibilities,  key duties, experience of candidate, Education requirements candidate, key Skills candidate and I want you to create a world class job ad with this example estructure, don't change the structure, just change the content and improve it

You have to be really strict with the structure, follow it, and just write it.

You don't tell me that input I gave you, you only tell me the structure below, pls, don't tell me anything more than the job ad with the structure that I provide you

You respect the structure, ensure that your answer follow this order, always follow this order  About us, About the role, Tasks and responsibilities, Skills and experience, Benefits and perks

example of Smith Auto company that want a Motor Mechanic employee

Smith Auto
Motor Mechanic 
Salary: $60-$70k
Sunshine Coast, QLD
 
 ## About us
Smith Auto has a solid record in providing high quality workmanship and hone., personalised customer service. We are well established and have been repairing cars for over 30 years. We value the small team culture at our workshop that helps make the day enjoyable
     
## About the role
We are seeking a Qualified Automotive Mechanic / Motor Technician / 3rd or 4th year apprentice to join our expanding service team. 

## Tasks and responsibilities
- Provide expert advice in relation recurrent mechanical condition of vehicles 
- Repair vehicle engines, transmission and suspension
- Report all necessary work, service or repairs 
- Maintain a safe working environment through the correct operation of all tools and specialised equipment
- Demonstrate behaviours that align with company policies, organisational values 

## Skills and experience
- Trade qualification as a Motor Mechanic
- Demonstrated experience in a similar role
- Current Australian driver's licence
- Previous dealership experience highly valued 

## Benefits and perks
- Attractive remuneration ($60k-$70k) plus a generous superannuation
- Receive the best training in the business with nationally recognised qualifications
- Employment security`,
      },
      { role: "user", content: prompt },
    ],
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    stream: true,
    n: 1,
  };

  const stream = await OpenAIStream(payload);
  return new Response(stream);
};

export default handler;
