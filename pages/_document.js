import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export const metadata = {
  openGraph: {
    siteName: "24Justice AI",
    type: "website",
    images: [
      {
        url: "https://24justice.com/24justice_orignal.png",
        width: 800,
        height: 600,
      },
    ],
    url: "https://24justice.com",
    title: "24Justice",
    description: "Pakistan’s First Legal AI Site",
  },
};
export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="og:title" content="24Justice" />
        <meta name="og:type" content="website" />
        <meta name="og:url" content="https://24justice.com" />
        <meta
          name="og:image"
          content="https://24justice.com/24justice_orignal.png"
        />
        <meta name="og:site_name" content="24Justice AI" />
        <meta name="og:description" content="Pakistan’s First Legal AI Site" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Alegreya+Sans&family=Barlow:ital,wght@1,600&family=Berkshire+Swash&family=Dosis&family=Exo+2:wght@300&family=Josefin+Sans&family=Kanit&family=Lato&family=Poppins:wght@300&family=Roboto+Condensed:wght@300&family=Rubik&family=Staatliches&family=Ubuntu&family=Varela+Round&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/24justice.png" sizes="any" />
        {/* <script src="/googleTAG.js" async /> */}

        {/* <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MPJNXBNB"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript> */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
