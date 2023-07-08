import {
  Anchor,
  AppShell,
  Container,
  Header as MantineHeader,
  Skeleton,
  Title,
  UnstyledButton,
} from "@mantine/core";
import type { ReactNode } from "react";

const HEADER_HEIGHT = 100;

function Logo() {
  return <Skeleton height={50} circle mr="sm" animate={false} />;
}

function Header() {
  return (
    <MantineHeader height={HEADER_HEIGHT}>
      <Container
        fluid
        sx={(theme) => ({
          background: theme.colors.gray[0],
          // color: theme.colors.gray[1],
          height: "100%",
          display: "flex",
          alignItems: "center",
        })}
      >
        <Anchor
          href="/"
          color="black"
          underline={false}
          sx={{ display: "flex", alignItems: "center" }}
        >
          <Logo />
          <Title order={6} m={0} sx={{ maxWidth: 80 }}>
            Find a Date Everyone Can Do
          </Title>
        </Anchor>
      </Container>
    </MantineHeader>
  );
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <AppShell
      p={0}
      header={<Header />}
      styles={(theme) => ({
        main: {
          paddingLeft: 0,
          paddingRight: 0,
          paddingTop: HEADER_HEIGHT,
          paddingBottom: 0,
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[2],
        },
      })}
    >
      <Container
        sx={(theme) => ({
          padding: 0,
          maxWidth: "70rem",
          [theme.fn.largerThan("xs")]: {
            padding: theme.spacing.xl,
            // margin: "auto",
          },
        })}
      >
        {/* <PageHeader /> */}
        {children}
      </Container>
    </AppShell>
  );
}
