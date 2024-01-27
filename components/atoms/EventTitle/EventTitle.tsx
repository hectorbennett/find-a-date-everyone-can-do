/**
 * EventTitle.tsx
 */

import { Title, Text, Group, Stack } from "@mantine/core";

import dayjs, { Dayjs } from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
dayjs.extend(relativeTime);
dayjs.extend(utc);

import { Card } from "../Card";
import { MobileShareButton } from "../MobileShareButton";

/**
 * Event title props
 */
interface EventTitleProps {
  /** Event name. */
  name: string;

  /** Event creation date. */
  creationDate: Dayjs;

  /** Show the mobile share button. */
  showMobileShareButton: boolean;

  /** Callback when the mobile-only share button is clicked. */
  onClickMobileShare: () => void;
}

/**
 * Event title.
 */
export function EventTitle({
  name,
  creationDate,
  showMobileShareButton,
  onClickMobileShare,
}: EventTitleProps) {
  const note = `Created ${dayjs.utc(creationDate).fromNow()}`;

  return (
    <Card>
      <Group p="xs">
        <Stack sx={{ flex: 1 }}>
          <Title order={2} weight={400}>
            {name}
          </Title>
          <Text c="dimmed" fz="sm">
            {note}
          </Text>
        </Stack>
        {showMobileShareButton && (
          <MobileShareButton onClickShare={onClickMobileShare} />
        )}
      </Group>
    </Card>
  );
}
