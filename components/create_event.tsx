import { useState } from "react";
import { useRouter } from "next/router";
import { Button, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import Card from "@/components/card";
import * as api from "@/app/api";
import { to_base_64 } from "@/utils/parse_uuids";
import { slugify } from "@/utils/slugify";

/**
 *
 */
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

/**
 *
 */
function CreateEventForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const openEvent = ({ id, name }: { id: string; name: string }) => {
    router.push(`/event/${slugify(name)}/${to_base_64(id)}`);
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
    const { json } = await api.create_event(values.eventName);
    if (json?.id) {
      openEvent(json);
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack spacing="sm" p="xs">
        <TextInput
          autoFocus
          size="md"
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
