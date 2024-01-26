/**
 * Calendar.tsx
 */

import { useState } from "react";
import dayjs from "dayjs";
import type { Dayjs } from "dayjs";
import { ActionIcon, Box, Text, Title } from "@mantine/core";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { Swiper } from "@/components/atoms";
import { CalendarDay } from "./CalendarDay";

type GetDayProps = (date: Dayjs) => {
  isSelected: boolean;
  onClick: () => void;
  selectionCount: number;
  heat: number;
  isToday: boolean;
  isInPast: boolean;
};

interface CalendarProps {
  getDayProps: GetDayProps;
  /** The date to open the calendar to. */
  initialFocusedDate: Dayjs;
}

/**
 *
 * @param root0
 * @param root0.getDayProps
 * @param root0.initialFocusedDate
 */
export function Calendar({ getDayProps, initialFocusedDate }: CalendarProps) {
  const [monthIndex, setMonthIndex] = useState(
    Math.floor(initialFocusedDate.diff(dayjs().startOf("month"), "month"))
  );

  return (
    <Box>
      <MonthHeader
        date={dayjs().add(monthIndex, "month")}
        onClickPrevious={() => setMonthIndex((i) => i - 1)}
        onClickNext={() => setMonthIndex((i) => i + 1)}
      />
      <Swiper
        index={monthIndex}
        setIndex={setMonthIndex}
        getContent={(i) => (
          <CalendarTable
            date={dayjs().add(i, "month")}
            getDayProps={getDayProps}
          />
        )}
      />
    </Box>
  );
}

/**
 *
 * @param root0
 * @param root0.date
 * @param root0.onClickPrevious
 * @param root0.onClickNext
 */
function MonthHeader({
  date,
  onClickPrevious,
  onClickNext,
}: {
  date: Dayjs;
  onClickPrevious: () => void;
  onClickNext: () => void;
}) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }} p="xs">
      <Title order={3} weight={300} sx={{ flex: 1 }}>
        {date.format("MMMM YYYY")}
      </Title>
      <ActionIcon size="xl" onClick={onClickPrevious}>
        <IconChevronLeft size="1rem" />
      </ActionIcon>
      <ActionIcon size="xl" onClick={onClickNext}>
        <IconChevronRight size="1rem" />
      </ActionIcon>
    </Box>
  );
}

/**
 *
 * @param root0
 * @param root0.date
 * @param root0.getDayProps
 */
export function CalendarTable({
  date,
  getDayProps,
}: {
  date: Dayjs;
  getDayProps: GetDayProps;
}) {
  const firstDayOfMonth = date.startOf("month");
  const dayOfWeekofFirstDayofMonth = firstDayOfMonth.day();
  const firstDateOnCalendar = firstDayOfMonth.subtract(
    dayOfWeekofFirstDayofMonth - 1,
    "day"
  );
  const daysBeforeMonth = dayOfWeekofFirstDayofMonth - 1;
  const daysInMonth = date.daysInMonth();
  const daysDuringMonth = daysBeforeMonth + daysInMonth;
  const numberOfDaysOnCalendar = Math.ceil(daysDuringMonth / 7) * 7;
  const dates = Array(numberOfDaysOnCalendar)
    .fill(null)
    .map((_, i) => firstDateOnCalendar.add(i, "day"));

  const weeks = chunks(dates, 7);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      <DayHeadings />
      {weeks.map((week) => (
        <Box key={week[0]} sx={{ display: "flex", gap: 1 }}>
          {week.map((d) => {
            const props = getDayProps(d);
            return (
              <CalendarDay
                key={d}
                date={d}
                isOutside={!d.isSame(date, "month")}
                isSelected={props.isSelected}
                isInPast={props.isInPast}
                isToday={props.isToday}
                heat={props.heat}
                selectionCount={props.selectionCount}
                onClick={props.onClick}
              />
            );
          })}
        </Box>
      ))}
    </Box>
  );
}

/**
 *
 * @param arr
 * @param n
 */
function chunks(arr: Array<any>, n: number) {
  const result = [];
  for (let i = 0; i < arr.length; i += n) {
    result.push(arr.slice(i, i + n));
  }
  return result;
}

/**
 *
 */
function DayHeadings() {
  return (
    <Box sx={{ display: "flex", gap: 2 }}>
      {Array.from(Array(7).keys()).map((i) => (
        <Box key={i} sx={{ flex: 1, textAlign: "center" }} pb="xs">
          <Text size="xs">
            {dayjs()
              .day(i + 1)
              .format("ddd")}
          </Text>
        </Box>
      ))}
    </Box>
  );
}
