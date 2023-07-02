import { getDateString } from "../app/utils";
import { Box, Indicator, rem } from "@mantine/core";
import { Calendar as MantineCalendar } from "@mantine/dates";
import {
  IconCheck,
  IconCircleCheck,
  IconCircleCheckFilled,
} from "@tabler/icons-react";

const CALENDAR_BACKGROUND = "#EEEEFB";
const CALENDAR_DAY_UNSELECTED = "#dedef0";
const CALENDAR_DAY_UNSELECTED_HOVER = "#c2c2ea";

interface DateCounts {
  selected: boolean;
  user_selection_count: number;
}

interface CalendarProps {
  user_count: number;
  dates: { [key: string]: DateCounts };
}

export default function Calendar2(props: CalendarProps) {
  const dateIsSelected = (date: Date) => {
    return props.dates[getDateString(date)]?.selected || false;
  };

  return (
    <MantineCalendar
      styles={(theme) => ({
        calendar: {
          backgroundColor: CALENDAR_BACKGROUND,
          display: "inline-block",
          padding: theme.spacing.md,
        },
        monthCell: {
          padding: theme.spacing.xl,
          margin: 10,
        },
        month: {
          margin: -5,
        },
        monthsList: {
          margin: -5,
        },
        yearsList: {
          margin: -5,
        },
        day: {
          backgroundColor: CALENDAR_DAY_UNSELECTED,
          alignItems: "flex-start",
          justifyContent: "flex-start",
          margin: 5,
          fontSize: theme.fontSizes.sm,
          "&[data-weekend]": {
            color: "unset",
          },
          "&[data-outside]": {
            color: "unset",
          },
          "&[data-selected]": {
            backgroundColor: CALENDAR_DAY_UNSELECTED_HOVER,
            color: "white",
          },
          "&:hover": {
            backgroundColor: "#c2c2ea",
          },
          "&[data-selected]:hover": {
            backgroundColor: "#7376ca",
            color: "white",
          },
        },
        calendarHeader: {
          maxWidth: "100%",
        },
        calendarHeaderLevel: {
          justifyContent: "flex-start",
          paddingLeft: theme.spacing.sm,
          "&:hover": {
            backgroundColor: CALENDAR_DAY_UNSELECTED_HOVER,
          },
        },
        calendarHeaderControl: {
          order: 1,
          "&:hover": {
            backgroundColor: CALENDAR_DAY_UNSELECTED_HOVER,
          },
        },
        pickerControl: {
          backgroundColor: CALENDAR_DAY_UNSELECTED,
          alignItems: "flex-start",
          justifyContent: "flex-start",
          padding: theme.spacing.xs,
          margin: 5,
          fontSize: theme.fontSizes.sm,
          "&:hover": {
            backgroundColor: CALENDAR_DAY_UNSELECTED_HOVER,
          },
        },
        weekday: {
          color: "black",
          fontSize: theme.fontSizes.sm,
        },
      })}
      size="xl"
      renderDay={(date) => {
        const day = date.getDate();
        return <Day day={day} selected={dateIsSelected(date)} />;
      }}
      getDayProps={(date) => ({
        selected: dateIsSelected(date),
      })}
      {...props}
    />
  );
}

function Day({ day, selected }: { day: number; selected: boolean }) {
  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={(theme) => ({
          width: "100%",
          height: "100%",
          borderRadius: "100%",
          padding: theme.spacing.xs,
          paddingBottom: 4,
          margin: rem(0.1),
        })}
      >
        {day}
      </Box>
      {selected ? (
        <Box
          sx={{
            width: "100%",
            textAlign: "center",
          }}
        >
          <IconCircleCheckFilled size={13} />
        </Box>
      ) : null}
    </Box>
  );
}
