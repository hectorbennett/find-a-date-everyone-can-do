import EventContext, { CalendarDate } from "@/app/event";
import Card from "../card";
import Calendar from "../calendar2";
import SavingStatus from "../saving_status";

function SelectionCalendar() {
  const event = EventContext.useContainer();

  const handleSelect = (date: CalendarDate) => {
    if (date.isSelected) {
      event.deselectDate(date.date);
    } else {
      event.selectDate(date.date);
    }
  };

  return (
    <Calendar
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

export default function SelectionCalendarCard() {
  const event = EventContext.useContainer();
  return (
    <Card
      title="Calendar"
      note={`Hi ${event.currentUser?.name}! Select the dates you are available. A black outline indicates you have selected that date. The shade of green indicates how many people have selected that date. Darker is better.`}
    >
      <SelectionCalendar />
      <SavingStatus />
    </Card>
  );
}
