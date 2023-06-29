import { useState } from "react";
import { useRouter } from "next/router";
import { Button, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import Card from "@/components/card";
import * as api from "@/app/api";

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
      eventName: (value) => {
        if (!value.length) {
          return "Please enter an event name";
        }
        if (value.length <= 2) {
          return "Please enter a longer event name";
        }
        if (value.length > 100) {
          return "Please enter a shorter event name";
        }
        return null;
      },
    },
  });

  const handleSubmit = async (values: FormValues) => {
    setIsLoading(true);
    const { json, response } = await api.create_event(values.eventName);
    if (json?.id) {
      openEvent(json.id);
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
