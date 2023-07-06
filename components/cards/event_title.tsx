import EventContext from "@/app/event";
import Card from "../card";
import { Box, Title, Text } from "@mantine/core";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
dayjs.extend(relativeTime);
dayjs.extend(utc);

export default function EventTitle() {
  const event = EventContext.useContainer();
  if (!event.name) {
    return null;
  }

  return (
    <Card
      title={event.name}
      note={`Created ${dayjs.utc(event.creationDate).fromNow()}`}
    />
  );
}
