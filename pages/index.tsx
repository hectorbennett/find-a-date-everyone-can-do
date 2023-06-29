import Container from "@/components/container";
import CreateEvent from "@/components/create_event";
import { SimpleGrid, Title } from "@mantine/core";

export default function Index() {
  return (
    <Container>
      <SimpleGrid spacing="md" breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
        <Title order={1}>Find a date everyone can do</Title>
        <CreateEvent />
      </SimpleGrid>
    </Container>
  );
}
