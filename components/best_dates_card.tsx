import EventContext from "@/app/event";
import Card from "./card";
import dayjs from "dayjs";
import { Table, Text } from "@mantine/core";

export default function BestDatesCard() {
  return (
    <Card
      title="Best dates"
      note="Everyone who has marked their availability can make these dates"
    >
      <DatesEveryoneCanDo />
    </Card>
  );
}

function DatesEveryoneCanDo() {
  const event = EventContext.useContainer();
  const user_count = event.attendees.length;

  const dates = Object.entries(event.date_counts)
    .filter((entry) => entry[1] === user_count)
    .sort((a, b) => {
      return new Date(a[0]).valueOf() - new Date(b[0]).valueOf();
    })
    .map((entry) => ({ date: entry[0], count: entry[1] }));

  if (!dates.length) {
    return <Text>There are no dates everyone can do :(</Text>;
  }

  const rows = dates.map(({ date }) => (
    <tr key={date}>
      <td>{dayjs(date).format("LL")}</td>
    </tr>
  ));
  return (
    <Table>
      <tbody>{rows}</tbody>
    </Table>
  );
}
