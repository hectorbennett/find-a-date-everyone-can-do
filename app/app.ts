import { createContainer } from "unstated-next";
import { useLocalStorage } from "@mantine/hooks";

type Event = { [id: string]: string };

function useApp() {
  const [recentEvents, setRecentEvents] = useLocalStorage<Event>({
    key: "recentEvents",
    defaultValue: {},
  });

  const logRecentEvent = ({ id, name }: Event) => {
    setRecentEvents((e) => ({ ...e, [id]: name }));
  };

  console.log(recentEvents);

  return {
    recentEvents,
    logRecentEvent,
  };
}

const AppContext = createContainer(useApp);

export default AppContext;
