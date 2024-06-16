/**
 * Calendar Row component
 */

import { CalendarDay, type CalendarDayProps } from "./CalendarDay";

import styles from "./CalendarRow.module.scss";

/**
 * A simple date.
 */
export interface CalendarDate {
  /** The year. */
  year: number;
  /** The month (0-11). */
  month: number;
  /** The day (0-30). */
  day: number;
}

/**
 * An overridden day.
 */
export interface CalendarRowDay
  extends Omit<CalendarDayProps, "onClick" | "dayOfMonth"> {
  /** A date. */
  date: CalendarDate;
}

/** props for the Calendar Row component */
interface CalendarRowProps {
  /** A row of days */
  days: Array<CalendarRowDay>;

  /** Click handler for each day. */
  onClickDay: (dayOfMonth: CalendarDate) => void;
}

/**
 * A row of calendar days.
 * @param props - The component props.
 * @param props.days - An array of days.
 * @param props.onClickDay - A click handler for each day.
 * @returns A react component for a calendar row.
 */
export function CalendarRow({ days, onClickDay: onClick }: CalendarRowProps) {
  return (
    <div className={styles.calendarRow}>
      {days.map((calendarDay) => (
        <CalendarDay
          key={calendarDay.date.day}
          dayOfMonth={calendarDay.date.day}
          heat={calendarDay.heat}
          isSelected={calendarDay.isSelected}
          isOutsideOfCurrentMonth={calendarDay.isOutsideOfCurrentMonth}
          onClick={() => onClick(calendarDay.date)}
        />
      ))}
    </div>
  );
}
