import { AppProps } from "next/app";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import Script from "next/script";

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>Find a date everyone can do</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: "light",
          headings: {
            fontWeight: 400,
            sizes: {
              h4: {
                fontWeight: 300,
              },
            },
          },
        }}
      >
        <Component {...pageProps} />
        <Script
          defer
          data-domain="findadateeveryonecando.com"
          src="https://plausible.io/js/script.js"
        />
      </MantineProvider>
    </>
  );
}
