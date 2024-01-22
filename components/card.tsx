import { Text, Card as MantineCard, Stack, Title } from "@mantine/core";
import type { ReactNode } from "react";

interface CardProps {
  title?: string;
  note?: string;
  children?: ReactNode;
}

export default function Card({ title, note, children }: CardProps) {
  return (
    <MantineCard
      shadow="none"
      radius={0}
      sx={(theme) => ({
        padding: theme.spacing.xs,
        background: "none",
      })}
      padding={0}
    >
      {(title || note) && (
        <MantineCard.Section withBorder p="xs">
          <Stack spacing="xs">
            {title && (
              <Title order={3} color="green.2">
                {title}
              </Title>
            )}
            {note && (
              <Text c="dimmed" fz="sm">
                {note}
              </Text>
            )}
          </Stack>
        </MantineCard.Section>
      )}
      {children ? (
        <MantineCard.Section inheritPadding>{children}</MantineCard.Section>
      ) : null}
    </MantineCard>
  );
}
