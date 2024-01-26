/**
 * UserCountBadge.tsx
 */

import { Badge, Box, DefaultMantineColor } from "@mantine/core";
import { IconUser, IconUserX, IconUsers } from "@tabler/icons-react";

/**
 *
 * @param root0
 * @param root0.count
 * @param root0.color
 * @param root0.inverse
 */
export function UserCountBadge({
  count,
  color,
  inverse = false,
}: {
  count: number;
  color: DefaultMantineColor;
  inverse?: boolean;
}) {
  return (
    <Badge
      color={color}
      sx={{
        paddingLeft: "0.4rem",
        paddingRight: "0.4rem",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          flex: 1,
        }}
      >
        {inverse ? (
          <IconUserX size={13} />
        ) : count === 1 ? (
          <IconUser size={13} />
        ) : (
          <IconUsers size={13} />
        )}{" "}
        {count}
      </Box>
    </Badge>
  );
}
