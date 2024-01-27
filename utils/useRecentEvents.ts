/**
 * useRecentEvents.ts
 *
 * Store and retrieve the recently viewed events events via local storage.
 */

import { useLocalStorage } from "@mantine/hooks";
import dayjs, { Dayjs } from "dayjs";

/** Event id */
type EventId = string;

/** A recent event, as we want to use it.  */
export interface RecentEvent {
  /** The event id. */
  eventId: EventId;
  /** The event name. */
  eventName: string;
  /** The user logged in as. */
  userId: string;
  /** The last login date (as a dayjs date) */
  lastLoginDate: Dayjs;
}

/** A recent event, as stored in localstorage. */
interface RawRecentEvent extends Omit<RecentEvent, "lastLoginDate"> {
  /** The login date in utc as a string. */
  lastLoginDate: string;
}

/** The return type of the useRecentEvents hook. */
interface UseRecentEventsReturn {
  /** A list of recent events */
  recentEvents: Array<RecentEvent>;
  /** Log a new recent event. */
  logRecentEvent: (event: Omit<RecentEvent, "lastLoginDate">) => void;
}

/**
 *
 * @returns Recent events and
 */
export const useRecentEvents = (): UseRecentEventsReturn => {
  // a mapping of event ids to events
  let [recentRawEvents, setRecentRawEvents] = useLocalStorage<
    Record<EventId, RawRecentEvent>
  >({
    key: "recentEvents",
    defaultValue: {},
  });
  return {
    recentEvents: Object.values(recentRawEvents).map(
      ({ eventId, eventName, userId, lastLoginDate }) => ({
        eventId,
        eventName,
        userId,
        lastLoginDate: dayjs(lastLoginDate),
      }),
    ),
    logRecentEvent: ({ eventId, eventName, userId }) => {
      setRecentRawEvents((r) => ({
        ...r,
        [eventId]: {
          eventId,
          eventName,
          userId,
          lastLoginDate: dayjs.utc().format(),
        },
      }));
    },
  };
};
