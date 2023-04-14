import { Analytics } from "@vercel/analytics/react";
import type { AppProps } from "next/app";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <div className="bg-[#222] text.[#ffffffeb]">
        <Component {...pageProps} />
        <Analytics />
      </div>
    </>
  );
}

export default MyApp;
