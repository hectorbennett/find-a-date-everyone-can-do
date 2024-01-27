/**
 * EditEventPage.tsx
 */

import dayjs from "dayjs";
import minMax from "dayjs/plugin/minMax";
dayjs.extend(minMax);

import Head from "next/head";
import { Grid, Stack } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import localizedFormat from "dayjs/plugin/localizedFormat";

import EventContext, { CalendarDate } from "@/app/event";

import {
  BestDates,
  Calendar,
  Card,
  CreateNewUserOrLoginModal,
  DesktopShareButton,
  EventTitle,
  EventUsers,
} from "@/components/atoms";
import { useEffect, useRef, useState } from "react";
import { useNavigatorShare } from "@/app/utils";
import SavingStatus from "@/components/SavingStatus";

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
        <CalendarCardWrapped />
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
          <DesktopShareButtonWrapped />
          <EventUsersWrapped />
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
  const event = EventContext.useContainer();
  const { canShare, shareData } = useNavigatorShare();
  if (event.name === null) {
    return;
  }
  /** Open the phone share feature.  */
  const share = async () => {
    try {
      await navigator.share(shareData);
    } catch (e: any) {
      if (e.toString().includes("AbortError")) {
        return;
      }
    }
  };
  return (
    <EventTitle
      name={event.name}
      creationDate={event.creationDate}
      showMobileShareButton={canShare}
      onClickMobileShare={share}
    />
  );
};

/** Login modal component, provided with state. */
const CreateNewUserOrLoginModalWrapped = () => {
  const event = EventContext.useContainer();

  // open after a little pause.
  const [isOpen, setIsOpened] = useState(false);
  let timeout = useRef(setTimeout(() => {}));

  const loggedIn = Boolean(event.currentUser?.id);

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
      isOpen={isOpen && !loggedIn}
    />
  );
};

/** Desktop share button - only show if we can't show the mobile share button. */
const DesktopShareButtonWrapped = () => {
  const { isLoading, canShare } = useNavigatorShare();
  if (isLoading || canShare) {
    return null;
  }
  return <DesktopShareButton url={window.location.href} />;
};

/** Event users component, wrapped with state. */
const EventUsersWrapped = () => {
  const event = EventContext.useContainer();
  return (
    <EventUsers
      users={Object.values(event.users)}
      currentUserId={event.currentUser?.id || null}
    />
  );
};

/**
 *
 */
function CalendarWrapped() {
  const event = EventContext.useContainer();

  const handleSelect = (date: CalendarDate) => {
    if (date.isSelected) {
      event.deselectDate(date.date);
    } else {
      event.selectDate(date.date);
    }
  };

  const thisMonth = dayjs().startOf("month");

  const firstSelectedMonth = (() => {
    const firstCalendarDate = event.calendarDates[0];
    if (firstCalendarDate === undefined) {
      return null;
    }
    return firstCalendarDate.date.startOf("month");
  })();

  const initialFocusedDate =
    dayjs.max(thisMonth, firstSelectedMonth || thisMonth) || thisMonth;

  return (
    <Calendar
      initialFocusedDate={initialFocusedDate}
      getDayProps={(d) => {
        const calendarDate = event.getCalendarDate(d);
        return {
          isSelected: calendarDate.isSelected,
          isToday: calendarDate.isToday,
          isInPast: calendarDate.isInPast,
          onClick: () => handleSelect(calendarDate),
          selectionCount: calendarDate.users.length,
          heat: calendarDate.heat,
        };
      }}
    />
  );
}

/**
 *
 */
function CalendarCardWrapped() {
  return (
    <Card
      title="Calendar"
      note={`Select the dates you are available. A black outline indicates you have selected that date. The shade of green indicates how many people have selected that date. Darker is better.`}
    >
      <CalendarWrapped />
      <SavingStatus />
    </Card>
  );
}
