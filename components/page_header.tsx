import { Title } from "@mantine/core";

import Container from "./container";

export function PageHeader() {
  return (
    <Container fluid>
      <Title order={4} m={0}>
        Find a Date Everyone Can Do
      </Title>
    </Container>
  );
}
