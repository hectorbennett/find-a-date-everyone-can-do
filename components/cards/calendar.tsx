import EventContext from "@/app/event";
import Card from "../card";
import Calendar from "../calendar2";
import type { Dayjs } from "dayjs";

function SelectionCalendar() {
  const event = EventContext.useContainer();

  const handleSelect = (date: Dayjs) => {
    const isSelected = event.dateIsSelected(date);
    if (isSelected) {
      event.deselectDate(date);
    } else {
      event.selectDate(date);
    }
  };

  return (
    <Calendar
      getDayProps={(date) => ({
        selected: event.dateIsSelected(date),
        onClick: () => handleSelect(date),
        selectionCount: event.getDateSelectionCount(date),
        heat: event.getDateHeat(date),
      })}
    />
  );
}

export default function SelectionCalendarCard() {
  return (
    <Card
      title="Calendar"
      note="Select the dates you are available. A black outline indicates you have selected that date. The shade of green indicates how many people have selected that date. Darker is better."
    >
      <SelectionCalendar />
    </Card>
  );
}
