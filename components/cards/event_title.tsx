import EventContext from "@/app/event";
import Card from "../card";
import { Box, Title } from "@mantine/core";

export default function EventTitle() {
  const event = EventContext.useContainer();
  if (!event.name) {
    return null;
  }
  return (
    <Card>
      <Box m="sm" mb="lg">
        <Title order={1} lineClamp={2} title={event.name}>
          {event.name}
        </Title>
      </Box>
    </Card>
  );
}
