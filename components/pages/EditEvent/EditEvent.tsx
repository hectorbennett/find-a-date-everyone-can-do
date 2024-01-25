/**
 * EditEvent.tsx
 */

import dayjs from "dayjs";
import Head from "next/head";
import { Grid, Stack } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import localizedFormat from "dayjs/plugin/localizedFormat";

import EventContext from "@/app/event";

import {
  BestDates,
  Calendar,
  EventTitle,
  EventUsers,
  InviteUsers,
} from "@/components/cards";
import LoginModal from "@/components/login_modal";

dayjs.extend(localizedFormat);

/**
 * Edit Event component
 */
export function EditEvent() {
  const event = EventContext.useContainer();

  return (
    <>
      <Head>
        <title>{event.shareTitle}</title>
      </Head>
      <LoginModal />
      <Stack spacing={5}>
        <EventTitle />
        <MainContent />
      </Stack>
    </>
  );
}

/**
 *
 */
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
