import { useState } from "react";
import { ActionIcon, Box, Text, Title } from "@mantine/core";
import dayjs from "dayjs";
import type { Dayjs } from "dayjs";
import Swiper from "../swiper";
import Day from "./day";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

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
      <Title color="green.2" order={3} weight={300} sx={{ flex: 1 }}>
        {date.format("MMMM YYYY")}
      </Title>
      <ActionIcon size="xl" onClick={onClickPrevious} color="green.2">
        <IconChevronLeft size="1rem" stroke={4} />
      </ActionIcon>
      <ActionIcon size="xl" onClick={onClickNext} color="green.2">
        <IconChevronRight size="1rem" stroke={4} />
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
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      <DayHeadings />
      {weeks.map((week) => (
        <Box key={week[0]} sx={{ display: "flex", gap: 1 }}>
          {week.map((d) => {
            const props = getDayProps(d);
            return (
              <Day
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
