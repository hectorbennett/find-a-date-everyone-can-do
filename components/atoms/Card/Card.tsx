/**
 * Card.tsx
 */

import { Text, Card as MantineCard, Stack, Title } from "@mantine/core";
import type { ReactNode } from "react";

interface CardProps {
  title?: string;
  note?: string;
  children?: ReactNode;
}

/**
 *
 * @param root0
 * @param root0.title
 * @param root0.note
 * @param root0.children
 */
export function Card({ title, note, children }: CardProps) {
  return (
    <MantineCard
      shadow="none"
      radius={0}
      sx={(theme) => ({
        padding: theme.spacing.xs,
      })}
      padding={0}
    >
      {(title || note) && (
        <MantineCard.Section withBorder p="xs">
          <Stack spacing="xs">
            {title && <Title order={3}>{title}</Title>}
            {note && <Text fz="sm">{note}</Text>}
          </Stack>
        </MantineCard.Section>
      )}
      {children ? (
        <MantineCard.Section inheritPadding>{children}</MantineCard.Section>
      ) : null}
    </MantineCard>
  );
}
