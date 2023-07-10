import dayjs from "dayjs";
import Head from "next/head";
import { Grid, Stack } from "@mantine/core";
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
        {!event.currentUser ? <CreateNewUser /> : <MainContent />}
      </Stack>
    </>
  );
}

function MainContent() {
  return (
    <Grid
      gutter={5}
      sx={(theme) => ({
        [theme.fn.smallerThan("md")]: {
          margin: 0,
        },
      })}
    >
      <Grid.Col
        md={7}
        sx={(theme) => ({
          [theme.fn.smallerThan("md")]: {
            padding: 0,
          },
        })}
      >
        <Calendar />
      </Grid.Col>
      <Grid.Col
        md={5}
        sx={(theme) => ({
          [theme.fn.smallerThan("md")]: {
            padding: 0,
          },
        })}
      >
        <Stack spacing={5}>
          <InviteUsers />
          <EventUsers />
          <BestDates />
        </Stack>
      </Grid.Col>
    </Grid>
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
