import EventContext from "@/app/event";
import CreateEvent from "@/components/create_event";
import { Container, SimpleGrid, Title } from "@mantine/core";

export default function Index() {
  return (
    <EventContext.Provider>
      <Container my="md">
        <SimpleGrid spacing="md" breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
          <Title order={1}>Find a date everyone can do</Title>
          <CreateEvent />
        </SimpleGrid>
      </Container>
    </EventContext.Provider>
  );
}
