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

export default function Index() {
  return (
    <>
      <PageHeader />
      <Container>
        <SimpleGrid spacing="md" breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
          <CreateNewEventTitle />
          <CreateEvent />
        </SimpleGrid>
      </Container>
    </>
  );
}
