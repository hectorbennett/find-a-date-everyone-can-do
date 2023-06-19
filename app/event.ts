import { useEffect, useState } from "react";
import { createContainer } from "unstated-next";
import DUMMY_EVENT from "./dummy_event";
import chroma from "chroma-js";
import dayjs from "dayjs";

export interface EventInterface {
  name: string;
  uid: string;
  attendees: { [key: string]: AttendeeResults };
}

export type AttendeeResults = { [key: string]: boolean };

const getDateString = (date: Date) => dayjs(date).format("YYYY-MM-DD");

const dummyFetchData = (uid: string) => {
  if (uid === "abcd") {
    return DUMMY_EVENT;
  }
};

function useEvent(initialState: { uid: string } = { uid: "" }) {
  const uid = initialState.uid;
  const [eventData, setEventData] = useState<null | EventInterface>(null);
  const [currentUser, setCurrentUser] = useState("Hector");
  const [noEventFound, setNoEventFound] = useState(false);

  useEffect(() => {
    const data = dummyFetchData(uid);
    if (data) {
      setEventData(data);
    } else {
      setNoEventFound(true);
    }
  }, []);

  const setDate = (date: Date, selected: boolean) => {
    const date_string = getDateString(date);

    setEventData((d) => {
      if (d === null) {
        return null;
      }
      const currentUserDates =
        currentUser in d.attendees ? d.attendees[currentUser] : {};
      return {
        ...d,
        attendees: {
          ...d.attendees,
          [currentUser]: { ...currentUserDates, [date_string]: selected },
        },
      };
    });
  };

  const selectDate = (date: Date) => setDate(date, true);
  const deselectDate = (date: Date) => setDate(date, false);

  const dateIsSelected = (date: Date) => {
    const date_string = getDateString(date);
    return Boolean(eventData?.attendees[currentUser][date_string]);
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
    console.log(count / max);
    return getHeatMapColour(count / max);
  };

  return {
    name: eventData?.name || null,
    date_counts: date_counts,
    currentUser: currentUser,
    attendees: Object.keys(eventData?.attendees || {}),
    selectDate,
    deselectDate,
    dateIsSelected,
    getDateSelectionCount,
    getEventHeatColour,
  };
}

const getDateCounts = (eventData: EventInterface) => {
  const date_count: { [date: string]: number } = {};
  Object.keys(eventData.attendees).map((person: string) => {
    Object.keys(eventData.attendees[person]).forEach((date) => {
      if (eventData.attendees[person][date]) {
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
