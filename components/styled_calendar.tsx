import { getHeatColour } from "../app/utils";
import { Badge, Box, Checkbox, rem } from "@mantine/core";
import { CalendarProps, Calendar as MantineCalendar } from "@mantine/dates";
import { IconStarFilled, IconUser, IconUsers } from "@tabler/icons-react";

const CALENDAR_BACKGROUND = "#EEEEFB";
const CALENDAR_DAY_UNSELECTED = "#dedef0";
const CALENDAR_DAY_UNSELECTED_HOVER = "#c2c2ea";

interface StyledCalendarProps extends CalendarProps {
  getDayProps?: (date: Date) => {
    selected?: boolean;
    onClick?: () => void;
    selectionCount?: number;
    heat?: number;
  };
}

export default function StyledCalendar(props: StyledCalendarProps) {
  return (
    <MantineCalendar
      withCellSpacing={false}
      size="xl"
      styles={(theme) => ({
        calendar: {
          // backgroundColor: CALENDAR_BACKGROUND,
          // padding: theme.spacing.md,
        },
        monthLevel: {
          width: "100%",
        },
        monthCell: {
          padding: 0,
          margin: 0,
          // border: `1px solid ${theme.colors.gray[2]}`,
        },
        month: {
          width: "calc(100% + 5px)",
          margin: -2.5,
        },
        monthsList: {
          margin: -2.5,
        },
        yearsList: {
          margin: -5,
        },
        day: {
          display: "flex",
          background: "none",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          // padding: 2.5,
          borderRadius: 0,
          fontSize: theme.fontSizes.sm,
          overflow: "hidden",
          width: "100%",
          height: "4.5rem",
          "&[data-weekend]": {
            color: "unset",
          },
          "&[data-outside]": {
            color: "unset",
          },
          "&[data-selected]": {
            background: "none",
            color: "white",
            // outline: "1px solid black",
          },
          "&:hover": {
            background: "none",
            filter: "brightness(85%) contrast(120%)",
          },
          "&[data-selected]:hover": {
            background: "none",
            color: "white",
          },
        },
        calendarHeader: {
          maxWidth: "100%",
        },
        calendarHeaderLevel: {
          justifyContent: "flex-start",
          paddingLeft: theme.spacing.sm,
          // "&:hover": {
          //   backgroundColor: CALENDAR_DAY_UNSELECTED_HOVER,
          // },
        },
        calendarHeaderControl: {
          order: 1,
          // "&:hover": {
          //   backgroundColor: CALENDAR_DAY_UNSELECTED_HOVER,
          // },
        },
        pickerControl: {
          // backgroundColor: CALENDAR_DAY_UNSELECTED,
          alignItems: "flex-start",
          justifyContent: "flex-start",
          padding: theme.spacing.xs,
          margin: 5,
          fontSize: theme.fontSizes.sm,
          // "&:hover": {
          //   backgroundColor: CALENDAR_DAY_UNSELECTED_HOVER,
          // },
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
        return (
          <Day
            day={day}
            selected={selected}
            heat={heat}
            selectionCount={selectionCount}
          />
        );
      }}
      {...props}
    />
  );
}

function Day({
  day,
  selected,
  heat,
  selectionCount,
}: {
  day: number;
  selected: boolean;
  heat: number;
  selectionCount: number;
}) {
  return (
    <Box
      sx={(theme) => ({
        width: "100%",
        height: "100%",
        background: heat > 0 ? getHeatColour(heat) : "none",
        // borderRadius: theme.radius.sm,
        color: "#274803",
        display: "flex",
        flexDirection: "column",
        // border: selected ? "1px solid black" : "2px solid transparent",
      })}
    >
      <DayLabel day={day} selected={selected} />
      <Box
        sx={{
          flex: 1,
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <SelectedCheckbox selected={selected} />
      </Box>
      <Box
        sx={{
          flex: 1,
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <UsersCountBadge heat={heat} selectionCount={selectionCount} />
      </Box>
    </Box>
  );
}

function DayLabel({ selected, day }: { selected: boolean; day: number }) {
  return (
    <Box
      sx={(theme) => ({
        width: "100%",
        paddingTop: "0.2rem",
        // paddingBottom: 4,
        // margin: rem(0.1),
        textAlign: "center",
        fontSize: theme.fontSizes.xs,
        fontWeight: selected ? "bold" : undefined,
      })}
    >
      {day}
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
