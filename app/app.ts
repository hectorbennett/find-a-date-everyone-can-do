import { createContainer } from "unstated-next";
import { useLocalStorage } from "@mantine/hooks";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { useState } from "react";
import { useRecentEvents } from "@/utils/useRecentEvents";
dayjs.extend(utc);

export interface SavingState {
  isSaving: boolean;
  isSaved: boolean;
  isError: boolean;
}

/**
 *
 */
function useApp() {
  const { recentEvents, logRecentEvent } = useRecentEvents();

  const [savingState, setSavingState] = useState<SavingState>({
    isSaving: false,
    isSaved: true,
    isError: false,
  });

  return {
    recentEvents,
    logRecentEvent,
    ...savingState,
    setSavingState,
  };
}

const AppContext = createContainer(useApp);

export default AppContext;
