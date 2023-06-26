import dayjs from "dayjs";
import { Group, Spoiler, Table, Text } from "@mantine/core";
import Card from "./card";
import EventContext from "@/app/event";
import { IconCalendar } from "@tabler/icons-react";

export default function OtherOkDatesCard() {
  const event = EventContext.useContainer();
  const user_count = Object.keys(event.users).length;

  const dates = Object.entries(event.date_counts)
    .filter((entry) => entry[1] !== user_count)
    .sort((a, b) => {
      return new Date(a[0]).valueOf() - new Date(b[0]).valueOf();
    })
    .sort((a, b) => {
      return b[1] - a[1];
    })
    .map((entry) => ({
      date: entry[0],
      count: entry[1],
      who_cant_go: Object.values(event.users)
        .filter((user) => !user.dates.includes(entry[0]))
        .map((user) => user.name),
    }));

  const note = !user_count
    ? "No one has marked their availability yet."
    : user_count < 2
    ? "This will populate once 2 people have marked their availability."
    : "The following dates could work too, though not everyone can make them.";

  return (
    <Card title="Other ok dates" note={note}>
      {dates.length > 4 ? (
        <Spoiler
          maxHeight={180}
          showLabel={
            <Text fz="sm" m="xs">
              Show more
            </Text>
          }
          hideLabel={
            <Text fz="sm" m="xs">
              Show less
            </Text>
          }
        >
          <DateTable data={dates} />
        </Spoiler>
      ) : dates.length > 0 ? (
        <DateTable data={dates} />
      ) : null}
    </Card>
  );
}

function DateTable({
  data,
}: {
  data: Array<{ date: string; count: number; who_cant_go: Array<string> }>;
}) {
  const rows = data.map(({ date, count, who_cant_go }) => (
    <tr key={date}>
      <td>
        <Group noWrap>
          <IconCalendar size={14} /> {dayjs(date).format("LL")}
        </Group>
      </td>
      <td>{who_cant_go.join(", ")}</td>
    </tr>
  ));
  return (
    <Table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Who can't go</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
}
