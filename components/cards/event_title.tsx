import EventContext from "@/app/event";
import Card from "../card";
import { Title, Text, Group, Stack } from "@mantine/core";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
import ShareButton from "../share_button";
dayjs.extend(relativeTime);
dayjs.extend(utc);

export default function EventTitle() {
  const event = EventContext.useContainer();
  if (!event.name) {
    return null;
  }

  const note = `Created ${dayjs.utc(event.creationDate).fromNow()}`;

  return (
    <Card>
      <Group p="xs">
        <Stack sx={{ flex: 1 }}>
          <Title order={2} weight={400} color="purple.1">{event.name}</Title>
          <Text c="dimmed" fz="sm">
            {note}
          </Text>
        </Stack>
        <ShareButton />
      </Group>
    </Card>
  );
}
