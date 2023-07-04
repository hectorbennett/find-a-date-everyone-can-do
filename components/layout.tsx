import { AppShell, Container, Header, Title } from "@mantine/core";
import type { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <AppShell
      p={0}
      header={
        <Header height={40}>
          <Container
            fluid
            sx={(theme) => ({
              background: theme.colors.dark,
              color: theme.colors.gray[1],
              height: "100%",
              display: "flex",
              alignItems: "center",
            })}
          >
            <Title order={4} m={0}>
              Find a Date Everyone Can Do
            </Title>
          </Container>
        </Header>
      }
      styles={(theme) => ({
        main: {
          paddingLeft: 0,
          paddingRight: 0,
          paddingTop: 40,
          paddingBottom: 0,
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[2],
        },
      })}
    >
      {/* <PageHeader /> */}
      {children}
    </AppShell>
  );
}
