/**
 * EditEventPage.tsx
 */

import dayjs from "dayjs";
import Head from "next/head";
import { Grid, Stack } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import localizedFormat from "dayjs/plugin/localizedFormat";

import EventContext from "@/app/event";

import { Calendar, EventUsers, InviteUsers } from "@/components/cards";
import {
  BestDates,
  CreateNewUserOrLoginModal,
  EventTitle,
} from "@/components/atoms";
import { useEffect, useRef, useState } from "react";

dayjs.extend(localizedFormat);

/**
 * Edit Event Page component
 */
export function EditEventPage() {
  const event = EventContext.useContainer();

  return (
    <>
      <Head>
        <title>{event.shareTitle}</title>
      </Head>
      <CreateNewUserOrLoginModalWrapped />
      <Stack spacing={5}>
        <EventTitleWrapped />
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
          <BestDatesWrapped />
        </Stack>
      </Grid.Col>
    </Grid>
  );
}

/** Best dates component, provided with state. */
const BestDatesWrapped = () => {
  const event = EventContext.useContainer();
  const userCount = Object.keys(event.users).length;
  const dateCounts = event.calendarDates.map((date) => ({
    date: date.date,
    count: date.users.length,
  }));
  return <BestDates userCount={userCount} dateCounts={dateCounts} />;
};

/** Event title component, provided with state. */
const EventTitleWrapped = () => {
  // TODO
  const event = EventContext.useContainer();
  if (event.name === null) {
    return;
  }
  return (
    <EventTitle
      name={event.name}
      creationDate={event.creationDate}
      // TODO
      showMobileShareButton={true}
      onClickMobileShare={() => {}}
    />
  );
};

/** Login modal component, provided with state. */
const CreateNewUserOrLoginModalWrapped = () => {
  const event = EventContext.useContainer();

  // open after a little pause.
  const [isOpen, setIsOpened] = useState(false);
  let timeout = useRef(setTimeout(() => {}));
  useEffect(() => {
    timeout.current = setTimeout(() => {
      setIsOpened(true);
    }, 400);
  }, []);

  return (
    <CreateNewUserOrLoginModal
      users={Object.values(event.users)}
      onLogin={event.login}
      onCreateNewUser={event.createNewUser}
      isOpen={isOpen}
    />
  );
};
