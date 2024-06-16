/**
 * Calendar body
 */

import dayjs from "dayjs";
import { CalendarGrid } from "./CalendarGrid";
import { CalendarDate, CalendarRowDay } from "./CalendarRow";
import { DayHeadings } from "./DayHeadings";

/** Callback function to gather the attributes of a particular day. */
type GetDayProps = (
  date: CalendarDate
) => Pick<CalendarRowDay, "heat" | "isSelected">;

/** A focused calendar month. */
export interface FocusMonth {
  /** The year. */
  year: number;
  /** The month (1-12). */
  month: number;
}

/** Props to feed to the calendar. */
export interface CalendarBodyProps {
  /** The focused month. */
  month: FocusMonth;
  /** day props */
  getDayProps?: GetDayProps;
  /** Click callback. */
  onClickDay: (date: CalendarDate) => void;
}

/**
 * The main body of a calendar.
 * @param props - The calendar body props.
 * @param props.month - The focused month.
 * @param props.getDayProps - The day (1-31).
 * @param props.onClickDay - Callback function triggered when a day is clicked.
 * @returns A calendar body component.
 */
export function CalendarBody({
  month,
  getDayProps,
  onClickDay,
}: CalendarBodyProps) {
  let rows = getRows(month, getDayProps);
  return (
    <>
      <DayHeadings />
      <CalendarGrid rows={rows} onClickDay={onClickDay} />
    </>
  );
}

/**
 * Return the rows for the current month.
 * @param month - The month.
 * @param getDayProps - A callback function to return display data for a particular month
 * @returns An array of arrays of dates to feed to the CalendarGrid component.
 */
const getRows = (
  month: FocusMonth,
  getDayProps?: GetDayProps
): CalendarRowDay[][] => {
  const firstDayOfMonth = dayjs(`${month.year}-${month.month}-${1}`);
  const dayOfWeekofFirstDayofMonth = firstDayOfMonth.day();
  const firstDateOnCalendar = firstDayOfMonth.subtract(
    dayOfWeekofFirstDayofMonth - 1,
    "day"
  );
  const daysBeforeMonth = dayOfWeekofFirstDayofMonth - 1;
  const daysInMonth = firstDayOfMonth.daysInMonth();
  const daysDuringMonth = daysBeforeMonth + daysInMonth;
  const numberOfDaysOnCalendar = Math.ceil(daysDuringMonth / 7) * 7;
  const dates: Array<CalendarRowDay> = Array(numberOfDaysOnCalendar)
    .fill(null)
    .map((_, i) => firstDateOnCalendar.add(i, "day"))
    .map((date) => {
      let calendarDate = {
        day: date.date(),
        month: date.month(),
        year: date.year(),
      };
      let { heat, isSelected } = getDayProps
        ? getDayProps(calendarDate)
        : { heat: 0 as 0, isSelected: false };

      return {
        date: calendarDate,
        heat,
        isSelected,
        isOutsideOfCurrentMonth: date.month() !== month.month - 1, // TODO
      };
    });

  return chunks(dates, 7);
};

/**
 * Split an array into arrays of arrays.
 * @param arr - The array to split
 * @param n - The length of each sub-arry
 * @returns A new array.
 */
function chunks(arr: Array<any>, n: number) {
  const result = [];
  for (let i = 0; i < arr.length; i += n) {
    result.push(arr.slice(i, i + n));
  }
  return result;
}
