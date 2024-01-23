import { Stack, Title } from "@mantine/core";
import Card from "@/components/card";
import CreateEvent from "@/components/create_event";
import RecentEvents from "@/components/cards/recent_events";

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

export default function Index() {
  return (
    <Stack spacing={5}>
      <TitleAndInfo />
      <CreateEvent />
      <RecentEvents />
    </Stack>
  );
}
