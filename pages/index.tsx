import Card from "@/components/card";
import Container from "@/components/container";
import CreateEvent from "@/components/create_event";
import { PageHeader } from "@/components/page_header";
import { SimpleGrid, Stack, Title } from "@mantine/core";

function CreateNewEventTitle() {
  return (
    <Stack spacing="lg" m="sm" mb="lg">
      <Title order={1} lineClamp={2}>
        Create new event
      </Title>
    </Stack>
  );
}

function Thing() {
  return (
    <Card>
      <CreateNewEventTitle />
    </Card>
  );
}

export default function Index() {
  return (
    <Stack spacing="xs">
      <Thing />
      <CreateEvent />
    </Stack>
  );
}
