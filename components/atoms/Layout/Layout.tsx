/**
 * Layout.tsx
 */

import { type ReactNode } from "react";
import {
  Anchor,
  AppShell,
  Container,
  Header as MantineHeader,
} from "@mantine/core";
import { Logo } from "../Logo";

const HEADER_HEIGHT = 100;

/**
 *
 * @param root0
 * @param root0.children
 */
export function Layout({ children }: { children: ReactNode }) {
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
          },
        })}
      >
        {children}
      </Container>
    </AppShell>
  );
}

/**
 * Header component
 */
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
          justifyContent: "space-between",
        })}
      >
        <Anchor
          href="/"
          color="black"
          underline={false}
          sx={{ display: "flex", alignItems: "center" }}
        >
          <Logo />
        </Anchor>
      </Container>
    </MantineHeader>
  );
}
