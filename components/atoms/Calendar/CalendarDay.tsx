/**
 * CalendarDay.tsx
 */

import { getHeatColour } from "../../../app/utils";
import { Box, Text, UnstyledButton } from "@mantine/core";
import type { Dayjs } from "dayjs";

const getBackgroundColour = (heat: number, outside: boolean) => {
  if (heat) {
    return getHeatColour(heat);
  } else if (outside) {
    return "lightgrey";
  }
  return "#dbdef7";
};

interface DayProps {
  date: Dayjs;
  isOutside: boolean;
  isSelected: boolean;
  isInPast: boolean;
  isToday: boolean;
  heat: number;
  selectionCount: number;
  onClick: () => void;
}

/**
 *
 * @param root0
 * @param root0.date
 * @param root0.isOutside
 * @param root0.isSelected
 * @param root0.isInPast
 * @param root0.isToday
 * @param root0.heat
 * @param root0.onClick
 */
export function CalendarDay({
  date,
  isOutside,
  isSelected,
  isInPast,
  isToday,
  heat,
  onClick,
}: DayProps) {
  return (
    <UnstyledButton
      style={{
        background: getBackgroundColour(heat, isOutside),
        opacity: isInPast ? 0.2 : 1,
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
        border: isSelected ? "1px solid black" : "1px solid transparent",
        // opacity: date 0.5,
      })}
    >
      <Box sx={{ position: "absolute" }}>
        <DayLabel
          date={date}
          isOutside={isOutside}
          isSelected={isSelected}
          isToday={isToday}
        />
        <Box
          sx={{
            flex: 1,
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
          }}
        ></Box>
      </Box>
    </UnstyledButton>
  );
}

/**
 *
 * @param root0
 * @param root0.date
 * @param root0.isOutside
 * @param root0.isSelected
 * @param root0.isToday
 */
function DayLabel({
  date,
  isOutside,
  isSelected,
  isToday,
}: {
  date: Dayjs;
  isOutside: boolean;
  isSelected: boolean;
  isToday: boolean;
}) {
  return (
    <Box
      sx={(theme) => ({
        width: "100%",
        padding: 8,
        fontSize: theme.fontSizes.xs,
        fontWeight: "bold",
        color: isOutside ? "grey" : "black",
      })}
    >
      <Box
        sx={{
          background: isToday ? "green" : "none",
          color: isToday ? "white" : "none",
          borderRadius: "100%",
          width: 20,
          height: 20,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text>{date.date()}</Text>
      </Box>
    </Box>
  );
}
