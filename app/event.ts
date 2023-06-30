import { useState } from "react";
import { createContainer } from "unstated-next";
import { useLocalStorage } from "@mantine/hooks";
import chroma from "chroma-js";
import * as api from "./api";
import { getDateString } from "./utils";

export interface EventInterface {
  name: string;
  id: string;
  users: { [key: string]: User };
}

export interface User {
  id: string;
  name: string;
  dates: UserDates;
}

export type UserDates = Array<string>;

const DEFAULT_EVENT: EventInterface = {
  name: "",
  id: "",
  users: {},
};

function useEvent(
  initialState: { event: EventInterface } = { event: DEFAULT_EVENT }
) {
  const [eventData, setEventData] = useState<EventInterface>(
    initialState.event
  );
  const [currentUserId, setCurrentUserId] = useLocalStorage<string | null>({
    key: "id",
    defaultValue: null,
  });

  const currentUser =
    currentUserId && eventData ? eventData.users[currentUserId] : null;

  const createEvent = async (eventName: string) => {
    return await api.create_event(eventName);
  };

  const setDate = (date: Date, selected: boolean) => {
    if (!currentUserId) {
      return;
    }

    if (selected) {
      api.add_date(eventData.id, currentUserId, date);
    } else {
      api.remove_date(eventData.id, currentUserId, date);
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

  const selectDate = (date: Date) => setDate(date, true);
  const deselectDate = (date: Date) => setDate(date, false);

  const dateIsSelected = (date: Date) => {
    if (!currentUserId) {
      return false;
    }
    const date_string = getDateString(date);
    return eventData?.users[currentUserId].dates.includes(date_string);
  };

  const date_counts = eventData ? getDateCounts(eventData) : {};

  const getDateSelectionCount = (date: Date) => {
    const date_string = getDateString(date);
    return date_counts[date_string] || 0;
  };

  const getEventHeatColour = (date: Date) => {
    const date_string = getDateString(date);
    const max = Object.values(eventData?.users || {}).filter(
      (user) => user.dates.length
    ).length;
    const count = date_counts[date_string] || 0;
    return getHeatMapColour(count / max);
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
    setCurrentUserId(id);
  };

  const logout = () => {
    setCurrentUserId(null);
  };

  const users =
    Object.fromEntries(
      Object.entries(eventData?.users || {}).filter(
        ([_id, user]) => user.dates.length > 0
      )
    ) || {};

  return {
    name: eventData?.name || null,
    date_counts: date_counts,
    currentUser: currentUser,
    users: users,
    selectDate,
    deselectDate,
    dateIsSelected,
    getDateSelectionCount,
    getEventHeatColour,
    createEvent,
    getUserByName,
    createNewUser,
    login,
    logout,
  };
}

const getDateCounts = (eventData: EventInterface) => {
  const date_count: { [date: string]: number } = {};
  Object.values(eventData.users).map((user: User) => {
    user.dates.forEach((date) => {
      if (user.dates.includes(date)) {
        if (date in date_count) {
          date_count[date] += 1;
        } else {
          date_count[date] = 1;
        }
      }
    });
  });
  return date_count;
};

const EventContext = createContainer(useEvent);

export default EventContext;

const getHeatMapColour = (n: number) => {
  const f = chroma.scale(["white", "lightyellow", "lightgreen", "green"]);
  return f(n).toString();
};
