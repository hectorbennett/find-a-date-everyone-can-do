/**
 * Calendar Day component
 */

import { Checkbox, UnstyledButton } from "@mantine/core";

import styles from "./CalendarDay.module.scss";
import classNames from "classnames";
import { IconCheck } from "@tabler/icons-react";

/** Props for the calendar day component */
export interface CalendarDayProps {
  /** The day of the month (1 - 31). */
  dayOfMonth: number;

  /** How good a candidate it is. Higher means more people have clicked attending on this date. */
  heat: 0 | 1 | 2 | 3;

  /** Whether it's been selected by the current user. */
  isSelected: boolean;

  /** Whether it is outside of the current month. (usually the first and last few visible dates on a calendar screen). */
  isOutsideOfCurrentMonth: boolean;

  /** Click handler. */
  onClick: () => void;
}

/**
 * A calendar day component.
 * @param props - The calendar props.
 * @param props.dayOfMonth - The day of the month.
 * @param props.heat - How good a candidate it is. Higher means more people have clicked attending on this date.
 * @param props.isSelected - Whether it's been selected by the current user.
 * @param props.isOutsideOfCurrentMonth - Whether it is outside of the current month. (usually the first and last few visible dates on a calendar screen).
 * @param props.onClick - Callback fired on click.
 * @returns A Calendar day component.
 */
export function CalendarDay({
  dayOfMonth,
  heat,
  isSelected,
  isOutsideOfCurrentMonth,
  onClick,
}: CalendarDayProps) {
  return (
    <UnstyledButton
      onClick={onClick}
      role="checkbox"
      className={classNames(styles.calendarDay, styles[`heat${heat}`!], {
        [styles.isSelected!]: isSelected,
        [styles.isOutsideOfCurrentMonth!]: isOutsideOfCurrentMonth,
      })}
    >
      <div className={styles.dayOfMonth}>{dayOfMonth}</div>

      <div className={styles.selectedCheckbox}>
        {/* <Checkbox checked={isSelected} /> */}
        <IconCheck stroke={3} />
      </div>
    </UnstyledButton>
  );
}
