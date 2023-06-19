import EventContext from "@/app/event";
import Card from "./card";
import { Avatar, Group, Table, Text } from "@mantine/core";

export default function AttendeesListCard() {
  const event = EventContext.useContainer();

  if (!event.attendees.length) {
    return <Text>No one has marked their availability yet.</Text>;
  }

  const rows = event.attendees.map((name) => (
    <tr key={name}>
      <td>
        <Group>
          <Avatar radius="xl" size="sm" /> {name}
        </Group>
      </td>
    </tr>
  ));

  const note = !event.attendees.length
    ? "No one has marked their availability yet."
    : event.attendees.length === 1
    ? "One person has so far marked their availability"
    : `${event.attendees.length} people have so far marked their availability.`;

  return (
    <Card title="Going" note={note}>
      <Table>
        <tbody>{rows}</tbody>
      </Table>
    </Card>
  );
}
