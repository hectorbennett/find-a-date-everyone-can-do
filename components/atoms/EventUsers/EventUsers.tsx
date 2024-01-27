/**
 * EventUsers.tsx
 */

import { Table, createStyles } from "@mantine/core";
import { UserItem } from "../UserItem";
import { Card } from "../Card";

const useStyles = createStyles((_theme) => ({
  td: {
    maxWidth: 0,
  },
}));

/** Props for the event users component */
interface EventUsersProps {
  /** A list of users. */
  users: Array<{ id: string; name: string }>;
  /** The current logged in user. */
  currentUserId: string | null;
}

/**
 * Event users.
 */
export function EventUsers({ users, currentUserId }: EventUsersProps) {
  const { classes } = useStyles();

  const rows = users
    .sort((a, b) => {
      if (a.name > b.name) {
        return 1;
      }
      return -1;
    })
    .map((user) => (
      <tr key={user.id}>
        <td className={classes.td}>
          <UserItem
            name={user.name}
            isLoggedInUser={user.id === currentUserId}
          />
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
