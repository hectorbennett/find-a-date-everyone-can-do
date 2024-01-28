/**
 * UserItem.tsx
 */

import { Avatar, Badge, Box, Group, UnstyledButton } from "@mantine/core";

/**
 * UserItem props
 */
interface UserItemProps {
  /** User name */
  name: string;

  /** User is the currently logged in user */
  isLoggedInUser: boolean;

  /** Whether or not the user is focused and we are viewing all of their selected dates. */
  isFocused: boolean;

  /** On click to focus the user. */
  onClick: () => void;
}

/**
 * UserItem component.
 */
export function UserItem({
  name,
  isLoggedInUser,
  isFocused,
  onClick,
}: UserItemProps) {
  return (
    <UnstyledButton onClick={onClick}>
      <Group noWrap title={name}>
        <Avatar
          radius="xl"
          size="sm"
          color={isFocused ? "indigo" : undefined}
        />{" "}
        <Box
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            fontWeight: isFocused ? "bold" : "normal",
          }}
        >
          {name}
        </Box>
        {isLoggedInUser ? (
          <Badge color="violet" variant="light">
            You
          </Badge>
        ) : null}
      </Group>
    </UnstyledButton>
  );
}
