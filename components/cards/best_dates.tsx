import { Group, Table, ThemeIcon } from "@mantine/core";
import { IconStarFilled } from "@tabler/icons-react";
import dayjs from "dayjs";
import EventContext from "@/app/event";
import Card from "../card";

export default function BestDates() {
  const event = EventContext.useContainer();
  const user_count = Object.keys(event.users).length;

  const dates = Object.entries(event.date_counts)
    .filter((entry) => entry[1] === user_count)
    .sort((a, b) => {
      return new Date(a[0]).valueOf() - new Date(b[0]).valueOf();
    })
    .map((entry) => ({ date: entry[0], count: entry[1] }));

  const rows = dates.map(({ date }) => (
    <tr key={date}>
      <td>
        <Group>
          <ThemeIcon variant="light" radius="xl" color="yellow" size="xs">
            <IconStarFilled />
          </ThemeIcon>{" "}
          {dayjs(date).format("LL")}
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
    : dates.length === 1
    ? "There is only 1 date that everyone who has so far selected their dates can make."
    : `There are ${dates.length} dates that everyone who has so far selected their dates can make.`;

  return (
    <Card title="Best dates" note={note}>
      {dates.length && user_count >= 2 ? (
        <Table>
          <tbody>{rows}</tbody>
        </Table>
      ) : null}
    </Card>
  );
}
