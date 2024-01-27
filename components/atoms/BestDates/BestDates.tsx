/**
 * BestDates.tsx
 */

import { useState } from "react";
import { Box, Button, Group, Table, ThemeIcon } from "@mantine/core";
import { IconCalendar, IconStarFilled } from "@tabler/icons-react";

import dayjs, { Dayjs } from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import localizedFormat from "dayjs/plugin/localizedFormat";
dayjs.extend(isSameOrAfter);
dayjs.extend(localizedFormat);

import { Card, UserCountBadge } from "@/components/atoms";

/** BestDates props */
interface BestDatesProps {
  /** The total number of users.  */
  userCount: number;
  /** The selected dates and their counts. */
  dateCounts: Array<{ date: Dayjs; count: number }>;
}

/** The default number of dates to show. */
const DEFAULT_NUMBER_TO_SHOW = 3;

/**
 * Best Dates component.
 */
export function BestDates({ userCount, dateCounts }: BestDatesProps) {
  const [numberToShow, setNumberToShow] = useState(DEFAULT_NUMBER_TO_SHOW);

  const dates = dateCounts.sort((a, b) => {
    if (a.count < b.count) {
      return 1;
    } else if (a.count > b.count) {
      return -1;
    } else if (a.date.isSameOrAfter(b.date, "day")) {
      return 1;
    } else if (b.date.isSameOrAfter(a.date, "day")) {
      return -1;
    }
    return 0;
  });

  console.log(dates);

  const rows = dates.slice(0, numberToShow).map(({ date, count }) => (
    <tr key={date.toString()}>
      <td>
        <Group>
          <Group sx={{ flex: 1 }}>
            {count === userCount ? (
              <ThemeIcon variant="light" radius="xl" color="yellow" size="xs">
                <IconStarFilled />
              </ThemeIcon>
            ) : (
              <ThemeIcon variant="light" radius="xl" color="gray" size="xs">
                <IconCalendar />
              </ThemeIcon>
            )}
            <Box>{date.format("LL")}</Box>
          </Group>
          <Group spacing="xs">
            <UserCountBadge
              count={count}
              color={count === userCount ? "green" : "gray"}
            />
            {count !== userCount ? (
              <UserCountBadge
                inverse={true}
                count={userCount - count}
                color="red"
              />
            ) : null}
          </Group>
        </Group>
      </td>
    </tr>
  ));

  const showShowMoreButton = userCount > 1 && dates.length > rows.length;

  const note = !userCount
    ? "No one has marked their availability yet."
    : userCount < 2
      ? "This will populate once 2 people have marked their availability."
      : !dates.length
        ? "There are no good upcoming dates :("
        : undefined;

  return (
    <Card title="Best dates" note={note}>
      {rows.length && userCount >= 2 ? (
        <Table>
          <tbody>{rows}</tbody>
        </Table>
      ) : null}
      {showShowMoreButton ? (
        <Button m="xs" onClick={() => setNumberToShow((n) => n + 5)}>
          Show more
        </Button>
      ) : null}
    </Card>
  );
}
