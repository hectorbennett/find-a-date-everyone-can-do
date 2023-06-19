import EventContext from "@/app/event";
import Card from "./card";
import { Table, Text } from "@mantine/core";

export default function AttendeesListCard() {
  return (
    <Card
      title="Going"
      note="The following people have marked their availability"
    >
      <AttendeesList />
    </Card>
  );
}

function AttendeesList() {
  const event = EventContext.useContainer();

  if (!event.attendees.length) {
    return <Text>No one has marked their availability yet.</Text>;
  }

  const rows = event.attendees.map((name) => (
    <tr key={name}>
      <td>{name}</td>
    </tr>
  ));

  return (
    <Table>
      <tbody>{rows}</tbody>
    </Table>
  );
}
