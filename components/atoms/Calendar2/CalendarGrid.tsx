/**
 * Calendar Grid
 */

import {
  type CalendarDate,
  type CalendarRowDay,
  CalendarRow,
} from "./CalendarRow";

import styles from "./CalendarGrid.module.scss";

/** props for the Calendar Grid component */
interface CalendarGridProps {
  /** A row of days */
  rows: Array<Array<CalendarRowDay>>;

  /** Click handler for each day. */
  onClickDay: (dayOfMonth: CalendarDate) => void;
}

/**
 * A calendar grid component.
 * @param props - Component props
 * @param props.rows - A list of rows
 * @param props.onClickDay - An event callback on clicking a day.
 * @returns A react component.
 */
export function CalendarGrid({ rows, onClickDay }: CalendarGridProps) {
  return (
    <div className={styles.calendarGrid}>
      {rows.map((row) => (
        <CalendarRow
          key={row[0]?.date.day}
          days={row}
          onClickDay={onClickDay}
        />
      ))}
    </div>
  );
}
