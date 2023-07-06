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

  return (
    <>
      <Head>
        <title>{event.name} | Find a Date Everyone Can Do</title>
      </Head>
      <Stack spacing={5}>
        <EventTitle />
        {!event.currentUser ? <CreateNewUser /> : <Thing />}
      </Stack>
    </>
  );
}

function Thing() {
  return (
    <>
      <Calendar />
      <InviteUsers />
      <EventUsers />
      <BestDates />
      <OtherOkDates />
      <Logout />
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
