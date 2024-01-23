import EventContext, { CalendarDate } from "@/app/event";
import Card from "../card";
import Calendar from "../calendar2";
import SavingStatus from "../saving_status";
import dayjs from "dayjs";
import minMax from "dayjs/plugin/minMax";
dayjs.extend(minMax);

/**
 *
 */
function SelectionCalendar() {
  const event = EventContext.useContainer();

  const handleSelect = (date: CalendarDate) => {
    if (date.isSelected) {
      event.deselectDate(date.date);
    } else {
      event.selectDate(date.date);
    }
  };

  const initialFocusedDate = dayjs.max(
    dayjs(),
    event.calendarDates[event.calendarDates.length - 1].date
  );

  return (
    <Calendar
      initialFocusedDate={initialFocusedDate}
      getDayProps={(d) => {
        const calendarDate = event.getCalendarDate(d);
        return {
          isSelected: calendarDate.isSelected,
          isToday: calendarDate.isToday,
          isInPast: calendarDate.isInPast,
          onClick: () => handleSelect(calendarDate),
          selectionCount: calendarDate.users.length,
          heat: calendarDate.heat,
        };
      }}
    />
  );
}

/**
 *
 */
export default function SelectionCalendarCard() {
  const event = EventContext.useContainer();
  return (
    <Card
      title="Calendar"
      note={`Select the dates you are available. A black outline indicates you have selected that date. The shade of green indicates how many people have selected that date. Darker is better.`}
    >
      <SelectionCalendar />
      <SavingStatus />
    </Card>
  );
}
