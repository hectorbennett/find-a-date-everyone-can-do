import { getHeatColour } from "../app/utils";
import { Badge, Box, rem } from "@mantine/core";
import { CalendarProps, Calendar as MantineCalendar } from "@mantine/dates";
import { IconUsers } from "@tabler/icons-react";

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
      size="xl"
      styles={(theme) => ({
        calendar: {
          backgroundColor: CALENDAR_BACKGROUND,
          padding: theme.spacing.md,
        },
        monthLevel: {
          width: "100%",
        },
        monthCell: {
          padding: theme.spacing.xl,
          margin: 10,
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
          background: "none",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          padding: 2.5,
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
  console.log("heat", heat);
  return (
    <Box
      sx={(theme) => ({
        width: "100%",
        height: "100%",
        background: getHeatColour(heat),
        borderRadius: theme.radius.sm,
        color: "#274803",
        display: "flex",
        flexDirection: "column",
      })}
    >
      <Box
        sx={(theme) => ({
          width: "100%",
          // height: "100%",
          // borderRadius: "100%",
          // padding: theme.spacing.xs,
          padding: "0.2rem",
          paddingBottom: 4,
          margin: rem(0.1),
          textAlign: "center",
          fontSize: theme.fontSizes.xs,
        })}
      >
        {day}
      </Box>
      {selected ? (
        <Box
          sx={{
            width: "100%",
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            // mixBlendMode: "difference",
          }}
        >
          {/* <IconCircleCheckFilled size={13} /> */}
          <Badge variant="outline" color="dark">
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              <IconUsers size={13} /> {selectionCount}
            </Box>
          </Badge>
        </Box>
      ) : null}
    </Box>
  );
}
