import { Calendar as MantineCalendar } from "@mantine/dates";
import EventContext from "@/app/event";
import styles from "./selection_calendar.module.scss";
import { useViewportSize } from "@mantine/hooks";

export default function SelectionCalendar() {
  const event = EventContext.useContainer();

  const { width } = useViewportSize();

  const handleSelect = (date: Date) => {
    const isSelected = event.dateIsSelected(date);
    if (isSelected) {
      event.deselectDate(date);
    } else {
      event.selectDate(date);
    }
  };

  return (
    <MantineCalendar
      weekendDays={[]}
      size={width < 350 ? "xs" : "sm"}
      pb={width < 350 ? "lg" : "xl"}
      pt="sm"
      getDayProps={(date) => ({
        selected: event.dateIsSelected(date),
        onClick: () => handleSelect(date),
      })}
      renderDay={(date) => <CalendarDay date={date} />}
      styles={(theme) => ({
        day: {
          overflow: "hidden",
          display: "block",
          "&:hover": {
            background: "none",
          },
          "&[data-selected]": {
            background: "none",
            color: "black",
            border: "none",
            "&:hover": {
              background: "none",
            },
          },
        },
      })}
    />
  );
}

function CalendarDay({ date }: { date: Date }) {
  const event = EventContext.useContainer();
  const day = date.getDate();
  return (
    <div
      className={styles.day}
      style={{ background: event.getEventHeatColour(date) }}
    >
      <div>{day}</div>
    </div>
  );
}
