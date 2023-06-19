import { useEffect, useState } from "react";
import { createContainer } from "unstated-next";
import { useLocalStorage } from "@mantine/hooks";
import dayjs from "dayjs";
import chroma from "chroma-js";
import { nanoid } from "nanoid";
import { DUMMY_EVENT, NEW_EVENT } from "./dummy_event";

export interface EventInterface {
  name: string;
  uid: string;
  attendees: { [key: string]: Attendee };
}

interface Attendee {
  uid: string;
  name: string;
  results: AttendeeResults;
}

export type AttendeeResults = { [key: string]: boolean };

const getDateString = (date: Date) => dayjs(date).format("YYYY-MM-DD");

const dummyFetchData = (uid: string) => {
  if (uid === "abcd") {
    return DUMMY_EVENT;
  } else {
    return NEW_EVENT;
  }
};

function useEvent(initialState: { uid: string } = { uid: "" }) {
  const uid = initialState.uid;
  const [eventData, setEventData] = useState<null | EventInterface>(null);
  const [currentUserId, setCurrentUserId] = useLocalStorage<string | null>({
    key: "uid",
    defaultValue: null,
  });

  const [noEventFound, setNoEventFound] = useState(false);

  const currentUser =
    currentUserId && eventData ? eventData.attendees[currentUserId] : null;

  useEffect(() => {
    const data = dummyFetchData(uid);
    if (data) {
      setEventData(data);
    } else {
      setNoEventFound(true);
    }
  }, [uid]);

  const createEvent = async (eventName: string) => {
    const uid = nanoid();

    setEventData({
      name: eventName,
      uid,
      attendees: {},
    });

    return await uid;
  };

  const setDate = (date: Date, selected: boolean) => {
    const date_string = getDateString(date);

    setEventData((d) => {
      if (d === null || !currentUserId) {
        return null;
      }

      const currentUser =
        currentUserId && currentUserId in d.attendees
          ? d.attendees[currentUserId]
          : null;

      if (!currentUser) {
        return null;
      }

      const newDates = { ...currentUser.results, [date_string]: selected };

      return {
        ...d,
        attendees: {
          ...d.attendees,
          [currentUserId]: { ...currentUser, results: newDates },
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
    return Boolean(eventData?.attendees[currentUserId].results[date_string]);
  };

  const date_counts = eventData ? getDateCounts(eventData) : {};

  const getDateSelectionCount = (date: Date) => {
    const date_string = getDateString(date);
    return date_counts[date_string] || 0;
  };

  const getEventHeatColour = (date: Date) => {
    const date_string = getDateString(date);
    const max = Object.keys(eventData?.attendees || {}).length;
    const count = date_counts[date_string] || 0;
    return getHeatMapColour(count / max);
  };

  const getUserByName = (name: string) => {
    return Object.values(eventData?.attendees || {}).find((user) => {
      return user.name.toLowerCase() === name.toLowerCase();
    });
  };

  const createNewUser = (name: string) => {
    const uid = nanoid();

    const user = {
      name: name,
      uid: uid,
      results: {},
    };

    setEventData((e) =>
      e ? { ...e, attendees: { ...e.attendees, [uid]: user } } : null
    );

    login(uid);
  };

  const login = (uid: string) => {
    setCurrentUserId(uid);
  };

  const logout = () => {
    setCurrentUserId(null);
  };

  const attendees =
    Object.fromEntries(
      Object.entries(eventData?.attendees || {}).filter(
        ([_uid, user]) => Object.keys(user.results).length > 0
      )
    ) || {};

  return {
    name: eventData?.name || null,
    date_counts: date_counts,
    currentUser: currentUser,
    attendees: attendees,
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
  Object.keys(eventData.attendees).map((person: string) => {
    Object.keys(eventData.attendees[person].results).forEach((date) => {
      if (eventData.attendees[person].results[date]) {
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
