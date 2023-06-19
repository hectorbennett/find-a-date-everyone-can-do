import EventContext from "@/app/event";
import Card from "./card";
import { Avatar, Group, Table, Text } from "@mantine/core";

export default function AttendeesListCard() {
  const event = EventContext.useContainer();

  const rows = Object.values(event.attendees)
    .sort((a, b) => {
      if (a.name > b.name) {
        return 1;
      }
      return -1;
    })
    .map((user) => (
      <tr key={user.uid}>
        <td>
          <Group>
            <Avatar radius="xl" size="sm" /> {user.name}
          </Group>
        </td>
      </tr>
    ));

  const note = !rows.length
    ? "No one has marked their availability yet."
    : rows.length === 1
    ? "One person has so far marked their availability"
    : `${rows.length} people have so far marked their availability.`;

  return (
    <Card title="Going" note={note}>
      {rows.length ? (
        <Table>
          <tbody>{rows}</tbody>
        </Table>
      ) : null}
    </Card>
  );
}
