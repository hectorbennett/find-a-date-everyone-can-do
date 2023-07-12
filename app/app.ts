import { createContainer } from "unstated-next";
import { useLocalStorage } from "@mantine/hooks";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

interface RecentEvent {
  eventId: string;
  eventName: string;
  userId: string;
  lastLoginDate: string;
}

type RecentEvents = { [id: string]: RecentEvent };

function useApp() {
  const [recentEvents, setRecentEvents] = useLocalStorage<RecentEvents>({
    key: "recentEvents",
    defaultValue: {},
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
  };
}

const AppContext = createContainer(useApp);

export default AppContext;
