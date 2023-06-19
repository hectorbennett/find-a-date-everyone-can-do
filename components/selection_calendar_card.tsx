import { Group } from "@mantine/core";
import Card from "./card";
import SelectionCalendar from "./selection_calendar";

export default function SelectionCalendarCard() {
  return (
    <Card
      title="Calendar"
      note="Select the dates you are available. A black outline indicates you have selected that date. The shade of green indicates how many people have selected that date. Darker is better."
    >
      <Group position="center">
        <SelectionCalendar />
      </Group>
    </Card>
  );
}
