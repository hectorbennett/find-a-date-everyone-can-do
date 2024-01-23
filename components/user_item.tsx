import { Avatar, Badge, Box, Group } from "@mantine/core";

/**
 *
 * @param root0
 * @param root0.name
 * @param root0.you
 */
export default function UserItem({
  name,
  you,
}: {
  name: string;
  you: boolean;
}) {
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
      {you ? (
        <Badge color="violet" variant="light">
          You
        </Badge>
      ) : null}
    </Group>
  );
}
