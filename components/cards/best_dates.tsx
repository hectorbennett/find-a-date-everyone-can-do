import { Box, Button, Group, Table, ThemeIcon } from "@mantine/core";
import { IconCalendar, IconStarFilled } from "@tabler/icons-react";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
dayjs.extend(isSameOrAfter);

import EventContext from "@/app/event";
import Card from "../card";
import { useState } from "react";
import UserCountBadge from "../user_count_badge";

export default function BestDates() {
  const [numberToShow, setNumberToShow] = useState(3);

  const event = EventContext.useContainer();
  const user_count = Object.keys(event.users).length;

  const today = dayjs();

  const dates = event.calendarDates
    .filter(
      ({ date, users }) =>
        users.length > user_count / 2 && date.isSameOrAfter(today, "day")
    )
    .sort((a, b) => {
      if (a.users.length < b.users.length) {
        return 1;
      } else if (a.users.length > b.users.length) {
        return -1;
      } else if (a.date.isSameOrAfter(b.date, "day")) {
        return 1;
      } else if (b.date.isSameOrAfter(a.date, "day")) {
        return -1;
      }
      return 0;
    });

  const rows = dates.slice(0, numberToShow).map(({ date, users }) => (
    <tr key={date.toString()}>
      <td>
        <Group>
          <Group sx={{ flex: 1 }}>
            {users.length === user_count ? (
              <ThemeIcon variant="light" radius="xl" color="yellow" size="xs">
                <IconStarFilled />
              </ThemeIcon>
            ) : (
              <ThemeIcon variant="light" radius="xl" color="gray" size="xs">
                <IconCalendar />
              </ThemeIcon>
            )}
            <Box>{dayjs(date).format("LL")}</Box>
          </Group>
          <Group spacing="xs">
            <UserCountBadge
              count={users.length}
              color={users.length === user_count ? "green" : "gray"}
            />
            {users.length !== user_count ? (
              <UserCountBadge
                inverse={true}
                count={user_count - users.length}
                color="red"
              />
            ) : null}
          </Group>
        </Group>
      </td>
    </tr>
  ));

  const note = !user_count
    ? "No one has marked their availability yet."
    : user_count < 2
    ? "This will populate once 2 people have marked their availability."
    : !dates.length
    ? "There are no good upcoming dates :("
    : undefined;

  return (
    <Card title="Best dates" note={note}>
      {rows.length && user_count >= 2 ? (
        <Table>
          <tbody>{rows}</tbody>
        </Table>
      ) : null}
      {dates.length > rows.length ? (
        <ShowMoreButton onClick={() => setNumberToShow((n) => n + 3)} />
      ) : null}
    </Card>
  );
}

function ShowMoreButton({ onClick }: { onClick: () => void }) {
  return (
    <Button m="xs" onClick={onClick}>
      Show more
    </Button>
  );
}
