/**
 * RecentEvents.tsx
 */

import { NavLink } from "@mantine/core";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

import { Card } from "@/components/atoms";
import { get_event_url } from "@/utils/get_event_url";
import { RecentEvent } from "@/utils/useRecentEvents";

/**
 * Recent events props
 */
interface RecentEventsProps {
  /** A list of recent events. */
  events: Array<RecentEvent>;
}

/**
 * Recently viewed events.
 */
export function RecentEvents({ events }: RecentEventsProps) {
  const sortedDates = events.sort((a, b) =>
    a.lastLoginDate.isAfter(b.lastLoginDate) ? -1 : 1,
  );

  return (
    <Card title="Recent events" note="Revisit previous events">
      {sortedDates.map((event) => (
        <NavLink
          component="a"
          styles={(theme) => ({
            label: {
              fontWeight: "bold",
            },
            description: {
              color: "black",
            },
          })}
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
