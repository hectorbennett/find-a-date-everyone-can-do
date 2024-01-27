import dayjs from "dayjs";
dayjs.extend(relativeTime);

import { NavLink } from "@mantine/core";

import AppContext from "@/app/app";
import { Card } from "@/components/atoms";

import relativeTime from "dayjs/plugin/relativeTime";
import { get_event_url } from "@/utils/get_event_url";

/**
 *
 */
export default function RecentEvents() {
  const app = AppContext.useContainer();

  const events = Object.values(app.recentEvents)
    .filter(
      (event) =>
        event.eventId && event.eventName && event.lastLoginDate && event.userId,
    )
    .sort(
      (a, b) =>
        new Date(a.lastLoginDate).valueOf() -
        new Date(b.lastLoginDate).valueOf(),
    );

  if (!events.length) {
    return null;
  }

  return (
    <Card title="Recent events" note="Revisit previous events">
      {events.map((event) => (
        <NavLink
          component="a"
          href={get_event_url({ id: event.eventId, name: event.eventName })}
          key={event.eventId}
          label={event.eventName}
          description={`Last viewed ${dayjs
            .utc(event.lastLoginDate)
            .fromNow()}`}
        />
      ))}
    </Card>
  );
}
