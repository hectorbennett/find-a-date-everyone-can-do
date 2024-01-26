/**
 * StyledCalendar.tsx
 */

import { useRef } from "react";
import { Badge, Box } from "@mantine/core";
import {
  CalendarProps as MantineCalendarProps,
  Calendar as MantineCalendar,
} from "@mantine/dates";
import { IconUser, IconUsers } from "@tabler/icons-react";
import { getHeatColour, useSwipe } from "@/app/utils";

/**
 * StyledCalendar props
 */
interface StyledCalendarProps extends MantineCalendarProps {
  getDayProps?: (date: Date) => {
    selected?: boolean;
    onClick?: () => void;
    selectionCount?: number;
    heat?: number;
  };
}

/**
 *
 * @param props
 */
export function StyledCalendar(props: StyledCalendarProps) {
  const ref = useRef<HTMLDivElement>(null);

  const swipeHandlers = useSwipe({
    onSwipedLeft: () => {
      const nextButton: HTMLButtonElement | null =
        ref.current?.querySelector("button[data-next]") || null;
      if (nextButton) {
        nextButton.click();
      }
    },
    onSwipedRight: () => {
      const previousButton: HTMLButtonElement | null =
        ref.current?.querySelector("button[data-previous]") || null;
      if (previousButton) {
        previousButton.click();
      }
    },
  });

  return (
    <MantineCalendar
      {...swipeHandlers}
      placeholder={null}
      ref={ref}
      withCellSpacing={false}
      size="xl"
      styles={(theme) => ({
        monthLevel: {
          width: "100%",
        },
        monthCell: {
          padding: 0,
          margin: 0,
          border: `1px solid white`,
          [theme.fn.largerThan("xs")]: {
            borderWidth: "2px",
          },
        },
        month: {
          width: "100%",
        },
        monthsList: {
          width: "100%",
        },
        monthsListCell: {
          border: `1px solid white`,
          [theme.fn.largerThan("xs")]: {
            borderWidth: "2px",
          },
        },
        yearLevel: {
          width: "100%",
        },
        yearsList: {
          width: "100%",
        },
        yearsListCell: {
          border: `1px solid white`,
          [theme.fn.largerThan("xs")]: {
            borderWidth: "2px",
          },
        },
        decadeLevel: {
          width: "100%",
        },
        day: {
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          borderRadius: 0,
          fontSize: theme.fontSizes.sm,
          overflow: "hidden",
          width: "100%",
          height: "auto",
          background: "#EBECFD",
          color: theme.colors.dark,
          "&[data-weekend]": {
            color: "unset",
          },
          "&[data-outside]": {
            background: theme.colors.gray[2],
            color: theme.colors.gray[6],
          },
          "&[data-selected][data-outside]": {
            background: "none",
            color: theme.colors.gray[6],
          },
          "&[data-selected]": {
            color: "unset",
          },
          "&:hover": {
            background: "none",
          },
          "&[data-selected]:hover": {
            background: "none",
          },
        },
        calendarHeader: {
          maxWidth: "100%",
        },
        calendarHeaderLevel: {
          justifyContent: "flex-start",
          paddingLeft: theme.spacing.sm,
        },
        calendarHeaderControl: {
          order: 1,
          borderRadius: 0,
        },
        pickerControl: {
          width: "100%",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          padding: theme.spacing.xs,
          fontSize: theme.fontSizes.sm,
          background: "#EBECFD",
          borderRadius: 0,
        },
        weekday: {
          color: "black",
          fontSize: theme.fontSizes.sm,
        },
      })}
      renderDay={(date) => {
        const day = date.getDate();
        const selected =
          (props.getDayProps && props.getDayProps(date).selected) || false;
        const heat = (props.getDayProps && props.getDayProps(date).heat) || 0;

        const selectionCount =
          (props.getDayProps && props.getDayProps(date).selectionCount) || 0;
        return <Day day={day} selected={selected} heat={heat} />;
      }}
      {...props}
      getDayProps={
        !props.getDayProps
          ? undefined
          : (date) => {
              let dayProps = props.getDayProps ? props.getDayProps(date) : {};
              return {
                onClick: dayProps.onClick,
                selected: dayProps.selected,
              };
            }
      }
    />
  );
}

/**
 *
 * @param root0
 * @param root0.day
 * @param root0.selected
 * @param root0.heat
 * @param root0.selectionCount
 */
function Day({
  day,
  selected,
  heat,
}: {
  day: number;
  selected: boolean;
  heat: number;
}) {
  return (
    <Box
      sx={(theme) => ({
        width: "100%",
        height: "100%",
        position: "relative",
        "&:before": {
          content: "''",
          display: "block",
          paddingBottom: "100%",
          top: 0,
        },
        background: heat > 0 ? getHeatColour(heat) : "none",
        display: "flex",
        flexDirection: "column",
        border: selected ? "1px solid black" : "1px solid transparent",
        [theme.fn.largerThan("xs")]: {
          borderWidth: "2px",
        },
      })}
    >
      <Box sx={{ position: "absolute" }}>
        <DayLabel day={day} />
        <Box
          sx={{
            flex: 1,
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
          }}
        ></Box>
      </Box>
    </Box>
  );
}

/**
 *
 * @param root0
 * @param root0.selected
 * @param root0.day
 */
function DayLabel({ day }: { day: number }) {
  return (
    <Box
      sx={(theme) => ({
        width: "100%",
        padding: 8,
        fontSize: theme.fontSizes.xs,
        fontWeight: "bold",
      })}
    >
      {day}
    </Box>
  );
}

/**
 *
 * @param root0
 * @param root0.heat
 * @param root0.selectionCount
 */
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
