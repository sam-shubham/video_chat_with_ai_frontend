import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Alegreya+Sans&family=Barlow:ital,wght@1,600&family=Berkshire+Swash&family=Dosis&family=Exo+2:wght@300&family=Josefin+Sans&family=Kanit&family=Lato&family=Poppins:wght@300&family=Roboto+Condensed:wght@300&family=Rubik&family=Staatliches&family=Ubuntu&family=Varela+Round&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/24justice.png" sizes="any" />
        <script src="/googleTAG.js" />
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MPJNXBNB"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
