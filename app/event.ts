import { useState } from "react";
import { createContainer } from "unstated-next";
import { useLocalStorage } from "@mantine/hooks";
import * as api from "./api";
import { getDateString } from "./utils";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
dayjs.extend(isSameOrAfter);
import type { Dayjs } from "dayjs";
import AppContext from "./app";

type UserId = string;

const TODAY = dayjs();

export interface EventInterface {
  id: string;
  name: string;
  users: { [key: UserId]: User };
  creationDate: Dayjs;
  modificationDate: Dayjs;
}

export interface User {
  id: UserId;
  name: string;
  dates: UserDates;
}
export type UserDates = Array<string>;

export interface CalendarDate {
  date: Dayjs;
  users: Array<UserId>;
  isSelected: boolean;
  isInPast: boolean;
  isToday: boolean;
  heat: number;
}

export type CalendarDates = Array<CalendarDate>;

const DEFAULT_EVENT: EventInterface = {
  name: "",
  id: "",
  users: {},
  creationDate: dayjs(),
  modificationDate: dayjs(),
};

/**
 *
 * @param initialState
 * @param initialState.event
 */
function useEvent(
  initialState: { event: EventInterface } = { event: DEFAULT_EVENT },
) {
  const app = AppContext.useContainer();

  const [eventData, setEventData] = useState<EventInterface>(
    initialState.event,
  );

  const currentUserId: string | null = app.recentEvents[eventData.id]?.userId;

  const currentUser =
    currentUserId && eventData ? eventData.users[currentUserId] : null;

  const calendarDates = getCalendarDates(eventData, currentUserId);

  const [focusedMonth, setFocusedMonth] = useState(calendarDates);

  const createEvent = async (eventName: string) => {
    return await api.create_event(eventName);
  };

  const setDate = (date: Dayjs, selected: boolean) => {
    app.setSavingState({ isSaving: true, isSaved: false, isError: false });

    if (!currentUserId) {
      return;
    }

    if (selected) {
      api.add_date(eventData.id, currentUserId, date).then(() => {
        app.setSavingState({ isSaving: false, isSaved: true, isError: false });
      });
    } else {
      api.remove_date(eventData.id, currentUserId, date).then(() => {
        app.setSavingState({ isSaving: false, isSaved: true, isError: false });
      });
    }

    setEventData((d) => {
      const currentUser =
        currentUserId && currentUserId in d.users
          ? d.users[currentUserId]
          : null;

      if (!currentUser) {
        return d;
      }

      /* Add or remove from array of dates */
      const newDates = selected
        ? [...currentUser.dates, getDateString(date)]
        : currentUser.dates.filter((d) => d !== getDateString(date));

      return {
        ...d,
        users: {
          ...d.users,
          [currentUserId]: { ...currentUser, dates: newDates },
        },
      };
    });
  };

  const selectDate = (date: Dayjs) => setDate(date, true);
  const deselectDate = (date: Dayjs) => setDate(date, false);

  const dateIsSelected = (date: Dayjs) => {
    if (!currentUserId) {
      return false;
    }
    const date_string = getDateString(date);
    return eventData?.users[currentUserId].dates.includes(date_string);
  };

  const getUserByName = (name: string) => {
    return Object.values(eventData?.users || {}).find((user) => {
      return user.name.toLowerCase() === name.toLowerCase();
    });
  };

  const createNewUser = async (name: string) => {
    const user = await api.create_user(eventData.id, name);

    setEventData((e) => ({
      ...e,
      users: {
        ...e.users,
        [user.json.id]: {
          ...user.json,
          dates: [],
        },
      },
    }));

    login(user.json.id);
  };

  const login = (id: string) => {
    app.logRecentEvent({
      eventId: eventData.id,
      eventName: eventData.name,
      userId: id,
    });
  };

  const logout = () => {
    // setCurrentUserId(null);
  };

  const users =
    Object.fromEntries(
      Object.entries(eventData?.users || {}).filter(
        ([_id, user]) => user.dates.length > 0,
      ),
    ) || {};

  const getCalendarDate = (date: Dayjs): CalendarDate =>
    calendarDates.find((d) => d.date.isSame(date, "day")) || {
      date: date,
      users: [],
      isSelected: false,
      isInPast: !date.isSameOrAfter(TODAY, "day"),
      isToday: date.isSame(TODAY, "day"),
      heat: 0,
    };

  return {
    name: eventData?.name || null,
    shareTitle: `${
      eventData?.name ? `${eventData.name} | ` : ""
    }Find a Date Everyone Can Do`,
    calendarDates,
    getCalendarDate,
    currentUser: currentUser,
    users: users,
    creationDate: eventData.creationDate,
    modificationDate: eventData.modificationDate,
    selectDate,
    deselectDate,
    dateIsSelected,
    createEvent,
    getUserByName,
    createNewUser,
    login,
    logout,
  };
}

const getCalendarDates = (
  eventData: EventInterface,
  currentUserId: UserId | null,
): CalendarDates => {
  const dates: { [date: string]: CalendarDate } = {};
  Object.values(eventData.users).map((user: User) => {
    user.dates.forEach((date) => {
      const dayjs_date = dayjs(date);
      if (user.dates.includes(date)) {
        if (date in dates) {
          dates[date] = {
            ...dates[date],
            users: [...dates[date].users, user.id],
            isSelected: user.id === currentUserId || dates[date].isSelected,
          };
        } else {
          dates[date] = {
            date: dayjs_date,
            users: [user.id],
            isSelected: user.id === currentUserId,
            isInPast: !dayjs_date.isSameOrAfter(TODAY, "day"),
            isToday: dayjs_date.isSame(TODAY, "day"),
            heat: 0,
          };
        }
      }
    });
  });

  const max = Object.values(eventData?.users || {}).filter(
    (user) => user.dates.length,
  ).length;

  return Object.values(dates)
    .map((date) => ({
      ...date,
      heat: date.users.length / max,
    }))
    .sort((a, b) => (a.date.isAfter(b.date) ? 1 : -1));
};

const EventContext = createContainer(useEvent);

export default EventContext;
