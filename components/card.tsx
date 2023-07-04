import { Text, Card as MantineCard, Stack } from "@mantine/core";
import type { ReactNode } from "react";

interface CardProps {
  title?: string;
  note?: string;
  children: ReactNode;
}

export default function Card({ title, note, children }: CardProps) {
  return (
    <MantineCard
      shadow="none"
      withBorder={false}
      radius={0}
      sx={(theme) => ({
        padding: theme.spacing.xs,
        // background: "#EEEEFB",
        // Simplify media query writing with theme functions
        // [theme.fn.largerThan("xs")]: {
        //   padding: theme.spacing.xl,
        //   margin: "auto",
        // },
      })}
      padding={0}
    >
      {(title || note) && (
        <MantineCard.Section withBorder p="xs">
          <Stack spacing="xs">
            <Text weight={500}>{title}</Text>
            <Text c="dimmed" fz="sm">
              {note}
            </Text>
          </Stack>
        </MantineCard.Section>
      )}
      {children ? (
        <MantineCard.Section inheritPadding>{children}</MantineCard.Section>
      ) : null}
    </MantineCard>
  );
}
