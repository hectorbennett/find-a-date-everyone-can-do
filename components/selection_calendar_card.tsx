import { Group } from "@mantine/core";
import Card from "./card";
import SelectionCalendar from "./selection_calendar";

export default function SelectionCalendarCard() {
  return (
    <Card title="Calendar" note="Select the dates you are available">
      <Group position="center">
        <SelectionCalendar />
      </Group>
    </Card>
  );
}
