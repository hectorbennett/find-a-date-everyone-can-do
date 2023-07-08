// import { getHeatColour } from "@/app/utils";
import { getHeatColour } from "../../app/utils";
import { Badge, Box, Checkbox, Text, UnstyledButton } from "@mantine/core";
import { IconUser, IconUsers } from "@tabler/icons-react";
import type { Dayjs } from "dayjs";

export default function Day({
  date,
  outside,
  selected,
  heat,
  selectionCount,
  onClick,
}: {
  date: Dayjs;
  outside: boolean;
  selected: boolean;
  heat: number;
  selectionCount: number;
  onClick: () => void;
}) {
  return (
    <UnstyledButton
      style={{
        background: heat > 0 ? getHeatColour(heat) : "dbdef7",
      }}
      onClick={onClick}
      sx={(theme) => ({
        width: "100%",
        // background: outside ? "lightgrey" : "#dbdef7",
        height: "100%",
        position: "relative",
        "&:before": {
          content: "''",
          display: "block",
          paddingBottom: "100%",
          top: 0,
        },
        display: "flex",
        flexDirection: "column",
        border: selected ? "1px solid black" : "1px solid transparent",
      })}
    >
      <Box sx={{ position: "absolute" }}>
        <DayLabel date={date} outside={outside} selected={selected} />
        <Box
          sx={{
            flex: 1,
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {/* <SelectedCheckbox selected={selected} /> */}
        </Box>
        {/* <Box
          sx={{
            flex: 1,
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <UsersCountBadge heat={heat} selectionCount={selectionCount} />
        </Box> */}
      </Box>
    </UnstyledButton>
  );
}

function DayLabel({
  date,
  outside,
  selected,
}: {
  date: Dayjs;
  outside: boolean;
  selected: boolean;
}) {
  return (
    <Box
      sx={(theme) => ({
        width: "100%",
        padding: 8,
        // paddingBottom: 4,
        // margin: rem(0.1),
        // textAlign: "center",
        fontSize: theme.fontSizes.xs,
        // fontWeight: selected ? "bold" : undefined,
        fontWeight: "bold",
        color: outside ? "grey" : "black",
      })}
    >
      <Text>
        {date.date()} {outside}
      </Text>
    </Box>
  );
}

function UsersCountBadge({
  heat,
  selectionCount,
}: {
  heat: number;
  selectionCount: number;
}) {
  if (!selectionCount) {
    return null;
  }
  return (
    <Badge
      color={heat === 1 ? "yellow" : "green"}
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
        {selectionCount === 1 ? (
          <IconUser size={13} />
        ) : (
          <IconUsers size={13} />
        )}{" "}
        {selectionCount}
      </Box>
    </Badge>
  );
}

function SelectedCheckbox({ selected }: { selected: boolean }) {
  if (!selected) {
    return null;
  }
  return <Checkbox color="green" size="xs" checked readOnly />;
}
