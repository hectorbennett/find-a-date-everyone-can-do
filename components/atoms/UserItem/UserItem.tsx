/**
 * UserItem.tsx
 */

import { Avatar, Badge, Box, Group } from "@mantine/core";

/**
 * UserItem props
 */
interface UserItemProps {
  /** User name */
  name: string;

  /** User is the currently logged in user */
  isLoggedInUser: boolean;
}

/**
 * UserItem component.
 */
export function UserItem({
  name,
  isLoggedInUser: loggedInUser,
}: UserItemProps) {
  return (
    <Group noWrap title={name}>
      <Avatar radius="xl" size="sm" />{" "}
      <Box
        sx={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {name}
      </Box>
      {loggedInUser ? (
        <Badge color="violet" variant="light">
          You
        </Badge>
      ) : null}
    </Group>
  );
}
