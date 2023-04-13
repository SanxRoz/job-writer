import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRef, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import DropDown, { VibeType } from "../components/DropDown";
import Footer from "../components/Footer";
import Github from "../components/GitHub";
import Header from "../components/Header";
import LoadingDots from "../components/LoadingDots";

const Home: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [bio, setBio] = useState("");
  const [vibe, setVibe] = useState<VibeType>("Professional");
  const [generatedBios, setGeneratedBios] = useState<String>("");

  const bioRef = useRef<null | HTMLDivElement>(null);

  const scrollToBios = () => {
    if (bioRef.current !== null) {
      bioRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const prompt = `Generate 2 ${vibe} twitter biographies with no hashtags and clearly labeled "1." and "2.". ${
    vibe === "Funny"
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
      </Head>

      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 mt-12 sm:mt-20">
        <h1 className="sm:text-6xl text-4xl max-w-[708px] font-bold text-ctext">
          Job Writer
        </h1>
        <p className="text-ctext mt-5">
          Build the perfect job ad for your business with AI!
        </p>
        <div className="max-w-xl w-full">
          <div className="flex mt-10 items-center space-x-3">
            <p className="text-center w-full text-ctext font-medium">
              Enter your details
            </p>
          </div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-6">
            <div>
              <p className="text-left text-ctext font-semibold mb-2 text-lg leading-6">
                First Name
              </p>
              <input
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full min-h-11 placeholder:text-[#ffffffcc] text-gray-300 tracking-wider bg-back border border-gray-400 rounded-md mb-0 py-2 px-3 text-sm leading-6 transition duration-300 shadow-sm"
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
                className="w-full min-h-11 placeholder:text-[#ffffffcc] text-gray-300 tracking-wider bg-back border border-gray-400 rounded-md mb-0 py-2 px-3 text-sm leading-6 transition duration-300 shadow-sm"
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
                className="w-full min-h-11 placeholder:text-[#ffffffcc] text-gray-300 tracking-wider bg-back border border-gray-400 rounded-md mb-0 py-2 px-3 text-sm leading-6 transition duration-300 shadow-sm"
                placeholder={"Email Address"}
              />
            </div>
            <div>
              <p className="text-left text-ctext font-semibold mb-2 text-lg leading-6">
                Location
              </p>
              <input
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full min-h-11 placeholder:text-[#ffffffcc] text-gray-300 tracking-wider bg-back border border-gray-400 rounded-md mb-0 py-2 px-3 text-sm leading-6 transition duration-300 shadow-sm"
                placeholder={"Location"}
              />
            </div>
          </div>
          <div className="flex mb-5 items-center space-x-3">
            <p className="text-left font-medium">Select your vibe.</p>
          </div>
          <div className="block">
            <DropDown vibe={vibe} setVibe={(newVibe) => setVibe(newVibe)} />
          </div>

          {!loading && (
            <button
              className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full"
              onClick={(e) => generateBio(e)}
            >
              Generate your bio &rarr;
            </button>
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
