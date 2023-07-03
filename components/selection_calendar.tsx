import EventContext from "@/app/event";
import StyledCalendar from "./styled_calendar";

export default function SelectionCalendar() {
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
