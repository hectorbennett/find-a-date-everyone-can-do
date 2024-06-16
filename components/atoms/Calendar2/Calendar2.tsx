/**
 * Calendar2
 */

import { Swiper } from "../Swiper";
import { MonthHeader } from "./MonthHeader";
import { CalendarBody, CalendarBodyProps, FocusMonth } from "./CalendarBody";
import dayjs from "dayjs";

/** A fixed date to use as the index to feed to the swiper component. */
const EPOCH = dayjs(`2030-01-01`);

/**
 * Take a month and convert it into an index for the swiper.
 * @param month - The date.
 * @param month.year - The year
 * @param month.month - The month
 * @returns an index.
 */
const monthToIndex = ({ year, month }: FocusMonth) => {
  let current = dayjs(`${year}-${month}-01`);
  return Math.floor(current.diff(EPOCH, "month")) + 1;
};

/**
 * Take an index and convert it into a month for the swiper.
 * @param index - The index.
 * @returns a month.
 */
const indexToMonth = (index: number) => {
  let date = EPOCH.add(index, "month");
  return {
    year: date.year(),
    month: date.month(),
  };
};

/** Props for the calendar. */
interface Calendar2Props extends CalendarBodyProps {
  /** Callback for changing the focused month. */
  onNavigateToMonth: (month: FocusMonth) => void;
}

/**
 * A calendar component that can be navigated via buttons or swiping.
 * @param props - The calendar props.
 * @param props.month - The current month.
 * @param props.onNavigateToMonth - Callback when the active month is changed.
 * @param props.onClickDay - Callback when a day is clicked.
 * @param props.getDayProps - function to gather props about a specific day.
 * @returns A calendar component.
 */
export function Calendar2({
  month,
  onNavigateToMonth,
  onClickDay,
  getDayProps,
}: Calendar2Props) {
  // the month index to feed to the swiper is relative to the millenium.
  const index = monthToIndex(month);
  const handleClickPrevious = () => onNavigateToMonth(indexToMonth(index - 1));
  const handleClickNext = () => onNavigateToMonth(indexToMonth(index + 1));
  return (
    <>
      <MonthHeader
        year={month.year}
        month={month.month}
        onClickPrevious={handleClickPrevious}
        onClickNext={handleClickNext}
      />
      <Swiper
        index={index}
        onSetIndex={(i) => onNavigateToMonth(indexToMonth(i))}
        getContent={(i) => (
          <CalendarBody
            month={indexToMonth(i)}
            onClickDay={onClickDay}
            getDayProps={getDayProps}
          />
        )}
      />
    </>
  );
}
