import EventContext from "@/app/event";
import StyledCalendar from "../styled_calendar";
import Card from "../card";

function SelectionCalendar() {
  const event = EventContext.useContainer();

  const handleSelect = (date: Date) => {
    const isSelected = event.dateIsSelected(date);
    if (isSelected) {
      event.deselectDate(date);
    } else {
      event.selectDate(date);
    }
  };

  return (
    <StyledCalendar
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
