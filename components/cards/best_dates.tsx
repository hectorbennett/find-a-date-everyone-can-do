import { Box, Button, Group, Table, ThemeIcon } from "@mantine/core";
import { IconCalendar, IconStarFilled } from "@tabler/icons-react";
import dayjs from "dayjs";
import EventContext from "@/app/event";
import Card from "../card";
import { useState } from "react";
import UserCountBadge from "../user_count_badge";

export default function BestDates() {
  const [numberToShow, setNumberToShow] = useState(3);

  const event = EventContext.useContainer();
  const user_count = Object.keys(event.users).length;

  const dates = Object.entries(event.date_counts)
    .filter((entry) => entry[1] > user_count / 2)
    .sort((a, b) => {
      if (a[1] < b[1]) {
        return 1;
      } else if (a[1] > b[1]) {
        return -1;
      }
      return new Date(a[0]).valueOf() - new Date(b[0]).valueOf();
    })

    .map((entry) => ({ date: entry[0], count: entry[1] }));

  const rows = dates.slice(0, numberToShow).map(({ date, count }) => (
    <tr key={date}>
      <td>
        <Group>
          <Group sx={{ flex: 1 }}>
            {count === user_count ? (
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
              count={count}
              color={count === user_count ? "green" : "gray"}
            />
            {count !== user_count ? (
              <UserCountBadge
                inverse={true}
                count={user_count - count}
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
    ? "There are no dates everyone can make."
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
