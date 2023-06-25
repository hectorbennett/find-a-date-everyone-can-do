import dayjs from "dayjs";
import { Spoiler, Table } from "@mantine/core";
import Card from "./card";
import EventContext from "@/app/event";

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
    .map((entry) => ({ date: entry[0], count: entry[1] }));


  return (
    <Card
      title="Other ok dates"
      note="The following dates could work too, though not everyone can make them."
    >
      {dates.length ? <Spoiler maxHeight={180} showLabel="Show more" hideLabel="Hide">
        <DateTable data={dates} />
      </Spoiler> : null}
    </Card>
  );
}


function DateTable({ data }: { data: Array<{ date: string; count: number }> }) {
  const rows = data.map(({ date, count }) => (
    <tr key={date}>
      <td>{dayjs(date).format("LL")}</td>
      <td>{count}</td>
    </tr>
  ));
  return (
    <Table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Who can't attend</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
}
