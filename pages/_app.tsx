import { AppProps } from "next/app";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import Script from "next/script";
import Layout from "@/components/layout";
import AppContext from "@/app/app";
import { belanosima, open_sans } from "../app/fonts";

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>
          Find a Date Everyone Can Do | Schedule Coordination for group
          Holidays, Events and Parties
        </title>
        <meta
          name="description"
          content="Plan group holidays, events and parties effortlessly! Discover common free days for everyone, say goodbye to scheduling conflicts and hello to seamless event planning. No sign-up required!"
        />
        <meta
          name="keywords"
          content="Find a Date,Everyone Can Do,Schedule Coordination,Event Planning,Holidays,Parties,Scheduling Conflicts,Common Free Days,Calendar Availability,Group Event Organizer,Group Date Finder,Group Calendar Planner"
        />
        <meta
          name="viewport"
          content="maximum-scale=1, minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          // col
          globalStyles: (theme) => ({
            "input::-webkit-calendar-picker-indicator": {
              display: "none !important",
            },
            "html, body": {
              overflowX: "hidden",
              width: "auto!important",
            },
          }),
          fontFamily: open_sans.style.fontFamily,
          colorScheme: "dark",
          headings: {
            fontFamily: belanosima.style.fontFamily,
            fontWeight: 400,
          },
          primaryColor: "purple",
          primaryShade: 6,
          colors: {
            // Add your color
            deepBlue: ["#E9EDFC", "#C1CCF6", "#99ABF0" /* ... */],
            // or replace default theme color
            green: [
              "#F6FAEB",
              "#E5F0C6",
              "#D5E7A2",
              "#C5DD7E",
              "#B4D459",
              "#A4CA35",
              "#83A22A",
              "#627920",
              "#425115",
              "#21280B",
            ],
            purple: [
              "#EEECF9",
              "#D0C9EE",
              "#B1A6E3",
              "#9283D8",
              "#7460CC",
              "#553EC1",
              "#44319B",
              "#332574",
              "#22194D",
              "#110C27",
            ],
          },
        }}
      >
        <AppContext.Provider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AppContext.Provider>
        <Script
          defer
          data-domain="findadateeveryonecando.com"
          src="https://plausible.io/js/script.js"
        />
      </MantineProvider>
    </>
  );
}
