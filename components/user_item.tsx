import { Avatar, Box, Group } from "@mantine/core";

export default function UserItem({ name }: { name: string }) {
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
    </Group>
  );
}
