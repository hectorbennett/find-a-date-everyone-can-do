import { createContainer } from "unstated-next";
import { useLocalStorage } from "@mantine/hooks";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { useState } from "react";
dayjs.extend(utc);

interface RecentEvent {
  eventId: string;
  eventName: string;
  userId: string;
  lastLoginDate: string;
}

type RecentEvents = { [id: string]: RecentEvent };

export interface SavingState {
  isSaving: boolean;
  isSaved: boolean;
  isError: boolean;
}

/**
 *
 */
function useApp() {
  const [recentEvents, setRecentEvents] = useLocalStorage<RecentEvents>({
    key: "recentEvents",
    defaultValue: {},
  });
  const [savingState, setSavingState] = useState<SavingState>({
    isSaving: false,
    isSaved: true,
    isError: false,
  });

  const logRecentEvent = ({
    eventId,
    eventName,
    userId,
  }: {
    eventId: string;
    eventName: string;
    userId: string;
  }) => {
    setRecentEvents((e) => ({
      ...e,
      [eventId]: {
        eventId,
        eventName,
        userId,
        lastLoginDate: dayjs.utc().format(),
      },
    }));
  };

  return {
    recentEvents,
    logRecentEvent,
    ...savingState,
    setSavingState,
  };
}

const AppContext = createContainer(useApp);

export default AppContext;
