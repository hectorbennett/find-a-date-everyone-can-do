import { Stack, Title } from "@mantine/core";
import Card from "@/components/card";
import CreateEvent from "@/components/create_event";

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
    </Stack>
  );
}
