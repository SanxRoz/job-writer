import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRef, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import DropDown, { VibeType } from "../components/DropDown";
import LoadingDots from "../components/LoadingDots";

const Home: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [bio, setBio] = useState("");
  const [company, setCompany] = useState("");
  const [job, setJob] = useState("");
  const [type, setType] = useState("");
  const [salary, setSalary] = useState("");
  const [hours, setHours] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [responsibilities, setResponsibilities] = useState("");
  const [skills, setSkills] = useState("");
  const [vibe, setVibe] = useState<VibeType>("United States");
  const [generatedBios, setGeneratedBios] = useState<String>("");

  const bioRef = useRef<null | HTMLDivElement>(null);

  const scrollToBios = () => {
    if (bioRef.current !== null) {
      bioRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const prompt = `Generate 2 ${vibe} twitter biographies with no hashtags and clearly labeled "1." and "2.". ${
    vibe === "United States"
      ? "Make sure there is a joke in there and it's a little ridiculous."
      : null
  }
      Make sure each generated biography is less than 160 characters, has short sentences that are found in Twitter bios, and base them on this context: ${bio}${
    bio.slice(-1) === "." ? "" : "."
  }`;

  const generateBio = async (e: any) => {
    e.preventDefault();
    setGeneratedBios("");
    setLoading(true);
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

    // This data is a ReadableStream
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
      setGeneratedBios((prev) => prev + chunkValue);
    }
    scrollToBios();
    setLoading(false);
  };

  return (
    <div className="flex max-w-5xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
      <Head>
        <title>Job Writer</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </Head>

      <main className="flex flex-col items-center px-[1rem] bg-[#333] w-full max-w-3xl border border-[#ffffff1a] rounded-xl my-8 mx-auto py-12">
        <div className="gap-x-[10px] justify-center flex">
          <Image
            src="https://uploads-ssl.webflow.com/641f5b3c6bd09b2e785d7f0c/642252d40d413e582b984510_8811704.svg"
            width={50}
            height={50}
            alt="Job Writer Icon"
          />
          <h1 className="sm:text-5xl text-4xl max-w-[708px] font-bold text-ctext">
            Job Writer
          </h1>
        </div>
        <p className="text-ctext mt-5 text-center text-[1.3rem]">
          Build the perfect job ad for your business with AI!
        </p>
        <div className="max-w-xl w-full">
          <div className="flex mt-[4rem] items-center space-x-3">
            <p className="text-center font-bold mb-[1.4rem] font-bold text-[1.5rem] w-full text-ctext">
              Enter your details
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
            <div>
              <p className="text-left text-ctext font-semibold mb-2 text-lg leading-6">
                First Name
              </p>
              <input
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full focus:ring-[#f4ebff] focus:ring-4 min-h-[2.75rem] text-[#eee] placeholder:text-[#ffffffcc] text-gray-300 tracking-wider bg-back border border-0 rounded-lg mb-0 py-2 px-3 text-sm leading-6 transition duration-300 shadow-sm"
                placeholder={"First Name"}
              />
            </div>
            <div>
              <p className="text-left text-ctext font-semibold mb-2 text-lg leading-6">
                Last Name
              </p>
              <input
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full focus:ring-[#f4ebff] focus:ring-4 min-h-[2.75rem] text-[#eee] placeholder:text-[#ffffffcc] text-gray-300 tracking-wider bg-back border border-0 rounded-lg mb-0 py-2 px-3 text-sm leading-6 transition duration-300 shadow-sm"
                placeholder={"Last Name"}
              />
            </div>
            <div>
              <p className="text-left text-ctext font-semibold mb-2 text-lg leading-6">
                Email Address
              </p>
              <input
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full focus:ring-[#f4ebff] focus:ring-4 min-h-[2.75rem] text-[#eee] placeholder:text-[#ffffffcc] text-gray-300 tracking-wider bg-back border border-0 rounded-lg mb-0 py-2 px-3 text-sm leading-6 transition duration-300 shadow-sm"
                placeholder={"Email Address"}
              />
            </div>
            <div>
              <p className="text-left text-ctext font-semibold mb-2 text-lg leading-6">
                Location
              </p>
              <DropDown vibe={vibe} setVibe={(newVibe) => setVibe(newVibe)} />
            </div>
          </div>
          <div className="flex mt-[4rem] items-center space-x-3">
            <p className="text-center font-bold mb-[1.4rem] font-bold text-[1.5rem] w-full text-ctext">
              About the company
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
            <div>
              <p className="text-left text-ctext font-semibold mb-2 text-lg leading-6">
                Company Name*
              </p>
              <input
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full focus:ring-[#f4ebff] focus:ring-4 min-h-[2.75rem] text-[#eee] placeholder:text-[#ffffffcc] text-gray-300 tracking-wider bg-back border border-0 rounded-lg mb-0 py-2 px-3 text-sm leading-6 transition duration-300 shadow-sm"
                placeholder={"Company Name"}
              />
            </div>
            <div>
              <p className="text-left text-ctext font-semibold mb-2 text-lg leading-6">
                Job Tittle
              </p>
              <input
                value={job}
                onChange={(e) => setJob(e.target.value)}
                className="w-full focus:ring-[#f4ebff] focus:ring-4 min-h-[2.75rem] text-[#eee] placeholder:text-[#ffffffcc] text-gray-300 tracking-wider bg-back border border-0 rounded-lg mb-0 py-2 px-3 text-sm leading-6 transition duration-300 shadow-sm"
                placeholder={"Job Tittle"}
              />
            </div>
            <div>
              <p className="text-left text-ctext font-semibold mb-2 text-lg leading-6">
                Work Type
              </p>
              <input
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full focus:ring-[#f4ebff] focus:ring-4 min-h-[2.75rem] text-[#eee] placeholder:text-[#ffffffcc] text-gray-300 tracking-wider bg-back border border-0 rounded-lg mb-0 py-2 px-3 text-sm leading-6 transition duration-300 shadow-sm"
                placeholder={"Work Type"}
              />
            </div>
            <div>
              <p className="text-left text-ctext font-semibold mb-2 text-lg leading-6">
                Salary Range
              </p>
              <input
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                className="w-full focus:ring-[#f4ebff] focus:ring-4 min-h-[2.75rem] text-[#eee] placeholder:text-[#ffffffcc] text-gray-300 tracking-wider bg-back border border-0 rounded-lg mb-0 py-2 px-3 text-sm leading-6 transition duration-300 shadow-sm"
                placeholder={"Salary Range"}
              />
            </div>
            <div>
              <p className="text-left text-ctext font-semibold mb-2 text-lg leading-6">
                Hours per week
              </p>
              <input
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                className="w-full focus:ring-[#f4ebff] focus:ring-4 min-h-[2.75rem] text-[#eee] placeholder:text-[#ffffffcc] text-gray-300 tracking-wider bg-back border border-0 rounded-lg mb-0 py-2 px-3 text-sm leading-6 transition duration-300 shadow-sm"
                placeholder={"Hours per week"}
              />
            </div>
            <div>
              <p className="text-left text-ctext font-semibold mb-2 text-lg leading-6">
                Country
              </p>
              <input
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full focus:ring-[#f4ebff] focus:ring-4 min-h-[2.75rem] text-[#eee] placeholder:text-[#ffffffcc] text-gray-300 tracking-wider bg-back border border-0 rounded-lg mb-0 py-2 px-3 text-sm leading-6 transition duration-300 shadow-sm"
                placeholder={"Country"}
              />
            </div>
            <div>
              <p className="text-left text-ctext font-semibold mb-2 text-lg leading-6">
                State
              </p>
              <input
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full focus:ring-[#f4ebff] focus:ring-4 min-h-[2.75rem] text-[#eee] placeholder:text-[#ffffffcc] text-gray-300 tracking-wider bg-back border border-0 rounded-lg mb-0 py-2 px-3 text-sm leading-6 transition duration-300 shadow-sm"
                placeholder={"State"}
              />
            </div>
            <div>
              <p className="text-left text-ctext font-semibold mb-2 text-lg leading-6">
                City/town
              </p>
              <input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full focus:ring-[#f4ebff] focus:ring-4 min-h-[2.75rem] text-[#eee] placeholder:text-[#ffffffcc] text-gray-300 tracking-wider bg-back border border-0 rounded-lg mb-0 py-2 px-3 text-sm leading-6 transition duration-300 shadow-sm"
                placeholder={"City/town"}
              />
            </div>
            <div className="col-span-1 md:col-span-2">
              <p className="text-left col-start-1 col-end-2 text-ctext font-semibold mb-2 text-lg leading-6">
                Key Responsibilities
              </p>
              <textarea
                value={responsibilities}
                onChange={(e) => setResponsibilities(e.target.value)}
                rows={4}
                className="w-full min-h-22 focus:ring-[#f4ebff] focus:ring-4 text-[#eee] placeholder:text-[#ffffffcc] text-gray-300 tracking-wider bg-back border border-0 rounded-lg mb-0 py-2 px-3 text-sm leading-6 transition duration-300 shadow-sm"
                placeholder={"Key Responsibilities"}
              />
            </div>
            <div className="col-span-1 md:col-span-2">
              <p className="text-left text-ctext font-semibold mb-2 text-lg leading-6">
                Skills Requirements
              </p>
              <textarea
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                rows={4}
                className="w-full min-h-22 focus:ring-[#f4ebff] focus:ring-4 text-[#eee] placeholder:text-[#ffffffcc] text-gray-300 tracking-wider bg-back border border-0 rounded-lg mb-0 py-2 px-3 text-sm leading-6 transition duration-300 shadow-sm"
                placeholder={"Skills Requirements"}
              />
            </div>
          </div>

          {!loading && (
            <button
              className="bg-[#2378d1] rounded-lg text-ctext font-semibold px-[1.125rem] py-[0.625rem] sm:mt-10 mt-8 w-full"
              onClick={(e) => generateBio(e)}
            >
              Create
            </button>
          )}
          {loading && (
            <button
              className="bg-[#2378d1] rounded-lg text-ctext font-semibold px-[1.125rem] py-[0.625rem] sm:mt-10 mt-8 w-full"
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
              <div>
                <h2
                  className="sm:text-4xl text-3xl font-bold text-slate-900 mx-auto"
                  ref={bioRef}
                >
                  Your generated bios
                </h2>
              </div>
              <div className="space-y-8 flex flex-col items-center justify-center max-w-xl mx-auto">
                {generatedBios
                  .substring(generatedBios.indexOf("1"))
                  .split("___")
                  .map((generatedBio) => {
                    return (
                      <div
                        className="bg-white rounded-xl shadow-md p-4 hover:bg-gray-100 transition cursor-copy border"
                        key={generatedBio}
                      >
                        <p>{generatedBio}</p>
                      </div>
                    );
                  })}
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;
