import dayjs from "dayjs";
import Head from "next/head";
import { Grid, Stack } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
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
import {
  from_base_64,
  is_base_64,
  is_uuid_v4,
  to_base_64,
} from "@/utils/parse_uuids";
import { slugify } from "@/utils/slugify";

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
        <title>{event.shareTitle}</title>
      </Head>
      <Stack spacing={5}>
        <EventTitle />
        {!event.currentUser ? <CreateNewUser /> : <MainContent />}
      </Stack>
    </>
  );
}

function MainContent() {
  const { login, currentUser } = EventContext.useContainer();

  useShallowEffect(() => {
    if (currentUser?.id) {
      login(currentUser.id);
    }
  }, [currentUser?.id, login]);

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
  let id = context.query.id;

  if (is_uuid_v4(id)) {
    /* if an old style url id */
    id = to_base_64(id);
  }

  const uuid_v4 = from_base_64(id);
  let event = null;
  try {
    event = await fetchEvent(uuid_v4);
  } catch {
    return {
      notFound: true,
    };
  }

  if (!event.id) {
    return {
      notFound: true,
    };
  }

  let slug = slugify(event.name);

  if (slug !== context.query.event_slug || id !== context.query.id) {
    context.res.writeHead(301, { Location: `/event/${slug}/${id}` });
    context.res.end();
    return true;
  }

  return {
    props: {
      event: event,
    },
  };
}
