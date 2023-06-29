import { Text, Card as MantineCard, Stack } from "@mantine/core";
import type { ReactNode } from "react";

interface CardProps {
  title: string;
  note: string;
  children: ReactNode;
}

export default function Card({ title, note, children }: CardProps) {
  return (
    <MantineCard withBorder shadow="sm" radius="md">
      <MantineCard.Section inheritPadding withBorder p="md">
        <Stack spacing="xs">
          <Text weight={500}>{title}</Text>
          <Text c="dimmed" fz="sm">
            {note}
          </Text>
        </Stack>
      </MantineCard.Section>
      {children ? (
        <MantineCard.Section inheritPadding p="sm">
          {children}
        </MantineCard.Section>
      ) : null}
    </MantineCard>
  );
}
