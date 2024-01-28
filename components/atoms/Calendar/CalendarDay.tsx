/**
 * CalendarDay.tsx
 */

import { Box, Text, UnstyledButton } from "@mantine/core";
import type { Dayjs } from "dayjs";
import { getHeatColour } from "@/app/utils";
import chroma from "chroma-js";

interface GetBackgroundColourArgs {
  heat: number;
  isOutsideActiveMonth: boolean;
  isInPast: boolean;
}

/**
 * Get the calendar day background colour. TODO: do with pure css.
 */
const getBackgroundColour = ({
  heat,
  isOutsideActiveMonth,
  isInPast,
}: GetBackgroundColourArgs) => {
  let initialColour = (() => {
    if (heat) {
      return getHeatColour(heat);
    } else if (isOutsideActiveMonth) {
      return "lightgrey";
    }
    return "#dbdef7";
  })();

  // if (isInPast) {
  //   return chroma(initialColour).darken(0).desaturate(1).toString();
  // }
  return initialColour;
};

/** Props for a calendar day. */
interface DayProps {
  date: Dayjs;
  isOutsideActiveMonth: boolean;
  isSelected: boolean;
  isInPast: boolean;
  isToday: boolean;
  heat: number;
  selectionCount: number;
  onClick: () => void;
  /** Whether the focus user has selected this day or not. */
  isSelectedByFocusedUser: boolean;
}

/**
 * Calendar day component
 */
export function CalendarDay({
  date,
  isOutsideActiveMonth,
  isSelected,
  isInPast,
  isToday,
  heat,
  onClick,
  isSelectedByFocusedUser,
}: DayProps) {
  return (
    <UnstyledButton
      aria-label={date.format("LL")}
      style={{
        background: getBackgroundColour({
          heat,
          isOutsideActiveMonth,
          isInPast,
        }),
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
        border: isSelectedByFocusedUser
          ? "5px solid #4c6ef5"
          : isSelected
            ? "1px solid black"
            : "1px solid transparent",
      })}
    >
      <Box sx={{ position: "absolute" }}>
        <DayLabel
          date={date}
          isOutside={isOutsideActiveMonth}
          isSelected={isSelected}
          isToday={isToday}
          isInPast={isInPast}
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
  isInPast,
}: {
  date: Dayjs;
  isOutside: boolean;
  isSelected: boolean;
  isToday: boolean;
  isInPast: boolean;
}) {
  return (
    <Box
      sx={(theme) => ({
        width: "100%",
        padding: 8,
        fontSize: theme.fontSizes.xs,
        fontWeight: isInPast ? "normal" : "bold",
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
