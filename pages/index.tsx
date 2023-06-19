import { useState } from "react";
import { useRouter } from "next/router";
import { Button, TextInput, Title } from "@mantine/core";
import EventContext from "@/app/event";

export default function Index() {
  return (
    <EventContext.Provider>
      <CreateEvent />
    </EventContext.Provider>
  );
}

function CreateEvent() {
  const [eventName, setEventName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const openEvent = (uid: string) => {
    router.push(`/event/${uid}`);
  };
  const event = EventContext.useContainer();
  return (
    <div>
      <Title order={1}>Find a date everyone can do</Title>

      <TextInput
        placeholder="Enter a name for your event here"
        label="What is your event?"
        variant="filled"
        value={eventName}
        onChange={(e) => setEventName(e.target.value)}
      />

      <Button
        radius="xs"
        size="lg"
        loading={isLoading}
        disabled={!eventName}
        onClick={async () => {
          setIsLoading(true);
          const uid = await event.createEvent(eventName);
          openEvent(uid);
        }}
      >
        Find a date!
      </Button>
    </div>
  );
}
