import { Title } from "@mantine/core";

import Container from "./container";

export function PageHeader() {
  return (
    <Container
      fluid
      p="xs"
      sx={(theme) => ({
        backgroundColor: theme.colors.purple[8],
        // background: theme.colors.dark,
        // color: theme.colors.gray[0],
      })}
    >
      <Title order={4} m={0}>
        Find a Date Everyone Can Do
      </Title>
    </Container>
  );
}
