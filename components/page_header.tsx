import { Title } from "@mantine/core";

import Container from "./container";

export function PageHeader() {
  return (
    <Container>
      <Title order={4} m={0}>
        Find a date everyone can do
      </Title>
    </Container>
  );
}
