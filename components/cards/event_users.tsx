import EventContext from "@/app/event";
import Card from "../card";
import { Table, createStyles } from "@mantine/core";
import UserItem from "../user_item";

const useStyles = createStyles((_theme) => ({
  td: {
    maxWidth: 0,
  },
}));

/**
 *
 */
export default function EventUsers() {
  const event = EventContext.useContainer();
  const { classes } = useStyles();

  const rows = Object.values(event.users)
    .sort((a, b) => {
      if (a.name > b.name) {
        return 1;
      }
      return -1;
    })
    .map((user) => (
      <tr key={user.id}>
        <td className={classes.td}>
          <UserItem name={user.name} you={user.id === event.currentUser?.id} />
        </td>
      </tr>
    ));

  const note = !rows.length
    ? "No one has marked their availability yet."
    : rows.length === 1
      ? "One person has so far marked their availability."
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
