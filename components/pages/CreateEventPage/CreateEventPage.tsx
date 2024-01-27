/**
 * CreateEventPage.tsx
 */

import { useState } from "react";
import { useRouter } from "next/router";
import { Stack, Title } from "@mantine/core";

import AppContext from "@/app/app";

import * as api from "@/app/api";

import { to_base_64 } from "@/utils/parse_uuids";
import { slugify } from "@/utils/slugify";

import { Card, CreateEvent, RecentEvents } from "@/components/atoms";
import { FormValues } from "@/components/atoms/CreateEvent/CreateEvent";

/**
 * Create Event page.
 */
export function CreateEventPage() {
  return (
    <Stack spacing={5}>
      <TitleAndInfo />
      <CreateEventWrapped />
      <RecentEventsWrapped />
    </Stack>
  );
}

/**
 * This component renders the 'New event' title component that exists on the home screen for creating a new event.
 * @returns A React element that renders a new event string.
 */
function TitleAndInfo() {
  return (
    <Card>
      <Stack spacing="lg" m="sm" mb="lg" align="center">
        <Title order={1}>New event</Title>
      </Stack>
    </Card>
  );
}

/**
 * CreateEventWrapped
 */
function CreateEventWrapped() {
  const router = useRouter();

  const [isSubmittingForm, setIsSubmittingForm] = useState(false);

  const openEvent = ({ id, name }: { id: string; name: string }) => {
    router.push(`/event/${slugify(name)}/${to_base_64(id)}`);
  };

  const handleSubmit = async (values: FormValues) => {
    setIsSubmittingForm(true);
    const { json } = await api.create_event(values.eventName);
    if (json?.id) {
      openEvent(json);
    }
  };
  return (
    <CreateEvent onSubmit={handleSubmit} isSubmittingForm={isSubmittingForm} />
  );
}

const RecentEventsWrapped = () => {
  const app = AppContext.useContainer();
  return <RecentEvents events={app.recentEvents} />;
};
