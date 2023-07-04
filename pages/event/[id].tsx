import dayjs from "dayjs";
import Head from "next/head";
import { Stack } from "@mantine/core";
import localizedFormat from "dayjs/plugin/localizedFormat";

import EventContext, { EventInterface } from "@/app/event";

import { fetchEvent } from "@/app/api";
import {
  BestDates,
  Calendar,
  CreateNewUser,
  EventTitle,
  EventUsers,
  InviteUsers,
  Logout,
  OtherOkDates,
} from "@/components/cards";

dayjs.extend(localizedFormat);

export default function Event({ event }: { event: EventInterface }) {
  return (
    <EventContext.Provider initialState={{ event: event }}>
      <EditEvent />
    </EventContext.Provider>
  );
}

function EditEvent() {
  const event = EventContext.useContainer();
  if (!event.currentUser) {
    return <CreateNewUser />;
  }

  return (
    <>
      <Head>
        <title>{event.name} | Find a Date Everyone Can Do</title>
        <meta
          name="description"
          content="Meta description for the About page"
        />
      </Head>
      <Stack spacing={5}>
        <EventTitle />
        <Calendar />
        <InviteUsers />
        <EventUsers />
        <BestDates />
        <OtherOkDates />
        <Logout />
      </Stack>
    </>
  );
}

export async function getServerSideProps(context: any) {
  try {
    const event = await fetchEvent(context.query.id);
    return {
      props: {
        event: event,
      },
    };
  } catch {
    return {
      notFound: true,
    };
  }
}
