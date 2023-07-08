import { useState } from "react";
import { ActionIcon, Box, Text } from "@mantine/core";
import dayjs from "dayjs";
import type { Dayjs } from "dayjs";
import Swiper from "../swiper";
import Day from "./day";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

type GetDayProps = (date: Dayjs) => {
  selected: boolean;
  onClick: () => void;
  selectionCount: number;
  heat: number;
};

interface CalendarProps {
  getDayProps: GetDayProps;
}

export default function Calendar({ getDayProps }: CalendarProps) {
  const [monthIndex, setMonthIndex] = useState(0);

  return (
    <Box>
      <MonthHeader
        date={dayjs().add(monthIndex, "month")}
        onClickPrevious={() => setMonthIndex((i) => i - 1)}
        onClickNext={() => setMonthIndex((i) => i + 1)}
      />
      <DayHeadings />
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
      <Text size="xl" sx={{ flex: 1 }}>
        {date.format("MMMM YYYY")}
      </Text>
      <ActionIcon size="xl" onClick={onClickPrevious}>
        <IconChevronLeft size="1rem" />
      </ActionIcon>
      <ActionIcon size="xl" onClick={onClickNext}>
        <IconChevronRight size="1rem" />
      </ActionIcon>
    </Box>
  );
}

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
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {weeks.map((week) => (
        <Box key={week[0]} sx={{ display: "flex", gap: 2 }}>
          {week.map((d) => {
            const props = getDayProps(d);
            return (
              <Day
                key={d}
                date={d}
                outside={!d.isSame(date, "month")}
                selected={props.selected}
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

function chunks(arr: Array<any>, n: number) {
  const result = [];
  for (let i = 0; i < arr.length; i += n) {
    result.push(arr.slice(i, i + n));
  }
  return result;
}

function DayHeadings() {
  return (
    <Box sx={{ display: "flex", gap: 2 }}>
      {Array.from(Array(7).keys()).map((i) => (
        <Box key={i} sx={{ flex: 1, textAlign: "center" }} p="sm">
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
