import { useState } from "react";
import { useRouter } from "next/router";
import { Button, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import EventContext from "@/app/event";
import Card from "@/components/card";

export default function CreateEvent() {
  return (
    <Card title="Event name" note="Enter a name for your event">
      <CreateEventForm />
    </Card>
  );
}

interface FormValues {
  eventName: string;
}

function CreateEventForm() {
  const event = EventContext.useContainer();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const openEvent = (id: string) => {
    router.push(`/event/${id}`);
  };

  const form = useForm<FormValues>({
    initialValues: {
      eventName: "",
    },

    validate: {
      eventName: (value) =>
        !value.length
          ? "Please enter an event name"
          : value.length > 2
          ? null
          : "Please enter a longer event name",
    },
  });

  const handleSubmit = async (values: FormValues) => {
    setIsLoading(true);
    try {
      const e = await event.createEvent(values.eventName);
      openEvent(e.id);
    } catch {
      console.log("Something went wrong");
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack spacing="sm">
        <TextInput
          autoFocus
          placeholder="E.g. Camping Trip 2023"
          {...form.getInputProps("eventName")}
        />

        <Button type="submit" loading={isLoading}>
          Find a date!
        </Button>
      </Stack>
    </form>
  );
}
