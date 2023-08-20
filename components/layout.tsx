import { AppShell, Container } from "@mantine/core";
import { type ReactNode } from "react";
import { belanosima, open_sans } from "@/app/fonts";
import Header from "./Header";

const HEADER_HEIGHT = 100;

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <AppShell
      className={[belanosima.className, open_sans.className].join(" ")}
      p={0}
      header={<Header />}
      styles={(theme) => ({
        main: {
          paddingLeft: 0,
          paddingRight: 0,
          paddingTop: HEADER_HEIGHT,
          paddingBottom: 0,
          backgroundColor: theme.colors.purple[8],
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
