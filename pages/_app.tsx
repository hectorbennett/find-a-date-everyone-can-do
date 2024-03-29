/**
 * _app.tsx
 */

import { AppProps } from "next/app";
import Head from "next/head";
import Script from "next/script";
import AppContext from "@/app/app";
import { belanosima, open_sans } from "@/app/fonts";
import { Layout } from "@/components/atoms";
import { MantineProvider } from "@/components/MantineProvider";

/**
 *
 * @param props
 */
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

      <MantineProvider>
        <AppContext.Provider>
          <Layout>
            <main
              className={[belanosima.className, open_sans.className].join(" ")}
            >
              <Component {...pageProps} />
            </main>
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
