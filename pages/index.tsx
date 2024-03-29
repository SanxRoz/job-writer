import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRef, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import DropDown, { VibeType } from "../components/DropDown";
import LoadingDots from "../components/LoadingDots";
import ReactMarkdown from "react-markdown";

const Home: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [sizecompany, setSizecompany] = useState("");
  const [product, setProduct] = useState("");
  const [whycompany, setWhycompany] = useState("");
  const [goals, setGoals] = useState("");
  const [benefits, setBenefits] = useState("");
  const [workingops, setWorkingops] = useState("");
  const [jtitle, setJtitle] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [supervisor, setSupervisor] = useState("");
  const [responsibilities, setResponsibilities] = useState("");
  const [duties, setDuties] = useState("");
  const [experience, setExperience] = useState("");
  const [edurequirements, setEdurequirements] = useState("");
  const [Skills, setSkills] = useState("");

  const [vibe, setVibe] = useState<VibeType>(
    "Choose the industry do you work in"
  );
  const [generatedBios, setGeneratedBios] = useState<String>("");

  const bioRef = useRef<null | HTMLDivElement>(null);

  const scrollToBios = () => {
    if (bioRef.current !== null) {
      bioRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const prompt = `Company Name ${company}, size company ${sizecompany},
  main product or service ${product}, why work in the company ${whycompany}, goals ${goals}, benefits ${benefits},
  working options ${workingops},Job Title ${jtitle},location ${location}, salary range ${salary}, supervisor ${supervisor},main responsibilities ${responsibilities},
  key duties ${duties}, experience of candidate ${experience},Education requirements candidate ${edurequirements}, key Skills candidate ${Skills}`;

  const generateBio = async (e: any) => {
    e.preventDefault();
    setGeneratedBios("");
    setLoading(true);

    if (
      !fname ||
      !lname ||
      !email ||
      !company ||
      !sizecompany ||
      !product ||
      !whycompany ||
      !goals ||
      !benefits ||
      !workingops ||
      !jtitle ||
      !location ||
      !supervisor ||
      !responsibilities ||
      !duties ||
      !experience ||
      !edurequirements ||
      !Skills
    ) {
      toast("Please fill in all the fields", {
        style: {
          backgroundColor: "#e11d48",
          color: "white",
        },
      });
      setLoading(false);
      return;
    }

    try {
      const airtableResponse = await fetch("/api/airtable", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
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
        }),
      });
      const airtableData = await airtableResponse.json();
      console.log(airtableData);
    } catch (error) {
      console.error(error);
    }

    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
      }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = response.body;
    if (!data) {
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      console.log(chunkValue);
      setGeneratedBios((prev) => prev + chunkValue);
    }
    scrollToBios();
    // Send data to Airtabl
    setLoading(false);
  };

  return (
    <div className="flex max-w-5xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
      <Head>
        <title>Job Writer</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </Head>

      <main className="flex flex-col items-center px-[1rem] bg-[#333] w-full max-w-3xl border border-[#ffffff1a] rounded-xl my-8 mx-auto py-12">
        <div className="gap-x-[10px] justify-center flex">
          <Image
            src="https://uploads-ssl.webflow.com/640a5eb26ecc85046e9284c6/64596599870b9b0eaffe8906_64414a8ada48010faa6730e3_Group%201.svg"
            width={300}
            height={50}
            alt="Job Writer Icon"
          />
        </div>
        <p className="text-ctext mt-5 text-center text-[1.3rem]">
          Use AI to write the best job ads!
        </p>
        <div className="max-w-xl w-full">
          <div className="flex flex-col mt-[4rem] items-center space-x-3">
            <p className="text-center font-bold font-bold text-[1.5rem] w-full text-ctext">
              Tell us about you
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
            <div className="md:col-span-1 col-span-2">
              <p className="text-left text-ctext font-semibold mb-2 text-base leading-6">
                First Name *
              </p>
              <input
                value={fname}
                onChange={(e) => setFname(e.target.value)}
                className="w-full focus:ring-[#2378d1] focus:outline-none focus:ring-4 min-h-[2.75rem] text-[#eee] placeholder:text-[#ffffff66] text-gray-300 tracking-wider bg-back border border-0 rounded-lg mb-0 py-2 px-3 text-sm leading-6 transition duration-300 shadow-sm"
                placeholder={"First name"}
                required
              />
            </div>
            <div className="md:col-span-1 col-span-2">
              <p className="text-left text-ctext font-semibold mb-2 text-base leading-6">
                Last Name *
              </p>
              <input
                value={lname}
                onChange={(e) => setLname(e.target.value)}
                className="w-full focus:ring-[#2378d1] focus:outline-none focus:ring-4 min-h-[2.75rem] text-[#eee] placeholder:text-[#ffffff66] text-gray-300 tracking-wider bg-back border border-0 rounded-lg mb-0 py-2 px-3 text-sm leading-6 transition duration-300 shadow-sm"
                placeholder={"Last name"}
                required
              />
            </div>
            <div className="col-span-2">
              <p className="text-left text-ctext font-semibold mb-2 text-base leading-6">
                Email Address *
              </p>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full focus:ring-[#2378d1] focus:outline-none focus:ring-4 min-h-[2.75rem] text-[#eee] placeholder:text-[#ffffff66] text-gray-300 tracking-wider bg-back border border-0 rounded-lg mb-0 py-2 px-3 text-sm leading-6 transition duration-300 shadow-sm"
                placeholder={"Email address"}
                required
              />
            </div>
            <div className="col-span-2">
              <p className="text-left text-ctext font-semibold mb-2 text-base leading-6">
                What industry do you work in?
              </p>
              <DropDown vibe={vibe} setVibe={(newVibe) => setVibe(newVibe)} />
            </div>
          </div>
          <div className="flex flex-col mt-[4rem] items-center space-x-3">
            <p className="text-center font-bold font-bold text-[1.5rem] w-full text-ctext">
              About your company
            </p>
            <p className="text-center mb-[1.4rem] text-base w-full text-ctext">
              The more information you give the better the job ad!
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
            <div className="col-span-1 md:col-span-2">
              <p className="text-left text-ctext font-semibold mb-2 text-base leading-6">
                Company Name *
              </p>
              <input
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full focus:ring-[#2378d1] focus:outline-none focus:ring-4 min-h-[2.75rem] text-[#eee] placeholder:text-[#ffffff66] text-gray-300 tracking-wider bg-back border border-0 rounded-lg mb-0 py-2 px-3 text-sm leading-6 transition duration-300 shadow-sm"
                placeholder={"Company name"}
                required
              />
            </div>
            <div>
              <p className="text-left text-ctext font-semibold mb-2 text-base leading-6">
                How big it is? *
              </p>
              <input
                value={sizecompany}
                onChange={(e) => setSizecompany(e.target.value)}
                className="w-full focus:ring-[#2378d1] focus:outline-none focus:ring-4 min-h-[2.75rem] text-[#eee] placeholder:text-[#ffffff66] text-gray-300 tracking-wider bg-back border border-0 rounded-lg mb-0 py-2 px-3 text-sm leading-6 transition duration-300 shadow-sm"
                placeholder={"Number employees"}
                required
              />
            </div>
            <div>
              <p className="text-left text-ctext font-semibold mb-2 text-base leading-6">
                What's your product/service? *
              </p>
              <input
                value={product}
                onChange={(e) => setProduct(e.target.value)}
                className="w-full focus:ring-[#2378d1] focus:outline-none focus:ring-4 min-h-[2.75rem] text-[#eee] placeholder:text-[#ffffff66] text-gray-300 tracking-wider bg-back border border-0 rounded-lg mb-0 py-2 px-3 text-sm leading-6 transition duration-300 shadow-sm"
                placeholder={"Main product"}
                required
              />
            </div>
            <div className="col-span-1 md:col-span-2">
              <p className="text-left col-start-1 col-end-2 text-ctext font-semibold mb-2 text-base leading-6">
                What makes your company a fantastic place to work? *
              </p>
              <textarea
                value={whycompany}
                onChange={(e) => setWhycompany(e.target.value)}
                rows={4}
                className="w-full min-h-22 focus:ring-[#2378d1] focus:outline-none focus:ring-4 text-[#eee] placeholder:text-[#ffffff66] text-gray-300 tracking-wider bg-back border border-0 rounded-lg mb-0 py-2 px-3 text-sm leading-6 transition duration-300 shadow-sm"
                placeholder={"Is the best place to work because..."}
                required
              />
            </div>
            <div className="col-span-1 md:col-span-2">
              <p className="text-left text-ctext font-semibold mb-2 text-base leading-6">
                What are your company's goals *
              </p>
              <textarea
                value={goals}
                onChange={(e) => setGoals(e.target.value)}
                rows={4}
                className="w-full focus:ring-[#2378d1] focus:outline-none focus:ring-4 min-h-[2.75rem] text-[#eee] placeholder:text-[#ffffff66] text-gray-300 tracking-wider bg-back border border-0 rounded-lg mb-0 py-2 px-3 text-sm leading-6 transition duration-300 shadow-sm"
                placeholder={"Goals"}
                required
              />
            </div>
            <div>
              <p className="text-left text-ctext font-semibold mb-2 text-base leading-6">
                Any special benefits? *
              </p>
              <textarea
                value={benefits}
                onChange={(e) => setBenefits(e.target.value)}
                className="w-full focus:ring-[#2378d1] focus:outline-none focus:ring-4 min-h-[2.75rem] text-[#eee] placeholder:text-[#ffffff66] text-gray-300 tracking-wider bg-back border border-0 rounded-lg mb-0 py-2 px-3 text-sm leading-6 transition duration-300 shadow-sm"
                placeholder={"Benefits"}
                required
              />
            </div>
            <div>
              <p className="text-left text-ctext font-semibold mb-2 text-base leading-6">
                Flexible working options *
              </p>
              <textarea
                value={workingops}
                onChange={(e) => setWorkingops(e.target.value)}
                className="w-full focus:ring-[#2378d1] focus:outline-none focus:ring-4 min-h-[2.75rem] text-[#eee] placeholder:text-[#ffffff66] text-gray-300 tracking-wider bg-back border border-0 rounded-lg mb-0 py-2 px-3 text-sm leading-6 transition duration-300 shadow-sm"
                placeholder={"Work type"}
                required
              />
            </div>
          </div>
          <div className="flex flex-col mt-[4rem] items-center space-x-3">
            <p className="text-center font-bold font-bold text-[1.5rem] w-full text-ctext">
              About the Role
            </p>
            <p className="text-center mb-[1.4rem] text-base w-full text-ctext">
              What your role is unique?
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
            <div className="col-span-1 md:col-span-2">
              <p className="text-left text-ctext font-semibold mb-2 text-base leading-6">
                Job Title *
              </p>
              <input
                value={jtitle}
                onChange={(e) => setJtitle(e.target.value)}
                className="w-full focus:ring-[#2378d1] focus:outline-none focus:ring-4 min-h-[2.75rem] text-[#eee] placeholder:text-[#ffffff66] text-gray-300 tracking-wider bg-back border border-0 rounded-lg mb-0 py-2 px-3 text-sm leading-6 transition duration-300 shadow-sm"
                placeholder={"Job title"}
                required
              />
            </div>
            <div>
              <p className="text-left text-ctext font-semibold mb-2 text-base leading-6">
                Where is located? *
              </p>
              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full focus:ring-[#2378d1] focus:outline-none focus:ring-4 min-h-[2.75rem] text-[#eee] placeholder:text-[#ffffff66] text-gray-300 tracking-wider bg-back border border-0 rounded-lg mb-0 py-2 px-3 text-sm leading-6 transition duration-300 shadow-sm"
                placeholder={"Location"}
                required
              />
            </div>

            <div>
              <p className="text-left text-ctext font-semibold mb-2 text-base leading-6">
                Who is the supervisor? *
              </p>
              <input
                value={supervisor}
                onChange={(e) => setSupervisor(e.target.value)}
                className="w-full focus:ring-[#2378d1] focus:outline-none focus:ring-4 min-h-[2.75rem] text-[#eee] placeholder:text-[#ffffff66] text-gray-300 tracking-wider bg-back border border-0 rounded-lg mb-0 py-2 px-3 text-sm leading-6 transition duration-300 shadow-sm"
                placeholder={"Supervisor"}
                required
              />
            </div>
            <div className="col-span-1 md:col-span-2">
              <p className="text-left text-ctext font-semibold mb-2 text-base leading-6">
                Salary range
              </p>
              <input
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                className="w-full focus:ring-[#2378d1] focus:outline-none focus:ring-4 min-h-[2.75rem] text-[#eee] placeholder:text-[#ffffff66] text-gray-300 tracking-wider bg-back border border-0 rounded-lg mb-0 py-2 px-3 text-sm leading-6 transition duration-300 shadow-sm"
                placeholder={"Salary"}
                required
              />
            </div>
            <div className="col-span-1 md:col-span-2">
              <p className="text-left col-start-1 col-end-2 text-ctext font-semibold mb-2 text-base leading-6">
                Key responsibilities *
              </p>
              <textarea
                value={responsibilities}
                onChange={(e) => setResponsibilities(e.target.value)}
                rows={4}
                className="w-full min-h-22 focus:ring-[#2378d1] focus:outline-none focus:ring-4 text-[#eee] placeholder:text-[#ffffff66] text-gray-300 tracking-wider bg-back border border-0 rounded-lg mb-0 py-2 px-3 text-sm leading-6 transition duration-300 shadow-sm"
                placeholder={"4 - 5 responsibilities"}
                required
              />
            </div>
            <div className="col-span-1 md:col-span-2">
              <p className="text-left col-start-1 col-end-2 text-ctext font-semibold mb-2 text-base leading-6">
                Key Duties *
              </p>
              <textarea
                value={duties}
                onChange={(e) => setDuties(e.target.value)}
                rows={4}
                className="w-full min-h-22 focus:ring-[#2378d1] focus:outline-none focus:ring-4 text-[#eee] placeholder:text-[#ffffff66] text-gray-300 tracking-wider bg-back border border-0 rounded-lg mb-0 py-2 px-3 text-sm leading-6 transition duration-300 shadow-sm"
                placeholder={"4 - 5 duties"}
                required
              />
            </div>
          </div>
          <div className="flex flex-col mt-[4rem] items-center space-x-3">
            <p className="text-center font-bold font-bold text-[1.5rem] w-full text-ctext">
              About the Candidate
            </p>
            <p className="text-center mb-[1.4rem] text-base w-full text-ctext">
              What will make candidates get the job?
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
            <div className="col-span-1 md:col-span-2">
              <p className="text-left text-ctext font-semibold mb-2 text-base leading-6">
                How much experience? *
              </p>
              <input
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="w-full focus:ring-[#2378d1] focus:outline-none focus:ring-4 min-h-[2.75rem] text-[#eee] placeholder:text-[#ffffff66] text-gray-300 tracking-wider bg-back border border-0 rounded-lg mb-0 py-2 px-3 text-sm leading-6 transition duration-300 shadow-sm"
                placeholder={"Candidate experience"}
                required
              />
            </div>
            <div className="col-span-1 md:col-span-2">
              <p className="text-left col-start-1 col-end-2 text-ctext font-semibold mb-2 text-base leading-6">
                Education requirements *
              </p>
              <textarea
                value={edurequirements}
                onChange={(e) => setEdurequirements(e.target.value)}
                rows={4}
                className="w-full min-h-22 focus:ring-[#2378d1] focus:outline-none focus:ring-4 text-[#eee] placeholder:text-[#ffffff66] text-gray-300 tracking-wider bg-back border border-0 rounded-lg mb-0 py-2 px-3 text-sm leading-6 transition duration-300 shadow-sm"
                placeholder={"Education requirements"}
                required
              />
            </div>
            <div className="col-span-1 md:col-span-2">
              <p className="text-left col-start-1 col-end-2 text-ctext font-semibold mb-2 text-base leading-6">
                Key Skills *
              </p>
              <textarea
                value={Skills}
                onChange={(e) => setSkills(e.target.value)}
                rows={4}
                className="w-full min-h-22 focus:ring-[#2378d1] focus:outline-none focus:ring-4 text-[#eee] placeholder:text-[#ffffff66] text-gray-300 tracking-wider bg-back border border-0 rounded-lg mb-0 py-2 px-3 text-sm leading-6 transition duration-300 shadow-sm"
                placeholder={"Key Skills"}
                required
              />
            </div>
          </div>

          {!loading && (
            <div className="sm:mt-10 mt-8">
              <p className="text-base text-ctext font-medium leading-6">
                By clicking the create button, you agree with our friendly -
                <a
                  style={{ textDecoration: "underline" }}
                  target="_blank"
                  href="https://workdrive.zohoexternal.com/file/kadq531e2e42276cb4350b037965a6cfc3488"
                >
                  privacy policy
                </a>
                .
              </p>
              <button
                className="bg-[#2378d1] mt-2 rounded-lg text-ctext font-semibold px-[1.125rem] py-[0.625rem] w-full"
                onClick={(e) => generateBio(e)}
              >
                Create
              </button>
            </div>
          )}
          {loading && (
            <button
              className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full"
              disabled
            >
              <LoadingDots color="white" style="large" />
            </button>
          )}
        </div>
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{ duration: 2000 }}
        />
        <hr className="h-px bg-gray-700 border-1 dark:bg-gray-700" />
        <div className="space-y-10 my-10">
          {generatedBios && (
            <>
              <div></div>
              <div className="space-y-8 flex flex-col items-center justify-center max-w-xl mx-auto">
                <div
                  className="relative prose prose-sm rounded-xl p-4 text-ctext hover:bg-gray-100 transition cursor-copy border-0"
                  onClick={() => {
                    navigator.clipboard.writeText(generatedBios.toString());
                    toast("Bio copied to clipboard");
                  }}
                >
                  <button
                    className="absolute bg-[#2378d1] rounded-xl text-white font-medium px-4 py-2 right-0 top-[-10px]"
                    onClick={() => {
                      navigator.clipboard.writeText(generatedBios.toString());
                      toast("Bio copied to clipboard");
                    }}
                  >
                    Copy
                  </button>
                  <ReactMarkdown>{generatedBios.toString()}</ReactMarkdown>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;
