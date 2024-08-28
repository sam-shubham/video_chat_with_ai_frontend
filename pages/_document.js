import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export const metadata = {
  openGraph: {
    siteName: "LPU AI",
    type: "website",
    images: [
      {
        url: "https://lpu.appambient.com/mainLogoCircle.png",
        width: 800,
        height: 600,
      },
    ],
    url: "https://lpu.appambient.com/mainLogoCircle.png",
    title: "LPU AI",
    description: "LPU's First Custom AI Assistant",
  },
};
export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="title" content="LPU's AI: LPU's First AI Assistant" />
        <meta name="descriptions" content="LPU's First Custom AI Assistant" />
        <meta name="og:title" content="LPU AI" />
        <meta name="og:type" content="website" />
        <meta name="og:url" content="https://lpu.appambient.com" />
        <meta
          name="og:image"
          content="https://lpu.appambient.com/mainLogoCircle.png"
        />
        <meta name="og:site_name" content="LPU's AI" />
        <meta name="og:description" content="LPU's First Custom AI Assistant" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Alegreya+Sans&family=Barlow:ital,wght@1,600&family=Berkshire+Swash&family=Dosis&family=Exo+2:wght@300&family=Josefin+Sans&family=Kanit&family=Lato&family=Poppins:wght@300&family=Roboto+Condensed:wght@300&family=Rubik&family=Staatliches&family=Ubuntu&family=Varela+Round&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/mainLogoCircle.png" sizes="any" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
